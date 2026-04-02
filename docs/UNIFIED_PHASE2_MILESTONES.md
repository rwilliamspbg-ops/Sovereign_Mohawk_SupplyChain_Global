# Unified Phase 2 Milestones

Shared execution plan for Agriculture, Climate, and Supply Chain sibling repositories.

## Milestone 1: Live Gateway Adapters

- Implement production API adapter for `/api/*/stats`, `/regions`, `/pipeline`, `/risk`, `/health`.
- Route from Mohawk runtime + exporter stack into dashboard contract schema.
- Add failure-mode fallback and endpoint-level health telemetry.

## Milestone 2: Production Policy Packs

- Publish domain-specific policy bundles in `flower_security_wrapper/`.
- Validate deny/allow behaviors for cross-border transfer constraints.
- Add attestation-gated acceptance tests for policy branches.

## Milestone 3: Observability Metric Mapping

- Map Prometheus metrics to dashboard-layer contract fields.
- Standardize service health, throughput, and latency metric naming.
- Add Grafana panel references and smoke checks for each domain.

## Milestone 4: Evidence Artifact Standards

- Standardize release evidence index structure across all sibling repos.
- Capture readiness, policy-evaluation, and endpoint-contract artifacts.
- Define minimum artifact bundle for release tag cut and audit handoff.
