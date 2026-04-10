#!/usr/bin/env python3
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POLICY_DIR = ROOT / "flower_security_wrapper"
VECTORS_PATH = POLICY_DIR / "test_vectors.supplychain.json"


def ensure(condition: bool, message: str) -> None:
    if not condition:
        raise SystemExit(message)


def load_json(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def validate_policy_schema(path: Path, policy: dict) -> None:
    ensure(isinstance(policy, dict), f"{path.name}: policy must be object")
    ensure(isinstance(policy.get("version"), str) and policy["version"], f"{path.name}: missing version")
    ensure(
        isinstance(policy.get("policy_name"), str) and policy["policy_name"],
        f"{path.name}: missing policy_name",
    )
    ensure(policy.get("default_action") in {"allow", "deny"}, f"{path.name}: invalid default_action")

    rules = policy.get("rules")
    ensure(isinstance(rules, list) and len(rules) > 0, f"{path.name}: rules must be non-empty array")
    seen = set()
    for idx, rule in enumerate(rules):
        ensure(isinstance(rule, dict), f"{path.name}: rule {idx} must be object")
        rule_id = rule.get("id")
        ensure(isinstance(rule_id, str) and rule_id, f"{path.name}: rule {idx} missing id")
        ensure(rule_id not in seen, f"{path.name}: duplicate rule id: {rule_id}")
        seen.add(rule_id)

        cond = rule.get("if")
        ensure(isinstance(cond, dict) and len(cond) > 0, f"{path.name}: rule {rule_id} missing if")
        ensure(rule.get("action") in {"allow", "deny"}, f"{path.name}: rule {rule_id} invalid action")
        ensure(isinstance(rule.get("reason"), str) and rule["reason"], f"{path.name}: rule {rule_id} missing reason")


def evaluate_policy(policy: dict, context: dict) -> str:
    for rule in policy["rules"]:
        if all(context.get(key) == expected for key, expected in rule["if"].items()):
            return rule["action"]
    return policy["default_action"]


def validate_acceptance_vectors(policies: dict[str, dict]) -> None:
    vectors_doc = load_json(VECTORS_PATH)
    vectors = vectors_doc.get("vectors")
    ensure(isinstance(vectors, list) and vectors, "test vectors must be non-empty")

    for idx, vector in enumerate(vectors):
        ensure(isinstance(vector, dict), f"vector {idx} must be object")
        vector_id = vector.get("id")
        ensure(isinstance(vector_id, str) and vector_id, f"vector {idx} missing id")

        policy_name = vector.get("policy")
        ensure(policy_name in policies, f"vector {vector_id} references unknown policy: {policy_name}")
        ctx = vector.get("input")
        ensure(isinstance(ctx, dict), f"vector {vector_id} input must be object")
        expected = vector.get("expected_action")
        ensure(expected in {"allow", "deny"}, f"vector {vector_id} expected_action must be allow|deny")

        actual = evaluate_policy(policies[policy_name], ctx)
        ensure(
            actual == expected,
            f"vector {vector_id} action mismatch: expected {expected}, got {actual}",
        )


def main() -> None:
    policy_paths = sorted(POLICY_DIR.glob("policy.supplychain*.json"))
    ensure(policy_paths, "no policy.supplychain*.json files found")

    policies: dict[str, dict] = {}
    for path in policy_paths:
        policy = load_json(path)
        validate_policy_schema(path, policy)
        policies[path.name] = policy

    validate_acceptance_vectors(policies)
    print("policy pack validation passed")


if __name__ == "__main__":
    main()
