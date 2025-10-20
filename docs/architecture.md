# Architecture Overview

1. **System Context**
   | Component | Responsibility | Interfaces |
   | --- | --- | --- |
   | React Client (`apps/react-app`) | Browser UI, SSE consumption, telemetry | HTTP(S) to proxy (`/api/v1/*`), web-vitals exporter |
   | Vue Client (`apps/vue-app`) | Browser UI parity with React | Same as React |
   | Server Proxy (external) | Auth, request shaping, Cortex Agent communication | HTTPS to Snowflake Cortex Agent, JWT issuance |
   | Snowflake Cortex Agent | AI service for chat + tools | Managed API (allowlist `*.snowflakecomputing.com`) |
   | Bench Harness (`packages/bench`) | Perf testing, reporting | Launches clients, consumes logs + metrics |
   Decisions:
   - Clients remain static SPAs served via CDN; no SSR.
   - Proxy terminates TLS and enforces authentication & rate limits.
   Open Questions:
   - Need dedicated telemetry backend (OTLP vs custom)?
   Next Steps:
   - Validate proxy deployment topology with infra.

2. **Request Flow (Chat Interaction)**
   1. Client requests `/api/v1/session/token` with clientId + nonce.
   2. Proxy validates, issues JWT (300s TTL).
   3. Client posts `/api/v1/chat` with message history + tool consents.
   4. Proxy forwards to Cortex Agent, streams SSE tokens back.
   5. Client renders streaming message, updates sources/data blocks.
   6. Bench harness captures timings + logs for metrics.
   Decisions:
   - SSE chosen for streaming; fallback to polling not required initially.
   - Clients store minimal session state (sessionId, messages) in memory.
   Open Questions:
   - Should messages persist to local storage for crash recovery?
   Next Steps:
   - Define SSE heartbeat & reconnect policy in shared schemas.

3. **Tool Invocation Flow**
   | Step | Description |
   | --- | --- |
   | 1 | Assistant triggers tool call, client displays pending state. |
   | 2 | Client POST `/api/v1/tools/{toolName}` with payload from shared schema. |
   | 3 | Proxy validates allowlist, forwards to Cortex or internal executor. |
   | 4 | Proxy responds with tool result; assistant message updated. |
   Decisions:
   - Tools executed sequentially per session to simplify state.
   - Proxy ensures SSRF-safe allowlist for URLs (search, SQL endpoints).
   Open Questions:
   - Do we require tool execution audit logs separate from chat logs?
   Next Steps:
   - Document tool-specific throttling + fallback behaviors.

4. **Environment Deployment View**
   | Env | Hosting | Notes |
   | --- | --- | --- |
   | Dev | Local Node proxy + Vite dev servers | Snowflake calls stubbed by MSW unless staging.
   | Staging | AWS ECS/Fargate or Lambda for proxy, S3 + CloudFront for clients | Canary for tool rollouts, live Cortex allowed. |
   | Prod | Same as staging with higher scale, WAF + logging | Secrets from AWS Secrets Manager via IAM roles. |
   Decisions:
   - Use infrastructure-as-code (TBD) for proxy environment (not in repo).
   - CDN handles client caching, invalidation via CI.
   Open Questions:
   - Need dedicated staging Snowflake account or shared with prod? |
   Next Steps:
   - Create infra diagram once provider decisions locked.

5. **Data Flow & Storage**
   | Data | Producer | Consumer | Storage |
   | --- | --- | --- | --- |
   | Message history | Clients | Proxy | In-memory cache (short-lived) |
   | Tool outputs | Proxy | Clients | Transient in response only |
   | Metrics | Bench harness | Stakeholders | CSV/JSON artifacts, optional dashboard |
   | Logs | Proxy, clients | Observability stack | Centralized logging (structured) |
   Decisions:
   - No long-term storage of chat content in clients; rely on proxy.
   - Metrics stored as artifacts rather than DB initially.
   Open Questions:
   - Need retention policy for logs beyond 90 days?
   Next Steps:
   - Draft data classification doc (PII handling) if required.

6. **Security Controls Summary**
   | Control | Placement | Notes |
   | --- | --- | --- |
   | JWT auth | Proxy ⇄ Clients | 5 min TTL, rotation quarterly |
   | Rate limiting | Proxy | Token bucket per session + IP |
   | Secrets management | Proxy env | AWS Secrets Manager, no local secrets |
   | CORS | Proxy | Explicit origin list per env |
   | Content validation | Shared schemas | zod runtime validation |
   Decisions:
   - Adopt shared schema validation both client-side and server-side.
   Open Questions:
   - Additional headers (CSP, Permissions-Policy) required from proxy?
   Next Steps:
   - Document exact header set + sample responses.

7. **Observability**
   | Signal | Source | Destination |
   | --- | --- | --- |
   | Traces | Proxy | OTLP collector (optional) |
   | Metrics | Bench harness, clients | CSV + telemetry endpoint |
   | Logs | Proxy, clients | Structured logs aggregated in CloudWatch/ELK |
   Decisions:
   - Clients send web-vitals to bench harness endpoint in dev/staging.
   Open Questions:
   - Need synthetic monitoring outside bench runs?
   Next Steps:
   - Define telemetry payload schema in shared package.

8. **Dependencies & Integrations**
   | Area | Planned Choice |
   | --- | --- |
   | Build tooling | Vite (React/Vue), tsup for shared package |
   | State/Data | TanStack Query, Pinia (Vue) |
   | Testing | Vitest, Playwright, MSW |
   | Benchmarking | Lighthouse CI, custom harness |
   Decisions:
   - Align dependencies across clients for parity (same major versions when possible).
   Open Questions:
   - Need analytics integration (Amplitude, etc.)? |
   Next Steps:
   - Create dependency matrix once choices confirmed.

9. **Appendix**
   - All hostnames in this doc are placeholders.
   - No production secrets stored or referenced.
   - Architecture subject to revision post security review.
   Decisions:
   - Version architecture doc alongside milestones.
   Open Questions:
   - Should we add sequence diagrams (PlantUML) once approved?
   Next Steps:
   - Capture diagrams in `docs/diagrams/` (future) when tooling agreed.
