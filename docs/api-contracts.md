# 4. API Contracts

## 4.1 Decisions
1. Proxy base path `/api/v1` with REST + SSE endpoints.
2. Authentication via `Authorization: Bearer <jwt>`; tokens expire in ≤5 minutes; clients refresh via `/session/token`.
3. Streaming implemented with Server-Sent Events (SSE); WebSockets deferred unless latency demands.
4. Requests limited to 64 KB; SSE chunk size ≤8 KB; server closes stream after 5 minutes inactivity.
5. Retries: proxy retries idempotent Cortex requests up to 2 times with exponential backoff (500 ms, 1s).

### 4.1.1 Client ↔ Proxy Endpoints
| Endpoint | Method | Request | Response | Notes |
| --- | --- | --- | --- | --- |
| `/api/v1/session/token` | POST | `{ clientId }` | `{ token, expiresIn }` | Clients call on load; 401 if clientId invalid. |
| `/api/v1/chat` | POST (SSE) | `{ sessionId, messages[], tools[], metadata }` | SSE stream of `ChatStreamChunk` | `Content-Type: text/event-stream`. |
| `/api/v1/tools/execute` | POST | `{ sessionId, tool, params }` | `{ status, result? }` | Supports synchronous tool calls. |
| `/api/v1/tools/result/{toolCallId}` | GET | `n/a` | `{ status, result }` | Poll fallback if SSE fails. |
| `/api/v1/history/{sessionId}` | GET | `n/a` | `{ messages[] }` | Optional for session resume. |
| `/api/v1/metrics/report` | GET | `?from&to` | `{ runs[] }` | Exposed to bench package for historical data. |

### 4.1.2 Proxy ↔ Cortex Endpoints
| Endpoint | Method | Request | Response | Notes |
| --- | --- | --- | --- | --- |
| `/v1/cortex/chat/completions` | POST | `{ messages, tools, session }` | Streamed chat completions | Mirror Snowflake API. |
| `/v1/cortex/tools/{tool}` | POST | Tool-specific payload | Tool-specific response | Tools: `cortex_search`, `cortex_analyst_text_to_sql`, `sql_exec`, `data_to_chart`. |

### 4.1.3 Data Models
- `ChatMessage`: `{ id, role: 'user'|'assistant'|'system'|'tool', content, citations?, createdAt }`.
- `ChatStreamChunk`: `{ type: 'message'|'tool_call'|'tool_result'|'error', data, messageId }`.
- `ToolCall`: `{ id, name, arguments }`.
- `ToolResult`: `{ id, toolCallId, status: 'success'|'error', payload }`.
- `ErrorResponse`: `{ code, message, retryAfter?, traceId }`.

### 4.1.4 Headers & Metadata
- Required request headers: `Authorization`, `X-Request-ID`, `X-Client-Version`, `Content-Type: application/json`.
- Response headers: `X-Request-ID`, `Cache-Control: no-store`, `Retry-After` (on 429), `Content-Type` appropriate to payload.
- Streaming: `X-Accel-Buffering: no`, `Connection: keep-alive`, `Transfer-Encoding: chunked`.

### 4.1.5 Error Codes
| HTTP | Code | Meaning | Client Action |
| --- | --- | --- | --- |
| 400 | `BAD_REQUEST` | Validation failed. | Surface error; prompt user to edit. |
| 401 | `UNAUTHORIZED` | Token invalid/expired. | Refresh token → retry once. |
| 403 | `FORBIDDEN` | Client not allowed to tool. | Display feature disabled message. |
| 404 | `NOT_FOUND` | Session or tool missing. | Offer to start new session. |
| 429 | `RATE_LIMITED` | Limits exceeded. | Backoff using `Retry-After`. |
| 500 | `PROXY_ERROR` | Internal server error. | Show generic error with retry. |
| 503 | `CORTEX_UNAVAILABLE` | Upstream downtime. | Retry with exponential backoff, escalate if persists. |

### 4.1.6 Tool Payloads
1. `cortex_search`: `{ query: string, filters?: { field: string, operator: string, value: string }[] }`.
2. `cortex_analyst_text_to_sql`: `{ question: string, context?: string }`.
3. `sql_exec`: `{ statement: string, warehouse: string, role?: string }`.
4. `data_to_chart`: `{ sqlResultRef: string, chartType: 'table'|'bar'|'line'|'scatter', options?: Record<string, unknown> }`.

## 4.2 Open Questions
- OQ4.1: Do we need WebSocket fallback for legacy browsers lacking SSE support?
- OQ4.2: Is pagination for `/history` required or can we stream entire session?
- OQ4.3: Should `/metrics/report` require admin scope? Define auth matrix.

## 4.3 Next Steps
1. Generate OpenAPI specification draft covering client-facing endpoints.
2. Publish JSON schemas in `packages/shared` referencing data models above.
3. Align with proxy team on timeout/retry strategy and instrumentation fields.
