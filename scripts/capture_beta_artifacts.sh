#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="${ROOT_DIR}/captured_artifacts"
TIMESTAMP="$(date -u +"%Y%m%dT%H%M%SZ")"
BUNDLE_DIR="${OUT_DIR}/release_evidence_${TIMESTAMP}"
LEGACY_SUMMARY="${OUT_DIR}/beta_summary_${TIMESTAMP}.md"

mkdir -p "${BUNDLE_DIR}/readiness"
mkdir -p "${BUNDLE_DIR}/policy-evaluation"
mkdir -p "${BUNDLE_DIR}/endpoint-contracts"
mkdir -p "${BUNDLE_DIR}/observability"

run_check() {
	local cmd="$1"
	local output_file="$2"
	if eval "${cmd}" >"${output_file}" 2>&1; then
		echo "PASS" >>"${output_file}"
	else
		echo "FAIL" >>"${output_file}"
		return 1
	fi
}

run_check "python3 ${ROOT_DIR}/scripts/validate_dashboard_contract.py" "${BUNDLE_DIR}/readiness/dashboard_contract_validation.txt"
run_check "python3 ${ROOT_DIR}/scripts/validate_policy_pack.py" "${BUNDLE_DIR}/policy-evaluation/policy_pack_validation.txt"
run_check "python3 ${ROOT_DIR}/scripts/validate_observability_mapping.py" "${BUNDLE_DIR}/observability/observability_mapping_validation.txt"

cp "${ROOT_DIR}/docs/PHASE2_INTEGRATION.md" "${BUNDLE_DIR}/endpoint-contracts/phase2_integration_reference.txt"
cp "${ROOT_DIR}/contracts/observability_metric_mapping.json" "${BUNDLE_DIR}/observability/observability_metric_mapping.json"
cp "${ROOT_DIR}/flower_security_wrapper/test_vectors.supplychain.json" "${BUNDLE_DIR}/policy-evaluation/test_vectors.supplychain.json"

cat > "${BUNDLE_DIR}/index.md" <<EOF2
# Supply Chain Release Evidence Bundle

Generated: ${TIMESTAMP}

## Included

- readiness/dashboard_contract_validation.txt
- policy-evaluation/policy_pack_validation.txt
- endpoint-contracts/phase2_integration_reference.txt
- observability/observability_mapping_validation.txt
- observability/observability_metric_mapping.json

## Standard

See docs/EVIDENCE_ARTIFACT_STANDARD.md for required artifact semantics.
EOF2

{
	echo "{"
	echo "  \"generated\": \"${TIMESTAMP}\"," 
	echo "  \"bundle\": \"$(basename "${BUNDLE_DIR}")\"," 
	echo "  \"files\": ["
	find "${BUNDLE_DIR}" -type f ! -name manifest.json | sort | while read -r path; do
		rel_path="${path#${BUNDLE_DIR}/}"
		checksum="$(sha256sum "${path}" | awk '{print $1}')"
		echo "    { \"path\": \"${rel_path}\", \"sha256\": \"${checksum}\" },"
	done
	echo "  ]"
	echo "}"
} >"${BUNDLE_DIR}/manifest.json"

# remove trailing comma in manifest entries
sed -i ':a;N;$!ba;s/},\n  ]/}\n  ]/' "${BUNDLE_DIR}/manifest.json"

cat > "${LEGACY_SUMMARY}" <<EOF2
# Supply Chain Beta Artifact Summary

Generated: ${TIMESTAMP}

## Included

- Dashboard contract validation: PASS
- Policy pack validation: PASS
- Observability mapping validation: PASS
- Release evidence bundle: $(basename "${BUNDLE_DIR}")

## Notes

This artifact includes scaffold-level and Phase 2 integration validation evidence.
EOF2

echo "Wrote ${LEGACY_SUMMARY}"
echo "Wrote ${BUNDLE_DIR}/index.md"
echo "Wrote ${BUNDLE_DIR}/manifest.json"
