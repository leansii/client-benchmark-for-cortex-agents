# Proxy API Contract Notes (Draft)

1. **Session Token Endpoint (`POST /api/v1/session/token`)**
   | Aspect | Detail |
   | --- | --- |
   | Headers | `Content-Type: application/json`, `X-Client-Version` |
   | Request | `{ "clientId": "string", "nonce": "uuid" }` |
   | Response | `{ "token": "jwt", "expiresInSec": 300 }` |
   | Status Codes | `200`, `400`, `401`, `429`, `5xx` |
   | Retry Policy | Client retries once on network failure; proxy returns `Retry-After` on throttling |
   Decisions:
   - JWT signed with `PROXY_JWT_SECRET`, 5-minute TTL.
   Open Questions:
   - Need audience/issuer claims list?
   Next Steps:
   - Define nonce validation strategy (store vs stateless?).

2. **Chat Endpoint (`POST /api/v1/chat`)**
   | Aspect | Detail |
   | --- | --- |
   | Auth | Bearer JWT (`Authorization: Bearer ...`) |
   | Request Schema | `chatRequestSchema` from shared package |
   | Response | `text/event-stream` emitting `streamEventSchema` events |
   | Timeouts | Initial connect 10s; heartbeat every 10s; proxy cancels after 120s inactivity |
   | Error Mapping | Validation → `400`, auth → `401/403`, throttling → `429`, upstream → `502/504` |
   Decisions:
   - SSE heartbeat event type TBD (likely `commentary`).
   Open Questions:
   - Should clients auto-reconnect on network drop?
   Next Steps:
   - Document SSE close codes and telemetry correlation IDs.

3. **Tool Execution (`POST /api/v1/tools/{toolName}`)**
   | Tool | Request Schema | Response Schema | Notes |
   | --- | --- | --- | --- |
   | `cortex_search` | `cortexSearchRequestSchema` | `cortexSearchResponseSchema` | Enforce topK ≤ 10 |
   | `cortex_analyst_text_to_sql` | `cortexAnalystRequestSchema` | `cortexAnalystResponseSchema` | Provide schema context hints |
   | `sql_exec` | `sqlExecRequestSchema` | `sqlExecResponseSchema` | Limit result set ≤ 500 rows |
   | `data_to_chart` | `dataToChartRequestSchema` | `dataToChartResponseSchema` | Chart spec <= 64 KB |
   Decisions:
   - Proxy logs tool requests minus sensitive args.
   Open Questions:
   - Include `traceId` header per tool call?
   Next Steps:
   - Define retry/timeout per tool (default 10s, no retry).

4. **History (`GET /api/v1/history/{sessionId}`)**
   | Aspect | Detail |
   | --- | --- |
   | Auth | Bearer JWT |
   | Query | `limit` (default 20), `cursor` |
   | Response | `historyResponseSchema` |
   | Cache | 60s in-memory per session |
   Decisions:
   - History read-only; writes only via chat pipeline.
   Open Questions:
   - Need pagination tokens to expire?
   Next Steps:
   - Specify storage backend once proxy implemented.

5. **Metrics Upload (`POST /api/v1/metrics/report`)**
   | Aspect | Detail |
   | --- | --- |
   | Auth | Bearer JWT with `bench` scope |
   | Request | `{ "client": "react|vue", "runId": "uuid", "metrics": {...} }` |
   | Response | `204 No Content` |
   | Limits | Payload ≤ 256 KB |
   Decisions:
   - Metrics validated against telemetry schema.
   Open Questions:
   - Need dedupe by `runId`?
   Next Steps:
   - Define retention and storage location (S3 vs Snowflake).

6. **Testing Hooks**
   - Contract tests will import shared zod schemas (`packages/shared/src/schemas/*`) to validate requests/responses.
   - MSW handlers emulate proxy responses for client unit and integration tests.
   - Bench harness records SSE sequences to ensure schema compliance.
   Next Steps:
   - Draft MSW handler signatures referencing schema definitions.
