## React Client (`apps/react-app`)

### 1. Overview
| Item | Detail |
| --- | --- |
| Purpose | Deliver Cortex Agent chat experience with React 18 + Vite, matching Vue client feature-for-feature. |
| Primary Deliverables | Chat UI with streaming, sources panel, tools surface, accessibility coverage, perf instrumentation. |
| Upstream Dependencies | Shared package (`packages/shared`), proxy API (`/api/v1/*`), design tokens. |
| Outputs | Production build (`dist/`), bundle/stat reports, accessibility audit logs. |

### 2. Planned Structure
1. `src/main.tsx` – bootstrap, env wiring.
2. `src/app/providers/` – query client, telemetry, feature flags.
3. `src/modules/chat/` – composer, message list (virtualized), stream handler.
4. `src/modules/sources/` – citations + provenance block.
5. `src/modules/data/` – table/chart renderer with lazy imports.
6. `src/api/` – proxy client, SSE utilities, retry logic.
7. `src/test/` – MSW handlers, fixtures, contract assertions.

### 3. Scripts (to be implemented)
- `pnpm dev` → Vite dev server at `http://localhost:5173`.
- `pnpm build` → Production bundle with bundle analyzer report.
- `pnpm preview` → Serve built assets for smoke checks.
- `pnpm lint` → ESLint + React hooks rules.
- `pnpm test` → Vitest + testing-library with MSW.
- `pnpm test:a11y` → Axe playwright sweep across core screens.

### 4. Configuration Inputs
| Variable | Scope | Source | Notes |
| --- | --- | --- | --- |
| `VITE_PROXY_BASE_URL` | dev/build | `.env.local` | Points to proxy; never committed. |
| `VITE_CLIENT_ID` | dev/build | `.env.local` | Issued per environment. |
| `VITE_APP_VERSION` | build | package version | Embedded for telemetry. |
| `VITE_FEATURE_FLAGS` | build | env | JSON string toggles. |

Checklist:
- [ ] Provide `.env.template` with placeholders only.
- [ ] Document environment switch guidance in `/docs`.
- [ ] Wire telemetry (web-vitals) to bench package.

### 5. Testing & QA Expectations
1. Storybook visual regression per module.
2. Playwright smoke covering chat happy path, error overlays, tool invocation.
3. Contract harness to validate SSE handling against proxy mocks.
4. Accessibility audit (axe + keyboard traversal script).
5. Perf budget enforced via Lighthouse CI thresholds (LCP/INP/CLS).

### 6. UX Parity & Perf Notes
- Enforce shared design tokens (`shared/ui/tokens`).
- Virtualized message list (React Window/Virtual) with stream append stability.
- 200 ms debounce on composer, slash-command palette parity.
- Loading states mirror Vue timing (skeleton → spinner → content).
- Provide `aria-live="polite"` for stream updates, focus guard on modal open.

### 7. Decisions
- React 18 + Vite + SWC toolchain.
- TanStack Query for proxy interactions + retries.
- CSS strategy: CSS Modules with PostCSS preset env + shared tokens.
- SSE client built on native EventSource with abort controller.

### 8. Open Questions
- Preferred chart lib wrapper (Recharts vs shared Vega-Lite binding)?
- Need offline fallback when proxy unreachable?
- Branding assets availability for header/footer?

### 9. Next Steps
1. Draft component architecture doc referencing planned directories.
2. Align with design team on shared tokens + Storybook stories.
3. Produce initial Vitest + testing-library setup referencing shared fixtures.
