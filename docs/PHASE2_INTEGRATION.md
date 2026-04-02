# PHASE2_INTEGRATION

This guide defines expected payload contracts for live supply-chain endpoint wiring.

## Endpoint Contracts

### GET /api/supplychain/stats

```json
{
  "nodes_online": 25021,
  "fl_round": 418,
  "compliance_score": 98,
  "token_rate": 1050
}
```

Accepted aliases:

- `nodesOnline` or `nodes_online`
- `flRound` or `fl_round`
- `complianceScore` or `compliance_score`
- `tokenRate` or `token_rate`

### GET /api/supplychain/regions

```json
[
  {
    "name": "Trans-Atlantic Corridor",
    "zoneType": "Trade Corridor",
    "riskSignal": "Port congestion escalation risk",
    "modelConvergence": "95.2%",
    "carbonSignal": "Maritime route intensity elevated"
  }
]
```

### GET /api/supplychain/pipeline

Either array form:

```json
[
  "Round 418: 25,021 nodes submitted signed supply updates."
]
```

Or object form:

```json
{
  "events": [
    "Round 418: 25,021 nodes submitted signed supply updates."
  ]
}
```

### GET /api/supplychain/risk

Either array form:

```json
[
  "Disruption model flagged escalation in 4 major corridors."
]
```

Or object form:

```json
{
  "events": [
    "Disruption model flagged escalation in 4 major corridors."
  ]
}
```

### GET /api/supplychain/health

```json
{
  "services": [
    { "name": "orchestrator", "status": "up" },
    { "name": "prometheus", "status": "up" },
    { "name": "grafana", "status": "up" }
  ]
}
```

## Runtime Behavior

- If one or more endpoints respond, dashboard enters `Hybrid (Live + Simulation)` mode.
- If all endpoints fail, dashboard remains in `Supply Chain Simulation` mode.
- Endpoint status panel always shows live/fallback state for each endpoint.
