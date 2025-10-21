# Backend Integration Progress

## Proxy Service
- [ ] Define proxy tech stack (runtime, framework, deployment model)
- [ ] Implement `/api/v1/session/token` with JWT issuance (5 min TTL)
- [ ] Implement `/api/v1/chat` SSE streaming via Snowflake Cortex Agent
- [ ] Implement `/api/v1/tools/{toolName}` dispatch for search, analyst, sql, chart tools
- [ ] Implement `/api/v1/history/{sessionId}` persistence (in-memory/cache for now)
- [ ] Implement `/api/v1/metrics/report` ingestion endpoint
- [ ] Add structured logging (traceId/sessionId) with redaction and log hygiene
- [ ] Configure rate limiting + backoff controls per endpoint
- [ ] Add healthcheck/status endpoint
- [ ] Write OpenAPI spec and sync with shared package

## Environment & Secrets
- [x] Provision Snowflake DB (`CORTEX_BENCH_DB`) and warehouse (`CORTEX_BENCH_WH`)
- [x] Create `DEVELOPER_CORTEX` role and `CORTEX_PROXY_USER`
- [x] Upload RSA public key; store private key in secret manager
- [ ] Store `SNOWFLAKE_ACCOUNT/HOST/USER/ROLE/WAREHOUSE` secrets per environment
- [ ] Define proxy runtime secrets (`PROXY_JWT_SECRET`, telemetry endpoints)
- [ ] Establish network policy allowlisting proxy IPs in Snowflake

## Contracts & Schemas
- [x] Scaffold shared TypeScript/Zod schemas for chat, tools, telemetry
- [x] Draft OpenAPI outline (`packages/shared/docs/openapi-outline.yaml`)
- [ ] Finalize Snowflake Cortex tool payload specifics (pending confirmation)
- [ ] Generate OpenAPI from schemas and publish to repo

## Testing & Tooling
- [ ] Set up contract tests between proxy and shared schemas
- [ ] Create MSW/Playwright proxy mocks for clients
- [ ] Establish staging smoke tests hitting live proxy endpoints
- [ ] Build logging/metrics dashboards for rate limits and errors

## Deployment & Ops
- [ ] Define CI/CD pipeline for proxy (build, deploy, smoke)
- [ ] Configure observability (traces/logs/metrics) for proxy service
- [ ] Document incident response + rollback plans
- [ ] Align with security/compliance on monitoring thresholds

## Coordination
- [ ] Confirm Cortex tool availability and endpoint details with Snowflake team
- [ ] Align on benchmark data fixtures and anonymization strategy
- [ ] Schedule contract review between frontend and backend teams
