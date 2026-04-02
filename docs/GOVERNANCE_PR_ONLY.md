# PR-Only Governance Policy

All future changes must be merged through pull requests from feature branches.

## Required Workflow

1. Create a feature branch from `main`.
2. Open a pull request with validation evidence.
3. Require all status checks to pass.
4. Require CODEOWNERS review before merge.
5. Merge using protected branch rules only.

## Enforcement

- `main` branch protection requires status checks and review.
- Admin bypass is disallowed for normal engineering changes.
- Emergency bypass must include post-incident retrospective evidence.
