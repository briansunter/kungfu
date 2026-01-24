#!/usr/bin/env sh
# Type check all TypeScript files in the repository

set -e

echo "Type checking TypeScript files..."

bunx tsc --noEmit

echo "Type check complete!"
