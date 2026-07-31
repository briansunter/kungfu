#!/usr/bin/env bun
/**
 * Preliminary trademark research helper.
 *
 * This script creates reproducible search plans and official database links. It
 * does not query every jurisdiction, evaluate confusing similarity, identify
 * common-law rights, or provide legal clearance.
 *
 * Usage:
 *   bun run scripts/check-trademarks.ts velora "task flow"
 */

export interface TrademarkSearchPlan {
	name: string;
	status: "manual-review-required";
	checkedAt: string;
	searchTerms: string[];
	links: {
		uspto: string;
		euipo: string;
		wipo: string;
		ukipo: string;
		webSearch: string;
	};
	checks: string[];
	note: string;
}

function cleanName(input: string): string {
	const name = input.trim().replace(/\s+/g, " ");
	if (!name) throw new Error("Name cannot be empty");
	if (name.length > 200) throw new Error("Name is too long for a useful screening query");
	return name;
}

export function createTrademarkSearchPlan(input: string): TrademarkSearchPlan {
	const name = cleanName(input);
	const unspaced = name.replace(/[\s_-]+/g, "");
	const spaced = name.replace(/[-_]+/g, " ");
	const searchTerms = [...new Set([name, spaced, unspaced])].filter(Boolean);
	const quotedQuery = searchTerms.map((term) => `"${term}"`).join(" OR ");

	return {
		name,
		status: "manual-review-required",
		checkedAt: new Date().toISOString(),
		searchTerms,
		links: {
			uspto: "https://tmsearch.uspto.gov/",
			euipo: "https://euipo.europa.eu/eSearch/",
			wipo: "https://branddb.wipo.int/",
			ukipo: "https://trademarks.ipo.gov.uk/ipo-tmtext",
			webSearch: `https://www.google.com/search?q=${encodeURIComponent(`${quotedQuery} business OR software OR app`)}`,
		},
		checks: [
			"Search exact and similar spellings, spacing, plurals, phonetic equivalents, translations, and dominant word elements.",
			"Review live and pending marks in relevant jurisdictions and related goods/services classes.",
			"Search company registries, app stores, domains, industry directories, news, and the wider web for unregistered/common-law use.",
			"Record owner, mark, status, filing/registration number, goods/services, jurisdiction, source URL, and review date.",
			"Escalate close calls, launch-critical names, and significant brand investment to qualified trademark counsel.",
		],
		note: "No automated result can establish trademark availability. Absence of an exact match is not clearance; confusing similarity and related goods/services may still create risk.",
	};
}

async function main(): Promise<void> {
	const names = process.argv.slice(2);
	if (names.length === 0) {
		console.error("Usage: check-trademarks.ts <name1> <name2> ...");
		process.exit(1);
	}

	const results = names.map((name) => {
		try {
			return createTrademarkSearchPlan(name);
		} catch (error) {
			return {
				name,
				status: "error",
				checkedAt: new Date().toISOString(),
				error: error instanceof Error ? error.message : "Unknown error",
			};
		}
	});

	console.log(JSON.stringify(results, null, 2));
	console.error(
		"\nThis is preliminary research support, not legal advice or trademark clearance.",
	);
}

if (import.meta.main) {
	await main();
}
