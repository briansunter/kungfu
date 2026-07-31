#!/usr/bin/env bun
/**
 * Registration data checker.
 *
 * Uses IANA's RDAP bootstrap registry first and falls back to the system WHOIS
 * command only when no RDAP service is published for the TLD. A result of
 * "apparently-unregistered" is not a purchase guarantee: registries and
 * registrars may reserve names, classify them as premium, or change state
 * before checkout.
 *
 * Usage:
 *   bun run scripts/check-whois.ts example.com example.io
 */

import { $ } from "bun";
import { domainToASCII } from "node:url";

export type RegistrationStatus =
	| "registered"
	| "apparently-unregistered"
	| "unknown"
	| "error";

export interface RegistrationResult {
	domain: string;
	asciiDomain?: string;
	status: RegistrationStatus;
	source: "rdap" | "whois" | "none";
	checkedAt: string;
	rdapUrl?: string;
	registrar?: string;
	createdDate?: string;
	expirationDate?: string;
	nameservers?: string[];
	registryStatuses?: string[];
	note: string;
	error?: string;
}

interface RdapBootstrap {
	services: Array<[string[], string[]]>;
}

interface RdapEvent {
	eventAction?: string;
	eventDate?: string;
}

interface RdapEntity {
	roles?: string[];
	vcardArray?: [string, Array<[string, Record<string, unknown>, string, unknown]>];
}

interface RdapResponse {
	status?: string[];
	events?: RdapEvent[];
	entities?: RdapEntity[];
	nameservers?: Array<{ ldhName?: string; unicodeName?: string }>;
}

let bootstrapPromise: Promise<RdapBootstrap> | undefined;

function normalizeDomain(input: string): string {
	const trimmed = input.trim().toLowerCase().replace(/\.$/, "");
	const ascii = domainToASCII(trimmed);
	if (!ascii || ascii.length > 253 || !ascii.includes(".")) {
		throw new Error(`Invalid domain: ${input}`);
	}

	for (const label of ascii.split(".")) {
		if (
			label.length < 1 ||
			label.length > 63 ||
			label.startsWith("-") ||
			label.endsWith("-") ||
			!/^[a-z0-9-]+$/.test(label)
		) {
			throw new Error(`Invalid domain label in: ${input}`);
		}
	}

	return ascii;
}

async function getBootstrap(): Promise<RdapBootstrap> {
	bootstrapPromise ??= fetch("https://data.iana.org/rdap/dns.json", {
		headers: { accept: "application/json" },
		signal: AbortSignal.timeout(10_000),
	}).then(async (response) => {
		if (!response.ok) {
			throw new Error(`IANA RDAP bootstrap returned HTTP ${response.status}`);
		}
		return (await response.json()) as RdapBootstrap;
	});

	return bootstrapPromise;
}

async function findRdapBase(asciiDomain: string): Promise<string | undefined> {
	const tld = asciiDomain.split(".").at(-1);
	if (!tld) return undefined;

	const bootstrap = await getBootstrap();
	for (const [tlds, urls] of bootstrap.services) {
		if (tlds.some((candidate) => candidate.toLowerCase() === tld)) {
			return urls[0];
		}
	}
	return undefined;
}

function getVcardName(entity: RdapEntity): string | undefined {
	const rows = entity.vcardArray?.[1] ?? [];
	for (const row of rows) {
		if (row[0] === "fn" && typeof row[3] === "string") return row[3];
	}
	return undefined;
}

function eventDate(data: RdapResponse, action: string): string | undefined {
	return data.events?.find((event) => event.eventAction === action)?.eventDate;
}

async function queryRdap(
	domain: string,
	asciiDomain: string,
	baseUrl: string,
): Promise<RegistrationResult> {
	const checkedAt = new Date().toISOString();
	const rdapUrl = `${baseUrl.replace(/\/?$/, "/")}domain/${encodeURIComponent(asciiDomain)}`;

	try {
		const response = await fetch(rdapUrl, {
			headers: { accept: "application/rdap+json, application/json" },
			signal: AbortSignal.timeout(12_000),
		});

		if (response.status === 404) {
			return {
				domain,
				asciiDomain,
				status: "apparently-unregistered",
				source: "rdap",
				checkedAt,
				rdapUrl,
				note: "No RDAP domain object was found. Confirm availability, premium status, and price at an accredited registrar immediately before purchase.",
			};
		}

		if (!response.ok) {
			return {
				domain,
				asciiDomain,
				status: "unknown",
				source: "rdap",
				checkedAt,
				rdapUrl,
				note: "The registry RDAP service did not return a conclusive result.",
				error: `HTTP ${response.status}`,
			};
		}

		const data = (await response.json()) as RdapResponse;
		const registrar = data.entities
			?.filter((entity) => entity.roles?.includes("registrar"))
			.map(getVcardName)
			.find(Boolean);
		const nameservers = data.nameservers
			?.map((nameserver) => nameserver.ldhName ?? nameserver.unicodeName)
			.filter((value): value is string => Boolean(value));

		return {
			domain,
			asciiDomain,
			status: "registered",
			source: "rdap",
			checkedAt,
			rdapUrl,
			registrar,
			createdDate: eventDate(data, "registration"),
			expirationDate: eventDate(data, "expiration"),
			nameservers,
			registryStatuses: data.status,
			note: "A registry RDAP domain object was returned.",
		};
	} catch (error) {
		return {
			domain,
			asciiDomain,
			status: "error",
			source: "rdap",
			checkedAt,
			rdapUrl,
			note: "RDAP lookup failed; do not infer availability from this error.",
			error: error instanceof Error ? error.message : "Unknown RDAP error",
		};
	}
}

function explicitWhoisMiss(text: string): boolean {
	return [
		/No match for domain/i,
		/No entries found/i,
		/Domain not found/i,
		/NOT FOUND/i,
		/No such domain/i,
		/No Object Found/i,
		/The queried object does not exist/i,
	].some((pattern) => pattern.test(text));
}

function capture(text: string, patterns: RegExp[]): string | undefined {
	for (const pattern of patterns) {
		const match = text.match(pattern);
		if (match?.[1]) return match[1].trim();
	}
	return undefined;
}

async function queryWhois(domain: string, asciiDomain: string): Promise<RegistrationResult> {
	const checkedAt = new Date().toISOString();
	try {
		const process = await $`whois ${asciiDomain}`.quiet();
		const text = `${process.stdout.toString()}\n${process.stderr.toString()}`;
		if (explicitWhoisMiss(text)) {
			return {
				domain,
				asciiDomain,
				status: "apparently-unregistered",
				source: "whois",
				checkedAt,
				note: "WHOIS explicitly reported no object. Confirm at the registry or registrar; WHOIS is a fallback, not the definitive gTLD source.",
			};
		}

		const registrar = capture(text, [
			/^Registrar:\s*(.+)$/im,
			/^Registrar Name:\s*(.+)$/im,
			/^Sponsoring Registrar:\s*(.+)$/im,
		]);
		const createdDate = capture(text, [
			/^Creation Date:\s*(.+)$/im,
			/^Created On:\s*(.+)$/im,
			/^Created:\s*(.+)$/im,
		]);
		const expirationDate = capture(text, [
			/^Registry Expiry Date:\s*(.+)$/im,
			/^Expiry Date:\s*(.+)$/im,
			/^Expiration Date:\s*(.+)$/im,
		]);
		const nameservers = [...text.matchAll(/^(?:Name Server|nserver):\s*(\S+)/gim)].map(
			(match) => match[1],
		);
		const registered = Boolean(
			registrar || createdDate || expirationDate || nameservers.length > 0,
		);

		return {
			domain,
			asciiDomain,
			status: registered ? "registered" : "unknown",
			source: "whois",
			checkedAt,
			registrar,
			createdDate,
			expirationDate,
			nameservers,
			note: registered
				? "WHOIS returned registration indicators. Verify at the registry or registrar."
				: "WHOIS output was inconclusive; do not infer availability.",
		};
	} catch (error) {
		const stderr =
			typeof error === "object" && error !== null && "stderr" in error
				? String((error as { stderr?: unknown }).stderr ?? "")
				: "";
		if (explicitWhoisMiss(stderr)) {
			return {
				domain,
				asciiDomain,
				status: "apparently-unregistered",
				source: "whois",
				checkedAt,
				note: "WHOIS explicitly reported no object. Confirm at the registry or registrar.",
			};
		}
		return {
			domain,
			asciiDomain,
			status: "error",
			source: "whois",
			checkedAt,
			note: "WHOIS lookup failed; do not infer availability from this error.",
			error: stderr || (error instanceof Error ? error.message : "Unknown WHOIS error"),
		};
	}
}

export async function checkRegistration(input: string): Promise<RegistrationResult> {
	const checkedAt = new Date().toISOString();
	let asciiDomain: string;
	try {
		asciiDomain = normalizeDomain(input);
	} catch (error) {
		return {
			domain: input,
			status: "error",
			source: "none",
			checkedAt,
			note: "Invalid domain input.",
			error: error instanceof Error ? error.message : "Invalid domain",
		};
	}

	try {
		const rdapBase = await findRdapBase(asciiDomain);
		if (rdapBase) return await queryRdap(input, asciiDomain, rdapBase);
		return await queryWhois(input, asciiDomain);
	} catch (error) {
		return {
			domain: input,
			asciiDomain,
			status: "error",
			source: "none",
			checkedAt,
			note: "Registration lookup failed; do not infer availability.",
			error: error instanceof Error ? error.message : "Unknown lookup error",
		};
	}
}

async function main(): Promise<void> {
	const domains = process.argv.slice(2);
	if (domains.length === 0) {
		console.error("Usage: check-whois.ts <domain1> <domain2> ...");
		process.exit(1);
	}

	const results: RegistrationResult[] = [];
	for (const domain of domains) {
		console.error(`Checking ${domain}...`);
		results.push(await checkRegistration(domain));
	}

	console.log(JSON.stringify(results, null, 2));
	console.error(
		"\nVerify apparently unregistered names, premium/reserved status, and exact renewal pricing at a reputable registrar before purchase.",
	);
}

if (import.meta.main) {
	await main();
}
