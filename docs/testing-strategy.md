# 7. Testing Strategy

## 7.1 Decisions
1. Testing pyramid: unit (shared schemas/utilities), integration (proxy contract mocks), E2E (Playwright) for smoke and streaming endurance.
2. Contract testing via schema validation using shared zod definitions + Pact-style assertions against proxy mocks.
3. Error-path coverage: simulate 401/403/429/5xx with MSW; clients verify UI responses, telemetry, and retry/backoff logic.
4. Streaming endurance test: 5-minute SSE session with cancellation/resume scenarios run nightly.
5. Data scenario coverage: fixtures for `cortex_search`, `cortex_analyst_text_to_sql`, `sql_exec`, `data_to_chart` stored in shared package.
6. Mock vs live policy: dev/CI rely on mocks; staging nightly run hits live Snowflake with sanitized dataset; prod synthetic monitors use mock tool.

### 7.1.1 Test Matrix
| Test Type | Scope | Env | Tooling | Notes |
| --- | --- | --- | --- | --- |
| Unit | shared schemas, utilities | dev/CI | Vitest | Ensure strict type coverage. |
| Integration | proxy adapters, SSE utilities | dev/CI | Vitest + MSW | Validate contract compliance. |
| Contract | proxy endpoints | CI | Prism/Pact | Verify request/response schema. |
| E2E Smoke | chat happy path, tools toggle | CI/Staging | Playwright | Run on every PR (mocks) + nightly staging (live). |
| Streaming endurance | long-running SSE | Nightly | Playwright + timers | 5 min stream, cancellation, reconnection. |
| Accessibility | key flows (chat, citations) | Weekly | Playwright + axe | Track regressions. |
| Performance | Lighthouse, custom metrics | Scheduled | Bench package | Compare React vs Vue. |

## 7.2 Open Questions
- OQ7.1: Finalize Playwright vs Cypress preference for UI E2E.
- OQ7.2: Determine contract test tooling (Pact vs OpenAPI validator).
- OQ7.3: Confirm staging Snowflake dataset availability for live tests.

## 7.3 Next Steps
1. Author testing playbook referencing responsibilities per team (proxy vs clients).
2. Define fixture format and storage location in `packages/shared`.
3. Create CI pipeline spec mapping tests to stages and required secrets.
