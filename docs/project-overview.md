# 1. Project Overview

## 1.1 Decisions
1. Goal: deliver benchmarkable React and Vue Cortex Agent clients behind a common proxy with feature and UX parity.
2. Success criteria: shared functionality, measurable performance metrics (TTFB/TFT, Core Web Vitals), secured secret handling, reproducible benchmark reports.
3. Responsibility split:
   - Proxy: authentication, session orchestration, tooling calls, logging, rate limits.
   - Clients: UX parity, rendering of chat/messages/data visualizations, telemetry emission, offline UX.
4. Languages/frameworks: TypeScript + Vite stacks for both clients, pnpm monorepo.
5. Documentation cadence: update each section weekly with Decisions/Open Questions/Next Steps status.

## 1.2 Open Questions
- OQ1: Confirm minimum browser support matrix (Chromium, Firefox ESR, Safari versions).
- OQ2: Determine localization scope (English only vs multi-language support).
- OQ3: Validate acceptable streaming latency SLA across environments.

## 1.3 Next Steps
1. Circulate charter to stakeholders for approval.
2. Collect SLA targets from platform team to baseline benchmarks.
3. Schedule alignment with design, security, and data governance groups to confirm responsibilities.
