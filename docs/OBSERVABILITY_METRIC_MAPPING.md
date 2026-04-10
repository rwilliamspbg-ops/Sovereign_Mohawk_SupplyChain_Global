# OBSERVABILITY_METRIC_MAPPING

This document defines metric naming and smoke-check expectations for supply-chain dashboard observability wiring.

## Canonical Mapping Source

- `contracts/observability_metric_mapping.json`

## Naming Standard

- Use `supplychain_` prefix for dashboard-bound metrics.
- Prefer snake_case for Prometheus metric identifiers.
- Keep dashboard aliases backward compatible (`camelCase` + `snake_case`).

## Grafana Panel References

- `supplychain_fl_nodes_online` -> panel `supplychain-overview/nodes-online`
- `supplychain_fl_round_current` -> panel `supplychain-overview/fl-round`
- `supplychain_compliance_score` -> panel `supplychain-governance/compliance-score`
- `supplychain_token_rate_per_minute` -> panel `supplychain-tokenomics/token-rate`
- `supplychain_service_latency_ms` -> panel `supplychain-ops/service-latency`
- `supplychain_service_requests_per_second` -> panel `supplychain-ops/service-throughput`

## Smoke Checks

1. `nodes_online` and `fl_round` update at least once in a 15-minute window.
2. Compliance score remains within `0..100` bounds.
3. Service latency histogram emits buckets for all required services.
4. Service throughput metric is non-negative for all required services.
5. Dashboard endpoint status panel renders optional latency/throughput service fields.

## Validator

```bash
python3 scripts/validate_observability_mapping.py
```
