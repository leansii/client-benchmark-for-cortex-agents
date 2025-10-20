# 2. Repository & Package Blueprint

## 2.1 Decisions
1. Monorepo managed with pnpm workspaces: `apps/react-app`, `apps/vue-app`, `packages/shared`, `packages/bench`.
2. Shared tooling: ESLint, Prettier, TypeScript project references, Vitest, Playwright.
3. Introduce `/docs` directory for living documentation and `/scripts` for helper CLIs (to be added).
4. Adopt conventional commits + changesets for version tracking across packages.
5. Build artifacts per package:
   - React/Vue: `dist/` + stats reports.
   - Shared: ESM bundle + `.d.ts`.
   - Bench: CLI bundle `bin/bench.mjs` and CSV outputs.

## 2.2 Open Questions
- OQ2.1: Decide on SSR vs SPA builds (Next/Nuxt) for apples-to-apples comparison.
- OQ2.2: Confirm whether infrastructure specs should live in separate repo.
- OQ2.3: Determine Storybook hosting strategy (per app vs shared instance).

## 2.3 Next Steps
1. Prepare pnpm workspace configuration doc describing dependency flows.
2. Draft changeset policy and release flow guidelines.
3. Add README stubs for `/packages/bench` and `/docs` (React/Vue already covered).
