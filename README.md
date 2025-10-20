# Cortex Agent Client Benchmark

This repository houses planning artifacts for benchmarking React and Vue Cortex Agent clients behind a shared server-side proxy. Implementation work is intentionally staged behind thorough documentation, specs, and checklists.

## Getting Started
1. Install pnpm via corepack (`corepack enable pnpm`).
2. Run `pnpm install` to populate the workspace (no builds yet).
3. Review documentation under [`docs/`](docs/README.md) for architecture, testing, security, and roadmap guidance.
4. Copy `.env.example` to `.env.local` and replace placeholders when secrets become available.

## Repository Structure
- `apps/react-app` — React client specification and future implementation notes.
- `apps/vue-app` — Vue client specification mirroring React feature set.
- `packages/shared` — Shared types, schemas, design tokens, utilities.
- `packages/bench` — Benchmark harness plans and measurement definitions.
- `docs/` — Project charter, environment matrix, API contracts, UX parity spec, security/compliance notes, testing strategy, metrics plan, CI/CD plan, risk register, roadmap.

## Scripts
Root-level scripts are placeholders until tooling is configured:
- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test`

Each workspace package includes README guidance outlining upcoming scripts and responsibilities.

## Contributing
- Follow conventional commits (`type(scope): summary`).
- Update relevant docs when making architecture or contract changes.
- Ensure parity checklist items remain synchronized across React and Vue clients.

## Status
Implementation has not begun; current focus is documenting scope, risks, and acceptance criteria so development can proceed safely once secrets and environments are ready.
