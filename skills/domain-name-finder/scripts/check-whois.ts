#!/usr/bin/env bun
/**
 * WHOIS Checker
 *
 * Queries WHOIS servers using the system whois command with fallbacks.
 * Supports multiple WHOIS servers and retry logic.
 *
 * Usage:
 *   bun run scripts/check-whois.ts example.com example.io ...
 *   bun run check-whois $(cat domains.txt)
 */

import { $ } from 'bun';

export {};

interface WhoisResult {
  domain: string;
  status: 'available' | 'registered' | 'error';
  registrar?: string;
  createdDate?: string;
  expirationDate?: string;
  nameservers?: string[];
  error?: string;
}

const results: WhoisResult[] = [];
const domains = process.argv.slice(2);

if (domains.length === 0) {
  console.error('Usage: check-whois.ts <domain1> <domain2> ...');
  process.exit(1);
}

console.log(`Checking WHOIS for ${domains.length} domain(s)...\n`);

/**
 * WHOIS servers to try (in order)
 */
const WHOIS_SERVERS = [
  'whois.iana.org',      // IANA - gets the correct WHOIS server
  'whois.crsnic.net',    // Verisign (for .com, .net, etc.)
  'whois.markmonitor.com',
  'whois.godaddy.com',
  'whois.namecheap.com',
];

/**
 * Parse WHOIS output for key information
 */
function parseWhoisOutput(whoisText: string): Partial<WhoisResult> {
  const info: Partial<WhoisResult> = { status: 'registered' };

  const lines = whoisText.split('\n');

  // Common patterns for registrar
  const registrarPatterns = [
    /Registrar\s*(?::|[^a-zA-Z]*\s*)(.+)/i,
    /Registrar Name\s*:\s*(.+)/i,
    /Sponsoring Registrar\s*:\s*(.+)/i,
    /Registrar WHOIS Server\s*:\s*(.+)/i,
  ];

  // Common patterns for dates
  const createdPatterns = [
    /Creation Date\s*:\s*(.+)/i,
    /Created On\s*:\s*(.+)/i,
    /Created\s*:\s*(.+)/i,
    /Registration Time\s*:\s*(.+)/i,
    /Domain Name Commencement Date\s*:\s*(.+)/i,
    /Record created on\s*(.+)/i,
  ];

  const expirationPatterns = [
    /Registry Expiry Date\s*:\s*(.+)/i,
    /Expiry Date\s*:\s*(.+)/i,
    /Expiration Date\s*:\s*(.+)/i,
    /Expiration Time\s*:\s*(.+)/i,
    /Domain Name Expiration Date\s*:\s*(.+)/i,
    /Record expires on\s*(.+)/i,
  ];

  // Common patterns for nameservers
  const nameserverPatterns = [
    /Name Server\s*:\s*(.+)/i,
    /nserver\s*:\s*(.+)/i,
    /Name Server\s*[^a-zA-Z]*\s*(.+)/i,
    /Name Server:\s*(NS\d*)\s*(.+)/i,
  ];

  const nameservers: string[] = [];

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Extract registrar
    for (const pattern of registrarPatterns) {
      const match = trimmedLine.match(pattern);
      if (match?.[1] && !info.registrar) {
        info.registrar = match[1].trim();
      }
    }

    // Extract creation date
    for (const pattern of createdPatterns) {
      const match = trimmedLine.match(pattern);
      if (match?.[1] && !info.createdDate) {
        info.createdDate = match[1].trim();
      }
    }

    // Extract expiration date
    for (const pattern of expirationPatterns) {
      const match = trimmedLine.match(pattern);
      if (match?.[1] && !info.expirationDate) {
        info.expirationDate = match[1].trim();
      }
    }

    // Extract nameservers
    for (const pattern of nameserverPatterns) {
      const match = trimmedLine.match(pattern);
      if (match) {
        const ns = match[1] || match[2];
        if (ns && !nameservers.includes(ns.trim())) {
          nameservers.push(ns.trim());
        }
      }
    }
  }

  if (nameservers.length > 0) {
    info.nameservers = nameservers;
  }

  // Check if domain is available (no meaningful data found)
  const hasData = info.registrar || info.createdDate || (nameservers.length > 0);

  // Also check for explicit "not found" messages
  const notFoundPatterns = [
    /No match for domain/i,
    /No entries found/i,
    /Domain not found/i,
    /NOT FOUND/i,
    /No such domain/i,
    /Status:.*available/i,
  ];

  for (const pattern of notFoundPatterns) {
    if (pattern.test(whoisText)) {
      info.status = 'available';
      return info;
    }
  }

  if (!hasData) {
    info.status = 'available';
  }

  return info;
}

/**
 * Query WHOIS for a domain using system whois command
 */
async function queryWhois(domain: string, server?: string): Promise<{ success: boolean; output?: string; error?: string }> {
  try {
    const args = server ? ['-h', server, domain] : [domain];

    const result = await $`whois ${args}`.quiet();
    return { success: true, output: result.stdout.toString() };
  } catch (error: any) {
    // Check if it's a "not found" error (which means available)
    const stderr = error.stderr?.toString() || '';

    if (stderr.includes('No match') ||
        stderr.includes('NOT FOUND') ||
        stderr.includes('No entries found')) {
      return { success: true, output: stderr };
    }

    return {
      success: false,
      error: stderr || error.message || 'Unknown WHOIS error',
    };
  }
}

/**
 * Get WHOIS info with fallback servers
 */
async function getWhoisWithFallbacks(domain: string): Promise<Partial<WhoisResult>> {
  // First try: default WHOIS (no server specified)
  let result = await queryWhois(domain);

  if (result.success && result.output) {
    const parsed = parseWhoisOutput(result.output);

    // If we got meaningful data, return it
    if (parsed.status === 'registered' && (parsed.registrar || parsed.createdDate)) {
      return parsed;
    }

    // If explicitly marked as available, return it
    if (parsed.status === 'available') {
      return parsed;
    }
  }

  // Fallback: Try specific WHOIS servers
  for (const server of WHOIS_SERVERS) {
    result = await queryWhois(domain, server);

    if (result.success && result.output) {
      const parsed = parseWhoisOutput(result.output);

      if (parsed.status === 'registered' && (parsed.registrar || parsed.createdDate)) {
        return parsed;
      }

      if (parsed.status === 'available') {
        return parsed;
      }
    }

    // Small delay between servers
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // If all attempts failed or returned unclear results
  if (result.success && result.output) {
    return parseWhoisOutput(result.output);
  }

  return {
    status: 'error',
    error: result.error || 'Failed to get WHOIS information',
  };
}

// Check each domain
for (const domain of domains) {
  try {
    console.log(`Checking "${domain}"...`);

    const whoisInfo = await getWhoisWithFallbacks(domain);

    results.push({
      domain,
      ...whoisInfo,
    } as WhoisResult);
  } catch (error) {
    results.push({
      domain,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Small delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 200));
}

// Display results
console.log('\nResults:');
console.log('─'.repeat(80));

for (const result of results) {
  const icon = result.status === 'available' ? '✅' :
               result.status === 'registered' ? '❌' : '⚠️';
  console.log(`${icon} ${result.domain.padEnd(30)} ${result.status.toUpperCase().padEnd(12)}`);

  if (result.status === 'registered') {
    if (result.registrar) {
      console.log(`  Registrar: ${result.registrar}`);
    }
    if (result.createdDate) {
      console.log(`  Created: ${result.createdDate}`);
    }
    if (result.expirationDate) {
      console.log(`  Expires: ${result.expirationDate}`);
    }
    if (result.nameservers && result.nameservers.length > 0) {
      console.log(`  Nameservers: ${result.nameservers.slice(0, 2).join(', ')}${result.nameservers.length > 2 ? '...' : ''}`);
    }
  }

  if (result.error) {
    console.log(`  Error: ${result.error}`);
  }
  console.log();
}

// Summary
const available = results.filter(r => r.status === 'available').length;
const registered = results.filter(r => r.status === 'registered').length;
const errors = results.filter(r => r.status === 'error').length;

console.log('─'.repeat(80));
console.log(`Summary: ${available} available, ${registered} registered, ${errors} errors`);

// Output JSON for programmatic use
console.log('\n--- JSON OUTPUT ---');
console.log(JSON.stringify(results, null, 2));
