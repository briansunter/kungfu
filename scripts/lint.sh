#!/usr/bin/env bash
# Run Biome linter/formatter and plugin/skill validation

set -eo pipefail

echo "Running Biome linter and formatter..."
bunx -y biome check --write --diagnostic-level=error .
echo "Biome check complete!"

echo ""
echo "Running plugin/skill validation..."
uv run scripts/validate.py "$@"
