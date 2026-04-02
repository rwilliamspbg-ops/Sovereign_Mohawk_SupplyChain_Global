# Release Notes v0.1.0

## Dashboard URL

- https://rwilliamspbg-ops.github.io/Sovereign_Mohawk_SupplyChain_Global/

## Endpoint Contract Version

- Contract baseline: v1.0
- Endpoint namespace: /api/supplychain/*
- Contract reference: docs/PHASE2_INTEGRATION.md

## Known Limitations

- Current dashboard is mock-backed by default for local and CI flows.
- Production adapter wiring to Mohawk runtime/exporters is planned in Phase 2.
- Release-grade evidence bundle automation is partially scaffolded and requires domain-specific adapter artifacts.

## Governance and Quality

- Main branch is PR-only with required checks and CODEOWNERS review.
- Required checks: contract-and-smoke, CodeQL (python/javascript), gitleaks.
