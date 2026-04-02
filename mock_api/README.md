# Mock API

Local mock service for dashboard live endpoint mode.

Run locally:

```bash
python3 mock_api/server.py
```

Health check:

```bash
curl -fsS http://localhost:8088/healthz
```

Endpoints:

- `/api/supplychain/stats`
- `/api/supplychain/regions`
- `/api/supplychain/pipeline`
- `/api/supplychain/risk`
- `/api/supplychain/health`
