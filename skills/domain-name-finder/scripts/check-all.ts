#!/usr/bin/env bun
/**
 * Combined domain research report.
 *
 * Aggregates registration, DNS, preliminary trademark, and social-handle
 * evidence without converting uncertain signals into an automatic legal or
 * purchase recommendation.
 *
 * Usage:
 *   bun run scripts/check-all.ts velora.io taskflow.app
 */

import { checkDns, type DnsResult } from "./check-dns.ts";
import { checkSocialName, type SocialResult } from "./check-social.ts";
import {
	checkRegistration,
	type RegistrationResult,
} from "./check-whois.ts";
import {
	createTrademarkSearchPlan,
	type TrademarkSearchPlan,
} from "./check-trademarks.ts";

interface NameSignals {
	label: string;
	length: number;
	containsHyphen: boolean;
	containsNumber: boolean;
	containsPunycode: boolean;
	warnings: string[];
}

interface CombinedReport {
	domain: string;
	checkedAt: string;
	registration: RegistrationResult;
	dns: DnsResult;
	trademark: TrademarkSearchPlan | { name: string; status: "error"; error: string };
	social: SocialResult | { name: string; error: string };
	nameSignals: NameSignals;
	disposition:
		| "registered"
		| "verify-at-registrar"
		| "manual-registration-check-required";
	manualChecks: string[];
}

function brandLabel(domain: string): string {
	return domain.trim().toLowerCase().replace(/\.$/, "").split(".")[0] ?? domain;
}

function inspectName(domain: string): NameSignals {
	const label = brandLabel(domain);
	const warnings: string[] = [];
	if (label.length > 15) warnings.push("The primary label is longer than 15 characters.");
	if (label.includes("-")) warnings.push("Hyphens can create spoken and typing ambiguity.");
	if (/\d/.test(label)) warnings.push("Numbers can be ambiguous when spoken or transcribed.");
	if (label.startsWith("xn--")) {
		warnings.push("This is an internationalized-domain punycode label; review Unicode and homograph risk.");
	}
	if (/(.)\1\1/i.test(label)) warnings.push("Repeated characters may increase typo risk.");

	return {
		label,
		length: label.length,
		containsHyphen: label.includes("-"),
		containsNumber: /\d/.test(label),
		containsPunycode: label.startsWith("xn--"),
		warnings,
	};
}

function disposition(registration: RegistrationResult): CombinedReport["disposition"] {
	if (registration.status === "registered") return "registered";
	if (registration.status === "apparently-unregistered") return "verify-at-registrar";
	return "manual-registration-check-required";
}

async function buildReport(domain: string): Promise<CombinedReport> {
	const checkedAt = new Date().toISOString();
	const name = brandLabel(domain);
	const [registration, dns, socialResult] = await Promise.all([
		checkRegistration(domain),
		checkDns(domain),
		checkSocialName(name).catch((error: unknown) => ({
			name,
			error: error instanceof Error ? error.message : "Unknown social check error",
		})),
	]);

	let trademark: CombinedReport["trademark"];
	try {
		trademark = createTrademarkSearchPlan(name);
	} catch (error) {
		trademark = {
			name,
			status: "error",
			error: error instanceof Error ? error.message : "Unknown trademark-plan error",
		};
	}

	return {
		domain,
		checkedAt,
		registration,
		dns,
		trademark,
		social: socialResult,
		nameSignals: inspectName(domain),
		disposition: disposition(registration),
		manualChecks: [
			"Verify the exact name, premium/reserved status, first-year price, renewal price, and transfer price at a reputable registrar.",
			"Search official trademark databases plus similar spellings, sounds, meanings, related goods/services, and common-law use.",
			"Review historical use, search reputation, blocklists, confusing domains, and impersonation risk.",
			"Test pronunciation, spelling, recall, target-language meaning, email credibility, and common misspellings.",
			"Verify and claim social handles directly on each platform.",
		],
	};
}

async function main(): Promise<void> {
	const domains = process.argv.slice(2);
	if (domains.length === 0) {
		console.error("Usage: check-all.ts <domain1> <domain2> ...");
		process.exit(1);
	}

	const reports: CombinedReport[] = [];
	for (const domain of domains) {
		console.error(`Researching ${domain}...`);
		reports.push(await buildReport(domain));
	}

	console.log(JSON.stringify(reports, null, 2));
	console.error(
		"\nNo automatic report can guarantee registration availability, trademark clearance, handle availability, or suitability. Verify finalists manually before spending money or launching.",
	);
}

if (import.meta.main) {
	await main();
}
