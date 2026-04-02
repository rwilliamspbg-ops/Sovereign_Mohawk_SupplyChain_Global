# Action Pinning Policy

Policy objective: avoid invalid action refs while preserving supply-chain safety.

## Standard

- Use pinned SHAs for core `actions/*` primitives where stable SHA maintenance is available.
- Use maintained major tags for fast-moving security actions that frequently rotate SHAs (for example CodeQL and Gitleaks).
- Dependabot must manage GitHub Actions update proposals weekly.

## Current Baseline

- CI, deploy, and setup actions are pinned to stable SHAs.
- CodeQL and Gitleaks use major tags for compatibility and continuity.

## Review Rule

Any workflow action reference change requires:

- CI run green
- Security scan green
- Dependabot compatibility confirmation
