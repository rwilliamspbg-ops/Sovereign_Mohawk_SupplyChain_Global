# Flower Security Wrapper (Supply Chain)

This folder contains the supply-chain-adapted policy and validation layer for federated learning rounds.

## Intended Scope

- Signed model-update enforcement.
- Regional policy checks before aggregation acceptance.
- Hooks for poisoning detection and secure aggregation constraints.
- Integration points for Mohawk streaming aggregation and attestation guards.

## Next Adapter Work

1. Import domain-agnostic wrapper logic from ecosystem template.
2. Apply supply-chain policy packs and regional gate rules.
3. Add integration tests for denied/allowed transfer scenarios.
