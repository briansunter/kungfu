#!/usr/bin/env bash

set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

just readme-table --write >/dev/null

if ! git diff --quiet -- README.md; then
	git add README.md
	echo "Updated README skills table."
fi
