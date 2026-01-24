#!/usr/bin/env bun
/**
 * Combined Domain Checker
 *
 * Runs all domain checks in parallel and generates a unified scored report.
 * Combines DNS availability, trademark screening, and social handle checking.
 *
 * Usage:
 *   bun run scripts/check-all.ts velora.io zenify.app taskflow.com
 *   bun run check-all $(cat domains.txt)
 *
 * Output: Unified report with scores and recommendations
 */

import { resolve4, resolveCname } from 'dns/promises';

export {};

// ============================================================================
// Interfaces
// ============================================================================

interface DomainReport {
  domain: string;
  name: string; // Extracted from domain (without TLD)

  // Availability status
  dnsStatus: 'available' | 'registered' | 'error';
  whoisStatus?: 'available' | 'registered' | 'error';
  registrar?: string;
  createdDate?: string;

  // Trademark check
  trademarkRisk: 'low' | 'medium' | 'high';
  usptoResults?: number;
  euiroResults?: number;
  webResults?: number;

  // Social handles
  twitter?: 'available' | 'taken';
  instagram?: 'available' | 'taken';
  github?: 'available' | 'taken';
  linkedin?: 'available' | 'taken';
  youtube?: 'available' | 'taken';
  socialAvailable?: number;
  socialTaken?: number;

  // Scoring
  scores: {
    brandability: number;
    trademarkRisk: number;
    seoPotential: number;
    socialPotential: number;
    total: number;
  };

  // Recommendation
  recommendation: 'recommended' | 'consider' | 'avoid';
  reasons: string[];

  error?: string;
}

// ============================================================================
// DNS Checking
// ============================================================================

async function checkDNS(domain: string): Promise<{ status: 'available' | 'registered' | 'error'; records?: string[] }> {
  try {
    const result: { status: 'available' | 'registered' | 'error'; records: string[] } = { status: 'available', records: [] };

    // Try A record
    try {
      const addresses = await resolve4(domain);
      if (addresses && addresses.length > 0) {
        result.status = 'registered';
        result.records = addresses;
      }
    } catch {
      // No A record
    }

    // Try CNAME
    if (result.status === 'available') {
      try {
        const cnames = await resolveCname(domain);
        if (cnames && cnames.length > 0) {
          result.status = 'registered';
          result.records.push(...cnames);
        }
      } catch {
        // No CNAME
      }
    }

    return result;
  } catch (error) {
    return { status: 'error' };
  }
}

// ============================================================================
// Trademark Checking (Web-based)
// ============================================================================

async function checkTrademark(name: string): Promise<{ risk: 'low' | 'medium' | 'high'; uspto: number; euiro: number; web: number }> {
  try {
    // Use web search for trademark screening
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(name + ' trademark USPTO EUIPO')}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return { risk: 'low', uspto: 0, euiro: 0, web: 0 };
    }

    const html = await response.text();

    // Count results (approximate based on result markers)
    const resultCount = (html.match(/result__/g) || []).length;

    // Determine risk based on result count
    let risk: 'low' | 'medium' | 'high' = 'low';
    if (resultCount > 20) {
      risk = 'high';
    } else if (resultCount > 10) {
      risk = 'medium';
    }

    // Estimate breakdown
    const uspto = Math.floor(resultCount * 0.3);
    const euiro = Math.floor(resultCount * 0.2);
    const web = resultCount - uspto - euiro;

    return { risk, uspto, euiro, web };
  } catch {
    return { risk: 'low', uspto: 0, euiro: 0, web: 0 };
  }
}

// ============================================================================
// Social Handle Checking
// ============================================================================

async function checkSocialHandle(platform: string, username: string): Promise<'available' | 'taken'> {
  const urls: Record<string, string> = {
    twitter: `https://twitter.com/${username}`,
    instagram: `https://instagram.com/${username}`,
    github: `https://github.com/${username}`,
    linkedin: `https://www.linkedin.com/in/${username}`,
    youtube: `https://www.youtube.com/@${username}`,
  };

  const url = urls[platform];
  if (!url) return 'taken';

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    // Check for 404
    if (response.status === 404) {
      return 'available';
    }

    // Verify by fetching page content
    const getResponse = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    const html = await getResponse.text();

    // Platform-specific availability indicators
    const unavailablePatterns: Record<string, RegExp[]> = {
      twitter: [/This account doesn't exist/i, /page doesn't exist/i, /Account suspended/i],
      instagram: [/page isn't available/i, /Sorry, this page isn't available/i],
      github: [/Not Found/i, /page does not exist/i],
      linkedin: [/page does not exist/i, /Profile not found/i],
      youtube: [/This page isn't available/i, /not found/i],
    };

    const patterns = unavailablePatterns[platform] || [];

    for (const pattern of patterns) {
      if (pattern.test(html)) {
        return 'available';
      }
    }

    return 'taken';
  } catch {
    return 'taken';
  }
}

// ============================================================================
// Scoring System
// ============================================================================

function calculateScore(report: DomainReport): DomainReport['scores'] {
  // Brandability (1-10)
  let brandability = 5;
  const name = report.name.toLowerCase();

  // Positive factors
  if (name.length <= 6) brandability += 2;
  if (name.length <= 10) brandability += 1;
  if (/^[a-z]+$/.test(name)) brandability += 1; // Only letters
  if (!/(.)\1{2,}/.test(name)) brandability += 1; // No triple repeats

  // Negative factors
  if (/\d/.test(name)) brandability -= 1; // Contains numbers
  if (/[-_]/.test(name)) brandability -= 1; // Contains hyphen/underscore

  brandability = Math.max(1, Math.min(10, brandability));

  // Trademark risk (1-10, higher is better)
  const trademarkRisk = report.trademarkRisk === 'low' ? 10 :
                        report.trademarkRisk === 'medium' ? 5 : 1;

  // SEO potential (1-10)
  let seoPotential = 5;
  const tld = report.domain.split('.').pop() || '';

  if (tld === 'com') seoPotential += 3;
  if (['io', 'ai', 'co', 'app'].includes(tld)) seoPotential += 2;
  if (['net', 'org', 'dev'].includes(tld)) seoPotential += 1;

  seoPotential = Math.max(1, Math.min(10, seoPotential));

  // Social potential (1-10)
  const socialAvailable = report.socialAvailable || 0;
  const socialPotential = Math.round((socialAvailable / 5) * 10);

  // Total score (weighted)
  const total = Math.round(
    (brandability * 2) +
    trademarkRisk +
    seoPotential +
    socialPotential
  );

  return {
    brandability,
    trademarkRisk,
    seoPotential,
    socialPotential,
    total,
  };
}

function getRecommendation(report: DomainReport): { recommendation: string; reasons: string[] } {
  const reasons: string[] = [];

  if (report.dnsStatus === 'error' || report.whoisStatus === 'error') {
    return { recommendation: 'avoid', reasons: ['Error checking domain status'] };
  }

  if (report.dnsStatus === 'registered') {
    return { recommendation: 'avoid', reasons: ['Domain already registered'] };
  }

  if (report.trademarkRisk === 'high') {
    return { recommendation: 'avoid', reasons: ['High trademark risk'] };
  }

  if (report.scores.total >= 35) {
    if (report.trademarkRisk === 'low') {
      reasons.push('Low trademark risk');
    }
    if (report.scores.brandability >= 8) {
      reasons.push('Highly brandable name');
    }
    if (report.scores.seoPotential >= 7) {
      reasons.push('Good SEO potential');
    }
    if (report.socialAvailable! >= 4) {
      reasons.push('Most social handles available');
    }
    return { recommendation: 'recommended', reasons };
  }

  if (report.scores.total >= 25) {
    reasons.push('Moderate score');
    if (report.trademarkRisk === 'medium') {
      reasons.push('Trademark risk requires review');
    }
    return { recommendation: 'consider', reasons };
  }

  reasons.push('Low overall score');
  return { recommendation: 'avoid', reasons };
}

// ============================================================================
// Main Execution
// ============================================================================

const domains = process.argv.slice(2);

if (domains.length === 0) {
  console.error('Usage: check-all.ts <domain1> <domain2> ...');
  console.error('Example: bun run scripts/check-all.ts velora.io zenify.app taskflow.com');
  process.exit(1);
}

console.log(`\n🔍 Checking ${domains.length} domain(s)...\n`);
console.log('Running DNS, Trademark, and Social checks in parallel...\n');

const reports: DomainReport[] = [];

// Check each domain
for (const domain of domains) {
  const name = domain.split('.')[0];

  if (!name) {
    console.error(`Invalid domain: ${domain}`);
    continue;
  }

  console.log(`Checking "${domain}"...`);

  const report: DomainReport = {
    domain,
    name,
    dnsStatus: 'error',
    trademarkRisk: 'low',
    scores: {
      brandability: 0,
      trademarkRisk: 0,
      seoPotential: 0,
      socialPotential: 0,
      total: 0,
    },
    recommendation: 'avoid',
    reasons: [],
  };

  try {
    // Run checks in parallel
    const [dnsResult, trademarkResult, twitter, instagram, github, linkedin, youtube] =
      await Promise.all([
        checkDNS(domain),
        checkTrademark(name),
        checkSocialHandle('twitter', name),
        checkSocialHandle('instagram', name),
        checkSocialHandle('github', name),
        checkSocialHandle('linkedin', name),
        checkSocialHandle('youtube', name),
      ]);

    // Populate report
    report.dnsStatus = dnsResult.status;
    report.trademarkRisk = trademarkResult.risk;
    report.usptoResults = trademarkResult.uspto;
    report.euiroResults = trademarkResult.euiro;
    report.webResults = trademarkResult.web;
    report.twitter = twitter;
    report.instagram = instagram;
    report.github = github;
    report.linkedin = linkedin;
    report.youtube = youtube;

    // Count social availability
    const socials = [twitter, instagram, github, linkedin, youtube];
    report.socialAvailable = socials.filter(s => s === 'available').length;
    report.socialTaken = socials.filter(s => s === 'taken').length;

    // Calculate scores
    report.scores = calculateScore(report);

    // Get recommendation
    const recommendation = getRecommendation(report);
    report.recommendation = recommendation.recommendation as any;
    report.reasons = recommendation.reasons;

  } catch (error) {
    report.error = error instanceof Error ? error.message : 'Unknown error';
  }

  reports.push(report);

  // Small delay between domains
  await new Promise(resolve => setTimeout(resolve, 100));
}

// ============================================================================
// Display Results
// ============================================================================

console.log('\n' + '='.repeat(80));
console.log('DOMAIN ANALYSIS REPORT');
console.log('='.repeat(80) + '\n');

// Sort by total score
reports.sort((a, b) => b.scores.total - a.scores.total);

for (const report of reports) {
  const icon = report.recommendation === 'recommended' ? '✅' :
               report.recommendation === 'consider' ? '⚠️' : '❌';

  console.log(`${icon} ${report.domain}`);
  console.log(`   Status: ${report.dnsStatus.toUpperCase()}`);
  console.log(`   Score: ${report.scores.total}/40`);
  console.log(`   Breakdown: Brandability=${report.scores.brandability}, Trademark=${report.scores.trademarkRisk}, SEO=${report.scores.seoPotential}, Social=${report.scores.socialPotential}`);

  if (report.trademarkRisk !== 'low') {
    console.log(`   Trademark Risk: ${report.trademarkRisk.toUpperCase()} (USPTO: ${report.usptoResults}, EUIPO: ${report.euiroResults}, Web: ${report.webResults})`);
  }

  if (report.socialTaken! > 0) {
    console.log(`   Social Handles: ${report.socialAvailable}/5 available`);
  }

  if (report.reasons.length > 0) {
    console.log(`   Reasons: ${report.reasons.join('; ')}`);
  }

  console.log();
}

// ============================================================================
// Summary
// ============================================================================

console.log('─'.repeat(80));

const recommended = reports.filter(r => r.recommendation === 'recommended').length;
const consider = reports.filter(r => r.recommendation === 'consider').length;
const avoid = reports.filter(r => r.recommendation === 'avoid').length;

console.log(`Summary: ${recommended} recommended, ${consider} consider, ${avoid} avoid\n`);

// ============================================================================
// JSON Output
// ============================================================================

console.log('--- JSON OUTPUT ---');
console.log(JSON.stringify(reports, null, 2));
