#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SAMPLES = ROOT / "contracts" / "samples"


def load(name: str):
    return json.loads((SAMPLES / name).read_text(encoding="utf-8"))


def ensure(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def validate_stats(payload):
    ensure(isinstance(payload, dict), "stats payload must be an object")
    aliases = {
        "nodes": ["nodesOnline", "nodes_online"],
        "round": ["flRound", "fl_round"],
        "compliance": ["complianceScore", "compliance_score"],
        "token": ["tokenRate", "token_rate"],
    }
    for label, keys in aliases.items():
        ensure(any(key in payload for key in keys), f"stats missing {label} key alias")


def validate_regions(payload):
    ensure(isinstance(payload, list) and len(payload) > 0, "regions must be non-empty array")
    required = ["name", "zoneType", "riskSignal", "modelConvergence", "carbonSignal"]
    for idx, row in enumerate(payload):
        ensure(isinstance(row, dict), f"region row {idx} must be object")
        for field in required:
            ensure(field in row, f"region row {idx} missing field: {field}")


def validate_event_payload(payload, label: str):
    if isinstance(payload, list):
        ensure(all(isinstance(item, str) for item in payload), f"{label} array items must be strings")
        return
    ensure(isinstance(payload, dict), f"{label} must be array or object")
    ensure("events" in payload and isinstance(payload["events"], list), f"{label} object needs events[]")


def validate_health(payload):
    ensure(isinstance(payload, dict), "health payload must be object")
    ensure("services" in payload and isinstance(payload["services"], list), "health must include services[]")
    for idx, service in enumerate(payload["services"]):
        ensure(isinstance(service, dict), f"health service {idx} must be object")
        ensure("name" in service and "status" in service, f"health service {idx} missing name/status")


def main() -> None:
    validate_stats(load("stats.json"))
    validate_regions(load("regions.json"))
    validate_event_payload(load("pipeline.json"), "pipeline")
    validate_event_payload(load("risk.json"), "risk")
    validate_health(load("health.json"))
    print("dashboard contract validation passed")


if __name__ == "__main__":
    main()
