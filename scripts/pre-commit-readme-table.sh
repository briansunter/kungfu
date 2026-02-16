#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# Update README skills table
just readme-table --write >/dev/null

if ! git diff --quiet -- README.md; then
	git add README.md
	echo "Updated README skills table."
fi

# Validate skills
echo "Validating skills..."
just validate

# Lint code
echo "Linting..."
just lint
