#!/usr/bin/env bun
/**
 * Social Media Handle Checker
 *
 * Checks username/handle availability across major social platforms.
 * Uses platform-specific URLs and HTTP status codes.
 *
 * Usage:
 *   bun run scripts/check-social.ts velora zenify taskflow
 *   bun run check-social $(cat names.txt)
 */

export {};

interface SocialResult {
  name: string;
  twitter?: 'available' | 'taken';
  instagram?: 'available' | 'taken';
  github?: 'available' | 'taken';
  linkedin?: 'available' | 'taken';
  youtube?: 'available' | 'taken';
  availableCount?: number;
  takenCount?: number;
  error?: string;
}

const results: SocialResult[] = [];
const names = process.argv.slice(2);

if (names.length === 0) {
  console.error('Usage: check-social.ts <name1> <name2> ...');
  process.exit(1);
}

console.log(`Checking social handles for ${names.length} name(s)...\n`);

/**
 * Check if username is available on a platform
 */
async function checkHandle(platform: string, username: string): Promise<'available' | 'taken'> {
  const urls: Record<string, string> = {
    twitter: `https://twitter.com/${username}`,
    instagram: `https://instagram.com/${username}`,
    github: `https://github.com/${username}`,
    linkedin: `https://www.linkedin.com/in/${username}`,
    youtube: `https://www.youtube.com/@${username}`,
  };

  const url = urls[platform];
  if (!url) {
    return 'taken';
  }

  try {
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    // If we get a 404, the handle is likely available
    // If we get 200, 301, 302, the handle is taken
    // Some platforms may return 404 differently, so we also check the status

    if (response.status === 404) {
      return 'available';
    }

    // For LinkedIn, check if we're redirected to a profile page
    if (platform === 'linkedin' && response.status === 301) {
      const location = response.headers.get('location') || '';
      if (location.includes('/in/') && !location.includes('/checkpoint/')) {
        return 'taken';
      }
    }

    // For GitHub, check if we're redirected
    if (platform === 'github' && (response.status === 301 || response.status === 302)) {
      const location = response.headers.get('location') || '';
      if (location.includes(`/${username}`)) {
        return 'taken';
      }
    }

    // For Twitter/X, Instagram, YouTube
    // They often return 200 or 302 for taken handles
    if ([200, 301, 302].includes(response.status)) {
      // Need to verify by actually fetching the page
      const getResponse = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      });
      const html = await getResponse.text();

      // Platform-specific checks
      if (platform === 'twitter') {
        if (html.includes(`This account doesn't exist`) ||
            html.includes(`page doesn't exist`) ||
            html.includes(`Account suspended`)) {
          return 'available';
        }
      }

      if (platform === 'instagram') {
        if (html.includes(`page isn't available`) ||
            html.includes(`Sorry, this page isn't available`)) {
          return 'available';
        }
      }

      if (platform === 'youtube') {
        if (html.includes(`This page isn't available`) ||
            html.includes(`not found`)) {
          return 'available';
        }
      }

      if (platform === 'github') {
        if (html.includes(`Not Found`) || html.includes(`page does not exist`)) {
          return 'available';
        }
      }

      if (platform === 'linkedin') {
        if (html.includes(`page does not exist`) ||
            html.includes(`Profile not found`)) {
          return 'available';
        }
      }
    }

    // Default to taken if we can't determine
    return 'taken';
  } catch {
    // On error, assume taken
    return 'taken';
  }
}

// Check each name
for (const name of names) {
  try {
    console.log(`Checking "${name}"...`);

    const result: SocialResult = { name };

    // Check all platforms
    const [twitter, instagram, github, linkedin, youtube] = await Promise.all([
      checkHandle('twitter', name),
      checkHandle('instagram', name),
      checkHandle('github', name),
      checkHandle('linkedin', name),
      checkHandle('youtube', name),
    ]);

    result.twitter = twitter;
    result.instagram = instagram;
    result.github = github;
    result.linkedin = linkedin;
    result.youtube = youtube;

    // Count available vs taken
    const platforms = [twitter, instagram, github, linkedin, youtube];
    result.availableCount = platforms.filter(p => p === 'available').length;
    result.takenCount = platforms.filter(p => p === 'taken').length;

    results.push(result);
  } catch (error) {
    results.push({
      name,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Small delay to avoid rate limiting
  await new Promise(resolve => setTimeout(resolve, 300));
}

// Display results
console.log('\nResults:');
console.log('─'.repeat(80));

for (const result of results) {
  console.log(`${result.name}`);

  if (result.error) {
    console.log(`  Error: ${result.error}`);
  } else {
    const platforms = [
      { name: 'Twitter/X', status: result.twitter },
      { name: 'Instagram', status: result.instagram },
      { name: 'GitHub', status: result.github },
      { name: 'LinkedIn', status: result.linkedin },
      { name: 'YouTube', status: result.youtube },
    ];

    for (const platform of platforms) {
      if (platform.status) {
        const icon = platform.status === 'available' ? '✅' : '❌';
        const status = platform.status.toUpperCase().padEnd(10);
        console.log(`  ${icon} ${platform.name.padEnd(12)} ${status}`);
      }
    }

    if (result.availableCount !== undefined && result.takenCount !== undefined) {
      console.log(`  Summary: ${result.availableCount}/5 available, ${result.takenCount}/5 taken`);
    }
  }

  console.log();
}

// Summary
const totalAvailable = results.reduce((sum, r) => sum + (r.availableCount || 0), 0);
const totalTaken = results.reduce((sum, r) => sum + (r.takenCount || 0), 0);

console.log('─'.repeat(80));
console.log(`Total: ${totalAvailable} handles available, ${totalTaken} handles taken`);

// Output JSON for programmatic use
console.log('\n--- JSON OUTPUT ---');
console.log(JSON.stringify(results, null, 2));

console.log('\n⚠️  NOTE: Availability is approximate. Platforms may change availability at any time.');
