#!/usr/bin/env bun
/**
 * Social-handle evidence checker.
 *
 * Platform responses vary with redirects, reserved names, suspensions, and
 * rate limits.
 *
 * Usage:
 *   bun run scripts/check-social.ts velora taskflow
 */

export type HandleStatus = "likely-available" | "likely-taken" | "unknown";

interface PlatformDefinition {
	name: string;
	url: (username: string) => string;
	reliableNotFound: boolean;
	reliableSuccess: boolean;
}

export interface HandleCheck {
	platform: string;
	url: string;
	status: HandleStatus;
	confidence: "high" | "medium" | "low";
	checkedAt: string;
	httpStatus?: number;
	finalUrl?: string;
	note: string;
	error?: string;
}

export interface SocialResult {
	name: string;
	handles: HandleCheck[];
	note: string;
}

const PLATFORMS: PlatformDefinition[] = [
	{
		name: "X",
		url: (username) => `https://x.com/${username}`,
		reliableNotFound: false,
		reliableSuccess: false,
	},
	{
		name: "Instagram",
		url: (username) => `https://www.instagram.com/${username}/`,
		reliableNotFound: false,
		reliableSuccess: false,
	},
	{
		name: "GitHub",
		url: (username) => `https://github.com/${username}`,
		reliableNotFound: true,
		reliableSuccess: true,
	},
	{
		name: "LinkedIn company",
		url: (username) => `https://www.linkedin.com/company/${username}/`,
		reliableNotFound: false,
		reliableSuccess: false,
	},
	{
		name: "YouTube",
		url: (username) => `https://www.youtube.com/@${username}`,
		reliableNotFound: false,
		reliableSuccess: false,
	},
];

function normalizeUsername(input: string): string {
	const username = input.trim().replace(/^@/, "");
	if (!username || username.length > 100 || !/^[\p{L}\p{N}._-]+$/u.test(username)) {
		throw new Error(`Invalid handle: ${input}`);
	}
	return username;
}

function looksLikeAccessGate(url: string, html: string): boolean {
	return (
		/checkpoint|challenge|login|authwall/i.test(url) ||
		/too many requests|rate limit|verify you are human|captcha/i.test(html)
	);
}

async function checkPlatform(
	platform: PlatformDefinition,
	username: string,
): Promise<HandleCheck> {
	const url = platform.url(username);
	const checkedAt = new Date().toISOString();

	try {
		const response = await fetch(url, {
			redirect: "follow",
			headers: {
				accept: "text/html,application/xhtml+xml",
				"user-agent":
					"Mozilla/5.0 (compatible; KungfuDomainResearch/1.0; +https://github.com/briansunter/kungfu)",
			},
			signal: AbortSignal.timeout(10_000),
		});
		const finalUrl = response.url;

		if (response.status === 404 && platform.reliableNotFound) {
			return {
				platform: platform.name,
				url,
				status: "likely-available",
				confidence: "medium",
				checkedAt,
				httpStatus: response.status,
				finalUrl,
				note: "The public profile endpoint returned 404. Confirm by attempting to claim the handle; it may be reserved or unavailable for another reason.",
			};
		}

		if ([401, 403, 429].includes(response.status)) {
			return {
				platform: platform.name,
				url,
				status: "unknown",
				confidence: "low",
				checkedAt,
				httpStatus: response.status,
				finalUrl,
				note: "The platform blocked or rate-limited the automated check. Verify manually while signed in.",
			};
		}

		const html = await response.text();
		if (looksLikeAccessGate(finalUrl, html)) {
			return {
				platform: platform.name,
				url,
				status: "unknown",
				confidence: "low",
				checkedAt,
				httpStatus: response.status,
				finalUrl,
				note: "The request reached an access gate or anti-automation page. Verify manually.",
			};
		}

		if (response.ok && platform.reliableSuccess) {
			return {
				platform: platform.name,
				url,
				status: "likely-taken",
				confidence: "high",
				checkedAt,
				httpStatus: response.status,
				finalUrl,
				note: "A public profile page was returned. Inspect it manually to confirm that it represents the intended handle and is active.",
			};
		}

		return {
			platform: platform.name,
			url,
			status: "unknown",
			confidence: "low",
			checkedAt,
			httpStatus: response.status,
			finalUrl,
			note: "This platform's public HTTP response is not a reliable availability signal. Verify by searching and attempting the platform's claim flow.",
		};
	} catch (error) {
		return {
			platform: platform.name,
			url,
			status: "unknown",
			confidence: "low",
			checkedAt,
			note: "The automated check failed.",
			error: error instanceof Error ? error.message : "Unknown network error",
		};
	}
}

export async function checkSocialName(input: string): Promise<SocialResult> {
	const name = normalizeUsername(input);
	const handles = await Promise.all(
		PLATFORMS.map((platform) => checkPlatform(platform, name)),
	);
	return {
		name,
		handles,
		note: "Automated responses are approximate.",
	};
}

async function main(): Promise<void> {
	const names = process.argv.slice(2);
	if (names.length === 0) {
		console.error("Usage: check-social.ts <name1> <name2> ...");
		process.exit(1);
	}

	const results: Array<SocialResult | { name: string; error: string }> = [];
	for (const name of names) {
		try {
			results.push(await checkSocialName(name));
		} catch (error) {
			results.push({
				name,
				error: error instanceof Error ? error.message : "Unknown error",
			});
		}
	}

	console.log(JSON.stringify(results, null, 2));
}

if (import.meta.main) {
	await main();
}
