# THREAT_MODEL_BASELINE

Baseline STRIDE-oriented threat model for supply-chain repository hardening.

## Scope

- Static dashboard and endpoint integration layer.
- Policy-gated wrapper templates under `flower_security_wrapper/`.
- Mock API used for local and CI integration verification.

## Key Threats and Controls

- Spoofing:
  - Threat: unauthorized source impersonates logistics API upstream.
  - Control: production routing via mTLS-attested gateway and signed payload checks.
- Tampering:
  - Threat: manipulated policy or payload alters trade governance decisions.
  - Control: signed policy artifacts and immutable audit evidence.
- Repudiation:
  - Threat: missing traceability for transfer and compliance decisions.
  - Control: per-round logs and retained compliance evidence.
- Information Disclosure:
  - Threat: sensitive logistics telemetry leaves a jurisdiction without authorization.
  - Control: regional deny/allow policy gating and DP aggregation controls.
- Denial of Service:
  - Threat: endpoint overload causes stale operational decisions.
  - Control: timeout-based fallback mode and endpoint health surfaces.
- Elevation of Privilege:
  - Threat: direct branch pushes bypass review safeguards.
  - Control: branch protection plus required CI checks.
