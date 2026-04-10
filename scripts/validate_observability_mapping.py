#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MAPPING = ROOT / "contracts" / "observability_metric_mapping.json"
HEALTH = ROOT / "contracts" / "samples" / "health.json"
HEALTH_METRICS = ROOT / "contracts" / "samples" / "health.metrics.json"


def ensure(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def main() -> None:
    mapping_doc = load(MAPPING)
    metrics = mapping_doc.get("metrics")
    ensure(isinstance(metrics, list) and metrics, "metrics must be a non-empty array")

    required_dashboard_fields = {
        "nodesOnline",
        "flRound",
        "complianceScore",
        "tokenRate",
        "serviceLatencyMs",
        "serviceThroughputRps",
    }

    seen_fields = set()
    seen_prometheus = set()
    for idx, metric in enumerate(metrics):
        ensure(isinstance(metric, dict), f"metric row {idx} must be object")
        dashboard_field = metric.get("dashboard_field")
        ensure(isinstance(dashboard_field, str) and dashboard_field, f"metric row {idx} missing dashboard_field")
        ensure(dashboard_field not in seen_fields, f"duplicate dashboard_field: {dashboard_field}")
        seen_fields.add(dashboard_field)

        aliases = metric.get("aliases")
        ensure(isinstance(aliases, list) and aliases, f"metric {dashboard_field} aliases must be non-empty array")
        ensure(all(isinstance(alias, str) and alias for alias in aliases), f"metric {dashboard_field} aliases must be strings")

        prom = metric.get("prometheus_metric")
        ensure(isinstance(prom, str) and prom, f"metric {dashboard_field} missing prometheus_metric")
        ensure(prom not in seen_prometheus, f"duplicate prometheus_metric: {prom}")
        seen_prometheus.add(prom)

        ensure(metric.get("type") in {"gauge", "counter", "histogram", "summary"}, f"metric {dashboard_field} invalid type")
        ensure(isinstance(metric.get("unit"), str) and metric["unit"], f"metric {dashboard_field} missing unit")

    ensure(required_dashboard_fields.issubset(seen_fields), "mapping missing required dashboard fields")

    required_services = mapping_doc.get("required_services")
    ensure(isinstance(required_services, list) and required_services, "required_services must be non-empty array")

    health_doc = load(HEALTH)
    services = health_doc.get("services")
    ensure(isinstance(services, list), "health sample missing services[]")
    service_names = {service.get("name") for service in services if isinstance(service, dict)}

    for service_name in required_services:
        ensure(service_name in service_names, f"health sample missing required service: {service_name}")

    metrics_health_doc = load(HEALTH_METRICS)
    metrics_services = metrics_health_doc.get("services")
    ensure(isinstance(metrics_services, list) and metrics_services, "health.metrics sample missing services[]")
    for idx, service in enumerate(metrics_services):
        ensure(isinstance(service, dict), f"health.metrics service {idx} must be object")
        ensure(isinstance(service.get("name"), str) and service["name"], f"health.metrics service {idx} missing name")
        ensure(service.get("status") in {"up", "down", "degraded"}, f"health.metrics service {idx} invalid status")

        latency = service.get("latencyMs", service.get("latency_ms"))
        throughput = service.get("throughputRps", service.get("throughput_rps"))
        ensure(isinstance(latency, (int, float)), f"health.metrics service {service['name']} missing latency alias")
        ensure(
            isinstance(throughput, (int, float)),
            f"health.metrics service {service['name']} missing throughput alias",
        )
        ensure(latency >= 0, f"health.metrics service {service['name']} latency must be non-negative")
        ensure(throughput >= 0, f"health.metrics service {service['name']} throughput must be non-negative")

    print("observability metric mapping validation passed")


if __name__ == "__main__":
    main()
