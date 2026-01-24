#!/usr/bin/env bun
/**
 * DNS Availability Checker
 *
 * Performs DNS lookups to check if domains are registered.
 * If no DNS records are found, the domain is likely available.
 *
 * Usage:
 *   bun run scripts/check-dns.ts example.com example.io ...
 *   bun run check-dns $(cat domains.txt)
 */

import { resolve4, resolveCname } from 'dns/promises';

export {};

interface DomainResult {
  domain: string;
  status: 'available' | 'registered' | 'error';
  records?: string[];
  error?: string;
}

const results: DomainResult[] = [];
const domains = process.argv.slice(2);

if (domains.length === 0) {
  console.error('Usage: check-dns.ts <domain1> <domain2> ...');
  process.exit(1);
}

console.log(`Checking ${domains.length} domain(s)...\n`);

// Check each domain
for (const domain of domains) {
  try {
    const result: DomainResult = { domain, status: 'available' };

    // Try to resolve A record
    try {
      const addresses = await resolve4(domain);
      if (addresses && addresses.length > 0) {
        result.status = 'registered';
        result.records = addresses;
      }
    } catch {
      // No A record found
    }

    // Also check CNAME
    if (result.status === 'available') {
      try {
        const cnames = await resolveCname(domain);
        if (cnames && cnames.length > 0) {
          result.status = 'registered';
          result.records = [...cnames];
        }
      } catch {
        // No CNAME found
      }
    }

    results.push(result);
  } catch (error) {
    results.push({
      domain,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

// Display results
console.log('Results:');
console.log('─'.repeat(80));

for (const result of results) {
  const icon = result.status === 'available' ? '✅' :
               result.status === 'registered' ? '❌' : '⚠️';
  console.log(`${icon} ${result.domain.padEnd(30)} ${result.status.toUpperCase().padEnd(12)}`);

  if (result.records && result.records.length > 0) {
    console.log(`  Records: ${result.records.slice(0, 3).join(', ')}${result.records.length > 3 ? '...' : ''}`);
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
