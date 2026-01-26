#!/usr/bin/env bun
/**
 * Trademark Checker
 *
 * Performs a preliminary web search for potential business conflicts
 * and generates direct links to official trademark databases for manual verification.
 *
 * Usage:
 *   bun run scripts/check-trademarks.ts velora zenify taskflow
 *   bun run check-trademarks $(cat names.txt)
 */

import * as cheerio from 'cheerio';

export { };

interface TrademarkResult {
  name: string;
  webResults?: number;
  riskLevel: 'low' | 'medium' | 'high'; // Based ONLY on web presence
  links: {
    uspto: string;
    euipo: string;
    wipo: string;
  };
  error?: string;
}

const results: TrademarkResult[] = [];
const names = process.argv.slice(2);

if (names.length === 0) {
  console.error('Usage: check-trademarks.ts <name1> <name2> ...');
  process.exit(1);
}

console.log(`Generating trademark search links for ${names.length} name(s)...\n`);

/**
 * Perform web search for active businesses using the name
 */
async function webSearch(query: string): Promise<number> {
  try {
    // Use DuckDuck Go HTML version (no API key needed)
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' "business" OR "software" OR "app"')}`;
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

/**
 * Generate deep links to trademark databases
 */
function generateLinks(name: string) {
  return {
    // USPTO Basic Word Mark Search (TESS substitute)
    // Note: USPTO URLs change often, pointing to the main search hub is safest, but we try a search query if possible.
    // As of 2025, CloudSearch is the new system.
    uspto: `https://tmsearch.uspto.gov/search/search-results?searchType=basic&query=${encodeURIComponent(name)}`,

    // EUIPO eSearch
    euipo: `https://euipo.europa.eu/eSearch/#/trademark/search?find=${encodeURIComponent(name)}`,

    // WIPO Global Brand Database
    wipo: `https://www3.wipo.int/branddb/en/#{"keys":"${name}"}`
  };
}

// Check each name
for (const name of names) {
  try {
    console.log(`Processing "${name}"...`);

    const result: TrademarkResult = {
      name,
      riskLevel: 'low',
      links: generateLinks(name)
    };

    // Run web search
    const webCount = await webSearch(name);
    result.webResults = webCount;

    // Determine preliminary risk level based on WEB presence only
    if (webCount > 20) {
      result.riskLevel = 'high';
    } else if (webCount > 5) {
      result.riskLevel = 'medium';
    } else {
      result.riskLevel = 'low';
    }

    results.push(result);
  } catch (error) {
    results.push({
      name,
      riskLevel: 'low',
      links: generateLinks(name),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Delay to avoid rate limiting on DuckDuckGo
  await new Promise(resolve => setTimeout(resolve, 1000));
}

// Display results
console.log('\nResults:');
console.log('─'.repeat(80));

for (const result of results) {
  const icon = result.riskLevel === 'low' ? '✅' :
    result.riskLevel === 'medium' ? '⚠️' : 'hz'; // High web presence doesn't mean trademark, but it's a signal

  console.log(`${icon} ${result.name.padEnd(30)} WEB ACTIVITY: ${result.riskLevel.toUpperCase()}`);

  if (result.webResults !== undefined) {
    console.log(`  Web Matches: ~${result.webResults} (DuckDuckGo hit count)`);
  }

  console.log(`  \n  🤖 AGENT HINT: Use your browser tool to protect the user.`);
  console.log(`  1. Open these URLs to check for direct conflicts.`);
  console.log(`  2. If blocked, search google for "trademark search [name]" and browse manually.`);
  console.log(`  USPTO (US):  ${result.links.uspto}`);
  console.log(`  EUIPO (EU):  ${result.links.euipo}`);
  console.log(`  WIPO (Intl): ${result.links.wipo}`);

  if (result.error) {
    console.log(`  Error: ${result.error}`);
  }
  console.log();
}

// Output JSON for programmatic use
console.log('\n--- JSON OUTPUT ---');
console.log(JSON.stringify(results, null, 2));

console.log('\n⚠️  IMPORTANT: "Web Activity" is just a hint. You MUST check the links above for actual legal trademarks.');