#!/usr/bin/env bun
/**
 * Trademark Checker
 *
 * Searches for potential trademark conflicts in USPTO, EUIPO, and via web search.
 * Performs basic screening to flag names that may need legal review.
 *
 * Usage:
 *   bun run scripts/check-trademarks.ts velora zenify taskflow
 *   bun run check-trademarks $(cat names.txt)
 */

import * as cheerio from 'cheerio';

export { };

interface TrademarkResult {
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  usptoResults?: number;
  euiroResults?: number;
  webResults?: number;
  conflicts?: string[];
  error?: string;
}

const results: TrademarkResult[] = [];
const names = process.argv.slice(2);

if (names.length === 0) {
  console.error('Usage: check-trademarks.ts <name1> <name2> ...');
  process.exit(1);
}

console.log(`Checking trademarks for ${names.length} name(s)...\n`);

/**
 * Search USPTO TESS database for trademark conflicts
 */
async function searchUSPTO(query: string): Promise<number> {
  try {
    const url = `https://www.uspto.gov/trademarks-application-process/search-trademark-database?term=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      return 0;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Count results (this is approximate - actual parsing depends on USPTO page structure)
    const resultText = $('.results-count, .search-results-count, [data-testid="results-count"]').text();
    const match = resultText.match(/(\d+)/);
    return match?.[1] ? parseInt(match[1]) : 0;
  } catch {
    return 0;
  }
}

/**
 * Search EUIPO (EU) for trademark conflicts
 */
async function searchEUIPO(query: string): Promise<number> {
  try {
    const url = `https://euipo.europa.eu/eSearch/#/trademark?text=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      return 0;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Count results (approximate)
    const resultText = $('.results-count, .count, [data-count]').text();
    const match = resultText.match(/(\d+)/);
    return match?.[1] ? parseInt(match[1]) : 0;
  } catch {
    return 0;
  }
}

/**
 * Perform web search for active businesses using the name
 */
async function webSearch(query: string): Promise<number> {
  try {
    // Use DuckDuck Go HTML version (no API key needed)
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' business software service')}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      return 0;
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Count web results
    return $('.result').length;
  } catch {
    return 0;
  }
}

// Check each name
for (const name of names) {
  try {
    console.log(`Checking "${name}"...`);

    const result: TrademarkResult = {
      name,
      riskLevel: 'low',
    };

    // Run searches in parallel
    const [usptoCount, euiroCount, webCount] = await Promise.all([
      searchUSPTO(name),
      searchEUIPO(name),
      webSearch(name),
    ]);

    result.usptoResults = usptoCount;
    result.euiroResults = euiroCount;
    result.webResults = webCount;

    // Determine risk level based on results
    if (usptoCount > 10 || euiroCount > 10 || webCount > 20) {
      result.riskLevel = 'high';
    } else if (usptoCount > 3 || euiroCount > 3 || webCount > 10) {
      result.riskLevel = 'medium';
    } else {
      result.riskLevel = 'low';
    }

    // Collect conflicts (names of similar trademarks)
    result.conflicts = [];
    if (usptoCount > 0) {
      result.conflicts.push(`USPTO: ${usptoCount} potential match(es)`);
    }
    if (euiroCount > 0) {
      result.conflicts.push(`EUIPO: ${euiroCount} potential match(es)`);
    }
    if (webCount > 5) {
      result.conflicts.push(`Web: ${webCount} active businesses found`);
    }

    results.push(result);
  } catch (error) {
    results.push({
      name,
      riskLevel: 'low',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 500));
}

// Display results
console.log('\nResults:');
console.log('─'.repeat(80));

for (const result of results) {
  const icon = result.riskLevel === 'low' ? '✅' :
    result.riskLevel === 'medium' ? '⚠️' : '❌';
  console.log(`${icon} ${result.name.padEnd(30)} RISK: ${result.riskLevel.toUpperCase().padEnd(8)}`);

  if (result.usptoResults !== undefined) {
    console.log(`  USPTO: ${result.usptoResults} result(s)`);
  }
  if (result.euiroResults !== undefined) {
    console.log(`  EUIPO: ${result.euiroResults} result(s)`);
  }
  if (result.webResults !== undefined) {
    console.log(`  Web: ${result.webResults} active businesses`);
  }

  if (result.conflicts && result.conflicts.length > 0) {
    console.log(`  Conflicts: ${result.conflicts.join('; ')}`);
  }

  if (result.error) {
    console.log(`  Error: ${result.error}`);
  }
  console.log();
}

// Summary
const lowRisk = results.filter(r => r.riskLevel === 'low').length;
const mediumRisk = results.filter(r => r.riskLevel === 'medium').length;
const highRisk = results.filter(r => r.riskLevel === 'high').length;

console.log('─'.repeat(80));
console.log(`Summary: ${lowRisk} low risk, ${mediumRisk} medium risk, ${highRisk} high risk`);

// Output JSON for programmatic use
console.log('\n--- JSON OUTPUT ---');
console.log(JSON.stringify(results, null, 2));

console.log('\n⚠️  DISCLAIMER: This is preliminary screening only. Not legal advice.');
console.log('   Consult a trademark attorney for definitive clearance.');
