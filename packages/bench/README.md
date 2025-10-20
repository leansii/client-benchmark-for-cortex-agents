## Bench Package (`packages/bench`)

### 1. Overview
| Item | Detail |
| --- | --- |
| Purpose | Provide benchmark harness for comparing Vue vs React clients and validating proxy performance. |
| Primary Deliverables | Automated runs capturing TFT, TTFR, Core Web Vitals, bundle stats, memory usage, mental complexity metrics. |
| Consumers | CI pipeline (nightly + release), local engineers for perf checks, product stakeholders for reports. |
| Outputs | CSV/JSON metrics, Markdown summary, Lighthouse HTML, logs. |

### 2. Planned Structure
1. `src/config/` – run profiles, environment presets.
2. `src/runner.ts` – orchestrator for launching clients + proxy mocks.
3. `src/drivers/` – Playwright/Puppeteer adapters, Lighthouse integration.
4. `src/metrics/` – calculators for TFT, TTFR, CWV, bundle diff, memory sampling.
5. `src/reporters/` – CSV, JSON, Markdown emitters, dashboard hooks.
6. `src/fixtures/` – synthetic Cortex responses, long-stream payloads.
7. `src/tools/` – helpers for mental complexity scoring, file diff counters.

### 3. Scripts (planned)
- `pnpm bench:ci` → Standard benchmark suite for CI runners.
- `pnpm bench:local` → Developer-friendly run with reduced load.
- `pnpm bench:lighthouse` → Lighthouse CI aggregator.
- `pnpm bench:report` → Generate table + narrative summary for latest run.
- `pnpm bench:compare` → Diff metrics between two run IDs.

### 4. Data & Storage Plan
| Aspect | Approach |
| --- | --- |
| Fixtures | Stored in repo (synthetic), versioned with schema checks. |
| Run Artifacts | Written to `packages/bench/reports/{runId}/` and uploaded as CI artifacts. |
| Metrics Schema | Defined in shared package to ensure type safety. |
| Retention | CI artifacts kept 30 days; manual archiving for key milestones. |

Checklist:
- [ ] Define standard run configuration (browser, CPU throttling, network). |
- [ ] Document naming convention for `runId` (ISO timestamp + hash). |
- [ ] Provide instructions for staging vs prod benchmark modes.

### 5. Measurement Protocols
1. Spin up proxy mock or staging proxy depending on mode.
2. Launch clients via Playwright, capture navigation + SSE timings.
3. Record TFT/TTFR using PerformanceObserver injection.
4. Trigger Lighthouse CI for both clients sequentially.
5. Collect bundle stats from build outputs (via shared manifest).
6. Compute mental complexity metrics (files touched, config delta).

### 6. Decisions
- Playwright + Lighthouse CI as primary tooling.
- CSV as canonical export, JSON secondary for automation.
- Bench package owns synthetic data + MSW handlers for deterministic runs.
- Mental complexity measured via static analysis of repo diffs.

### 7. Open Questions
- Need cross-browser benchmarks beyond Chromium?
- Should metrics upload to external dashboard (e.g., Looker)?
- Requirements for secure storage of benchmark artifacts?

### 8. Next Steps
1. Draft benchmark configuration schema referencing shared types.
2. Outline Playwright test plan focusing on smoke + perf flows.
3. Define report template (table + short insights) for M7 deliverable.
