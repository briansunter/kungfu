#!/usr/bin/env bun
/**
 * DNS evidence checker.
 *
 * DNS records can prove that a domain is configured, but the absence of DNS
 * records does not prove that the domain is available to register. Use the
 * RDAP-first registration checker for registration status.
 *
 * Usage:
 *   bun run scripts/check-dns.ts example.com example.io
 */

import { resolveAny, resolveNs } from "node:dns/promises";
import { domainToASCII } from "node:url";

export type DnsStatus = "records-found" | "no-records" | "error";

export interface DnsResult {
	domain: string;
	asciiDomain?: string;
	status: DnsStatus;
	checkedAt: string;
	recordTypes?: string[];
	nameservers?: string[];
	note: string;
	error?: string;
}

function normalizeDomain(input: string): string {
	const ascii = domainToASCII(input.trim().toLowerCase().replace(/\.$/, ""));
	if (!ascii || !ascii.includes(".")) throw new Error(`Invalid domain: ${input}`);
	return ascii;
}

function errorCode(error: unknown): string | undefined {
	if (typeof error === "object" && error !== null && "code" in error) {
		return String((error as { code?: unknown }).code ?? "");
	}
	return undefined;
}

function describeError(error: unknown): string {
	const code = errorCode(error);
	const message = error instanceof Error ? error.message : String(error);
	return code && !message.includes(code) ? `${code}: ${message}` : message;
}

function isDefinitiveRecordAbsence(error: unknown): boolean {
	return ["ENODATA", "ENOTFOUND"].includes(errorCode(error) ?? "");
}

export async function checkDns(input: string): Promise<DnsResult> {
	const checkedAt = new Date().toISOString();
	let asciiDomain: string;
	try {
		asciiDomain = normalizeDomain(input);
	} catch (error) {
		return {
			domain: input,
			status: "error",
			checkedAt,
			note: "Invalid domain input.",
			error: error instanceof Error ? error.message : "Invalid domain",
		};
	}

	try {
		const [recordsResult, nameserverResult] = await Promise.allSettled([
			resolveAny(asciiDomain),
			resolveNs(asciiDomain),
		]);
		const records = recordsResult.status === "fulfilled" ? recordsResult.value : [];
		const nameservers = nameserverResult.status === "fulfilled" ? nameserverResult.value : [];
		const recordTypes = [
			...new Set(
				records
					.map((record) => ("type" in record ? String(record.type) : "unknown"))
					.filter(Boolean),
			),
		];

		if (records.length > 0 || nameservers.length > 0) {
			return {
				domain: input,
				asciiDomain,
				status: "records-found",
				checkedAt,
				recordTypes,
				nameservers,
				note: "DNS configuration was found. This is evidence of use, not a complete registration record.",
			};
		}

		const errors = [
			recordsResult.status === "rejected" ? recordsResult.reason : undefined,
			nameserverResult.status === "rejected" ? nameserverResult.reason : undefined,
		].filter((error): error is NonNullable<typeof error> => error !== undefined);
		const noRecords = errors.length === 0 || errors.every(isDefinitiveRecordAbsence);

		return {
			domain: input,
			asciiDomain,
			status: noRecords ? "no-records" : "error",
			checkedAt,
			note: noRecords
				? "No DNS records were observed. The domain may still be registered, reserved, premium, or temporarily misconfigured."
				: "DNS lookup was inconclusive; do not infer registration status.",
			error: noRecords ? undefined : errors.map(describeError).join("; "),
		};
	} catch (error) {
		return {
			domain: input,
			asciiDomain,
			status: "error",
			checkedAt,
			note: "DNS lookup failed; do not infer registration status.",
			error: error instanceof Error ? error.message : "Unknown DNS error",
		};
	}
}

async function main(): Promise<void> {
	const domains = process.argv.slice(2);
	if (domains.length === 0) {
		console.error("Usage: check-dns.ts <domain1> <domain2> ...");
		process.exit(1);
	}

	const results = await Promise.all(domains.map(checkDns));
	console.log(JSON.stringify(results, null, 2));
	console.error(
		"\nDNS absence is not domain availability. Verify registration through RDAP and a registrar.",
	);
}

if (import.meta.main) {
	await main();
}
