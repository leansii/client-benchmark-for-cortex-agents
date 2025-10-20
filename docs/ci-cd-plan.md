# 9. CI/CD & Caching Plan

## 9.1 Decisions
1. CI platform: GitHub Actions (default) with option to port to AWS CodeBuild; pipelines stored under `.github/workflows` (to be added).
2. Stages: `setup` → `lint-typecheck` → `build-shared` → `build-react`/`build-vue` (parallel) → `smoke` → `bench` (nightly) → `reports`.
3. Setup uses corepack to enable pnpm; caches `/pnpm-store` keyed by OS + Node + lockfile hash.
4. Build caches: Vite/tsup caches stored using `actions/cache` keyed by package + lockfile + tsconfig hash.
5. Artifacts: upload lint/typecheck reports, build stats, Lighthouse HTML, bench CSV, Playwright traces, logs.
6. Deployment gating: staging deploy requires manual approval; prod deploy triggered after staging sign-off with release tagging.

### 9.1.1 Pipeline Outline
| Stage | Command | Notes |
| --- | --- | --- |
| setup | `corepack enable pnpm && pnpm install --frozen-lockfile` | Restore pnpm store cache first. |
| lint-typecheck | `pnpm lint` & `pnpm typecheck` | Should run workspace-wide. |
| build-shared | `pnpm --filter shared build` | Generates ESM + types. |
| build-react | `pnpm --filter react-app build` | Depends on shared artifacts. |
| build-vue | `pnpm --filter vue-app build` | Depends on shared artifacts. |
| smoke | `pnpm --filter bench bench:smoke` | Uses mock proxy; gating step. |
| bench | `pnpm --filter bench bench:ci` | Scheduled nightly, not per PR. |
| reports | `pnpm --filter bench bench:report` | Summaries uploaded to artifacts. |

### 9.1.2 Caching Strategy
- pnpm store: path `.pnpm-store`. key = `${runner.os}-pnpm-${hashFiles('pnpm-lock.yaml')}`.
- Build caches: separate caches per package referencing `node_modules/.vite` or `dist`. Invalidate on `tsconfig.*`, `vite.config.*`, `package.json` changes.
- Playwright: cache browser binaries via `npx playwright install-deps` step or GH Action.

## 9.2 Open Questions
- OQ9.1: Confirm final CI platform and secrets management approach.
- OQ9.2: Determine deployment automation scope (manual vs automatic triggers).
- OQ9.3: Need blue/green or canary deployments for proxy?

## 9.3 Next Steps
1. Draft GitHub Actions workflow YAML referencing stages above.
2. Document cache key naming and fallback behavior in `/docs`.
3. Define artifact retention policy and naming conventions.
