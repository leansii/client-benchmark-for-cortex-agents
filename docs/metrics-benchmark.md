# 8. Metrics & Benchmark Plan

## 8.1 Decisions
1. Bench package orchestrates automated runs capturing TFT (time to first token), TTFR (time to first render), Core Web Vitals (LCP, INP, CLS), bundle size, hydration cost, memory footprint.
2. Benchmark modes: `local` (developer laptop, reduced iterations), `ci` (standardized runner), `staging` (against staging proxy with live data), `prod-observe` (read-only metrics, no load tests).
3. Data storage: CSV canonical output per run, JSON for automation, Markdown summary for stakeholders; artifacts stored under `packages/bench/reports/{runId}`.
4. Mental complexity metrics: number of files touched for new tool, config files modified, lines of documentation updated, self-reported complexity survey.
5. Reporting cadence: CI baseline per PR (limited metrics), nightly full run comparing React vs Vue; weekly summary delivered in status update.

### 8.1.1 Metrics Table
| Metric | Source | Target | Notes |
| --- | --- | --- | --- |
| TFT (ms) | PerformanceObserver injection | ≤1500ms staging | Measures SSE start latency. |
| TTFR (ms) | Playwright trace | ≤2000ms staging | First meaningful render. |
| LCP (ms) | Lighthouse CI | ≤2500ms | Weighted per environment. |
| INP (ms) | Lighthouse CI | ≤200ms | Interaction responsiveness. |
| CLS | Lighthouse CI | ≤0.1 | Stability requirement. |
| Bundle size (KB) | Build stats | React ≤350, Vue ≤320 | Without compression. |
| Hydration cost (ms) | Bench script | ≤500ms | Observed via Performance API. |
| Memory (MB) | Chrome DevTools protocol | ≤250MB | After long session. |
| Mental complexity score | Manual survey + script | Track delta | Lower is better. |

### 8.1.2 Report Format
1. Table comparing metrics per client with delta columns.
2. Narrative summary highlighting wins/regressions.
3. Risk/issue callouts when thresholds breached.
4. Appendices: raw CSV links, Lighthouse HTML artifacts, Playwright traces.

## 8.2 Open Questions
- OQ8.1: Confirm CI runner specs (CPU throttling, memory) for reproducibility.
- OQ8.2: Determine how to incorporate network throttling (e.g., `Good 4G`).
- OQ8.3: Decide on mental complexity scoring rubric weights.

## 8.3 Next Steps
1. Define benchmark configuration schema and default values.
2. Prepare Playwright/Lighthouse integration plan in bench package README.
3. Align with stakeholders on reporting cadence and distribution list.
