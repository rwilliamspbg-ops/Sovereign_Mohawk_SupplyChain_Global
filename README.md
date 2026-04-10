# Sovereign Mohawk Supply Chain Global

Policy-gated federated learning for global supply-chain intelligence.

Sovereign Mohawk Supply Chain Global enables enterprise-sovereign and nation-sovereign AI for disruption prediction, traceability, inventory forecasting, carbon-compliant routing, and resilience modeling without centralizing raw commercial logistics data.

## Tagline

Sovereign Mohawk Supply Chain Global: every shipment, factory, and port keeps full data sovereignty while training planetary-scale AI for resilient, transparent, and net-zero supply chains.

## Ecosystem

Core repositories:

- [Sovereign-Mohawk-Proto](https://github.com/rwilliamspbg-ops/Sovereign-Mohawk-Proto)
- [Sovereign_Map_Federated_Learning](https://github.com/rwilliamspbg-ops/Sovereign_Map_Federated_Learning)
- [Sovereign_Mohawk_Oncology_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Oncology_Global)
- [Sovereign_Mohawk_Agriculture_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Agriculture_Global)
- [Sovereign_Mohawk_Climate_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_Climate_Global)
- [Sovereign_Mohawk_SupplyChain_Global](https://github.com/rwilliamspbg-ops/Sovereign_Mohawk_SupplyChain_Global)

Canonical architecture and shared execution plans:

- [docs/ECOSYSTEM_ARCHITECTURE.md](docs/ECOSYSTEM_ARCHITECTURE.md)
- [docs/UNIFIED_PHASE2_MILESTONES.md](docs/UNIFIED_PHASE2_MILESTONES.md)
- [docs/GOVERNANCE_PR_ONLY.md](docs/GOVERNANCE_PR_ONLY.md)
- [docs/ACTION_PINNING_POLICY.md](docs/ACTION_PINNING_POLICY.md)
- [docs/PRODUCTION_DATA_PLANE_PLAN.md](docs/PRODUCTION_DATA_PLANE_PLAN.md)

## Ecosystem Fit (April 2, 2026)

- Proto: runtime, zk-SNARK verification, PQC, BFT trust controls.
- Map: streaming aggregation profile, high-scale orchestration, tokenomics telemetry.
- Oncology: policy-gated wrapper and compliance workflow pattern.
- Agriculture and Climate: geospatial dashboard and risk-layer interaction baseline.

Progression:

Proto -> Map -> Oncology -> Agriculture -> Climate -> Supply Chain.

## Core Features

### 1) Policy-Gated Supply-Chain FL

- Signed model updates only.
- Regional policy checks and poisoned-update rejection taxonomy.
- Differential privacy and secure aggregation in the supply-chain wrapper path.

### 2) Geospatial Supply-Chain Intelligence Dashboard

- Region drill-down by trade corridor, port system, manufacturing cluster, and last-mile zone.
- Live layers: disruption risk, carbon-footprint convergence, inventory pressure, rerouting simulations, and geopolitical overlays.
- FL pipeline, node health, compliance scorecards, and tokenomics telemetry.

### 3) Compliance and Sovereignty Toolkit

- Mapping support for C-TPAT, EU CBAM, UFLPA, WTO traceability controls, and sovereign data transfer restrictions.
- DPIA-style templates for cross-border logistics telemetry and enterprise data flow.
- Regional policy examples (for example, PQC-only weight acceptance).

### 4) LLM Governance + Threat Modeling

- Safe prompt workflows for disruption forecasting, rerouting strategy, and carbon optimization analysis.
- STRIDE baseline for counterfeit injection, sensor tampering, ransomware, and greenwashing fraud.

## Repository Layout

- `index.html`: supply-chain dashboard entry.
- `app.js`: route map, pipeline, and risk/cost/carbon visualization logic.
- `styles.css`: UI style layer.
- `manifesto.html`: supply-chain edition manifesto.
- `flower_security_wrapper/`: supply-chain policy wrapper templates.
- `mock_api/`: local supply-chain endpoint mock server.
- `docs/`: roadmap, integration, threat model, compliance evidence, beta release.
- `scripts/`: validation and artifact tooling.
- `examples/`: container + ERP workflow examples.
- `.github/workflows/`: CI, security, and pages deploy workflows.

## Quick Start

```bash
cd Sovereign_Mohawk_SupplyChain_Global
python3 -m http.server 8080
```

Open: http://localhost:8080/

## Full Local Stack (Dashboard + Mock API)

```bash
docker compose -f docker-compose.mock.yml up
```

- Dashboard: http://localhost:8080/
- Mock API: http://localhost:8088/healthz

## Phase 2 Integration (Live Endpoint Wiring)

Default endpoint targets:

- `/api/supplychain/stats`
- `/api/supplychain/regions`
- `/api/supplychain/pipeline`
- `/api/supplychain/risk`
- `/api/supplychain/health`

You can override endpoints by setting `window.SUPPLYCHAIN_DASHBOARD_CONFIG` before loading `app.js`.

```html
<script>
  window.SUPPLYCHAIN_DASHBOARD_CONFIG = {
    statsUrl: "https://your-gateway.example.com/supplychain/stats",
    regionsUrl: "https://your-gateway.example.com/supplychain/regions",
    pipelineUrl: "https://your-gateway.example.com/supplychain/pipeline",
    riskUrl: "https://your-gateway.example.com/supplychain/risk",
    healthUrl: "https://your-gateway.example.com/supplychain/health",
    timeoutMs: 5000
  };
</script>
```

See `docs/PHASE2_INTEGRATION.md` for payload contracts.

## Validation

```bash
python3 scripts/validate_dashboard_contract.py
python3 scripts/validate_policy_pack.py
python3 scripts/validate_observability_mapping.py
python3 -m unittest -q tests/test_contract_validator.py
python3 -m unittest -q tests/test_upgrade_validators.py
```

## Evidence Artifact Bundle

Capture a release-style artifact bundle with policy, contract, and observability checks:

```bash
bash scripts/capture_beta_artifacts.sh
```

Output is written under `captured_artifacts/release_evidence_<timestamp>/` with index and manifest files.

## Status

Supply Chain repository scaffold complete with CI/security baseline and local mock integration.
