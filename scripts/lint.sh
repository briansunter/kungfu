#!/usr/bin/env bash
# Run Biome lint checks only.
# Pass --write to enable autofixes.

set -euo pipefail

biome_args=(--diagnostic-level=error .)

for arg in "$@"; do
	if [[ "$arg" == "--write" ]]; then
		biome_args=(--write "${biome_args[@]}")
	else
		biome_args+=("$arg")
	fi
done

echo "Running Biome linter..."
bunx -y biome check "${biome_args[@]}"
echo "Biome check complete!"
