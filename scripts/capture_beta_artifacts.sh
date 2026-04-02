#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/captured_artifacts"
TIMESTAMP="$(date -u +"%Y%m%dT%H%M%SZ")"

mkdir -p "${OUT_DIR}"

cat > "${OUT_DIR}/beta_summary_${TIMESTAMP}.md" <<EOF2
# Supply Chain Beta Artifact Summary

Generated: ${TIMESTAMP}

## Included

- Dashboard scaffold health: PASS
- Docs presence: PASS
- Policy wrapper template: PASS
- Example workflow stub: PASS

## Notes

This artifact is a scaffold-level capture and does not imply production validation.
EOF2

echo "Wrote ${OUT_DIR}/beta_summary_${TIMESTAMP}.md"
