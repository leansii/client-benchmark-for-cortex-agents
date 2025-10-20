## Vue Client (`apps/vue-app`)

### 1. Overview
| Item | Detail |
| --- | --- |
| Purpose | Mirror React client capabilities using Vue 3 + Vite while sharing schemas/types. |
| Primary Deliverables | Chat UX with streaming parity, shared components, accessibility/perf instrumentation. |
| Upstream Dependencies | Shared package (`packages/shared`), proxy API contracts, design tokens. |
| Outputs | `dist/` bundle, bundle/stat reports, accessibility logs. |

### 2. Planned Structure
1. `src/main.ts` – createApp bootstrapping, env injection.
2. `src/plugins/` – Pinia store, TanStack Query Vue adapter, telemetry.
3. `src/modules/chat/` – composer, virtualized messages, stream consumption.
4. `src/modules/sources/` – citations block using shared token spec.
5. `src/modules/data/` – table/chart mount with async component loading.
6. `src/api/` – proxy client, SSE helper composables, retry utilities.
7. `src/test/` – Vitest + testing-library/vue, MSW fixtures.

### 3. Scripts (to be implemented)
- `pnpm dev` → Vite dev server `http://localhost:4173`.
- `pnpm build` → Production bundle + analyzer output.
- `pnpm preview` → Serve built assets for smoke validation.
- `pnpm lint` → ESLint + Vue plugin + accessibility checks.
- `pnpm test` → Vitest suite with component + composable coverage.
- `pnpm test:a11y` → Axe playwright runs across core flows.

### 4. Configuration Inputs
| Variable | Scope | Source | Notes |
| --- | --- | --- | --- |
| `VITE_PROXY_BASE_URL` | dev/build | `.env.local` | Proxy host; required. |
| `VITE_CLIENT_ID` | dev/build | `.env.local` | Matches React client ID scheme. |
| `VITE_APP_VERSION` | build | package version | For telemetry + logs. |
| `VITE_FEATURE_FLAGS` | build | env | Shared JSON toggles. |

Checklist:
- [ ] Provide `.env.template` aligned with React client.
- [ ] Document shared component import patterns.
- [ ] Hook web-vitals polyfill for INP metrics.

### 5. Testing & QA Expectations
1. Storybook (Vue) parity with React components, visual regression output.
2. Playwright smoke: chat flow, error states, tool invocations.
3. Contract tests to ensure SSE + tool responses respect shared schemas.
4. Accessibility audit with axe + keyboard traversal script.
5. Perf threshold gating via Lighthouse CI (LCP/INP/CLS).

### 6. UX Parity & Perf Notes
- Reuse shared design tokens and CSS variables.
- Use virtualization (Vue Virtual Scroll List or custom) for message stream.
- 200 ms composer debounce and identical slash-command UX.
- Match React loading skeleton timing + transitions.
- Provide `aria-live="polite"` via `v-bind` for stream updates.

### 7. Decisions
- Vue 3 composition API + `<script setup>` style.
- Pinia for state, TanStack Query Vue for data fetching.
- CSS Modules via Vite + PostCSS align with React build.
- EventSource wrapper exposed as composable for stream control.

### 8. Open Questions
- Preferred charting abstraction (ECharts vs Vega-Lite) + tree shaking concerns?
- Need SSR support for future deployments?
- Localization requirements beyond English?

### 9. Next Steps
1. Draft component architecture doc aligning with React parity spec.
2. Define testing-library/vue utilities in shared package to avoid duplication.
3. Prepare Storybook config reusing shared tokens + accessibility addons.
