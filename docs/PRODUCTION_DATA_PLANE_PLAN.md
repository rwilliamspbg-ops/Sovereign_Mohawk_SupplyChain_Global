# Production Data Plane Integration Plan

Current dashboard integrations are mock-backed. This plan defines production wiring.

## Goal

Wire live `/api/*` endpoints from Mohawk runtime and exporters with auditable evidence capture.

## Workstreams

### 1. Runtime Adapter Layer

- Build adapter service that translates runtime/exporter payloads to dashboard contract schema.
- Enforce timeout and fallback behavior.

### 2. Contract Validation in Production

- Run contract validator against live adapter payloads during CI and staging gates.
- Fail on schema drift.

### 3. End-to-End Proof Artifacts

- Capture readiness reports, endpoint snapshots, and policy-evaluation outputs.
- Store versioned artifacts under release evidence bundles.

### 4. Release Gate

- Require successful live endpoint smoke tests before release tag creation.
- Include known limitations and rollout guardrails in release notes.
