# EVIDENCE_ARTIFACT_STANDARD

Standard artifact bundle format for release-readiness and audit handoff.

## Bundle Layout

Each capture creates:

- `captured_artifacts/release_evidence_<timestamp>/index.md`
- `captured_artifacts/release_evidence_<timestamp>/manifest.json`
- `captured_artifacts/release_evidence_<timestamp>/readiness/`
- `captured_artifacts/release_evidence_<timestamp>/policy-evaluation/`
- `captured_artifacts/release_evidence_<timestamp>/endpoint-contracts/`
- `captured_artifacts/release_evidence_<timestamp>/observability/`

## Required Files

- `readiness/dashboard_contract_validation.txt`
- `policy-evaluation/policy_pack_validation.txt`
- `endpoint-contracts/phase2_integration_reference.txt`
- `observability/observability_mapping_validation.txt`

## Minimum Release Bundle

1. Contract validator output with pass status.
2. Policy pack validator output with pass status.
3. Observability mapping validator output with pass status.
4. Integration contract reference snapshot.
5. Bundle manifest with SHA-256 checksums.

## Capture Command

```bash
bash scripts/capture_beta_artifacts.sh
```
