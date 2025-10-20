# 3. Environment & Configuration Matrix

## 3.1 Decisions
1. Environments: Development (local), Staging, Production.
2. Secret storage: local `.env.local` for dev, AWS Secrets Manager for staging/prod with IAM roles and rotation support.
3. Network policy: runtime outbound deny-all except `*.snowflakecomputing.com`; ingress restricted per environment domain.
4. CORS: proxy exposes `https://{env}.proxy.example.com`, allows `https://{env}.client.example.com`, disallows credentials.
5. Logging levels by env: dev=`debug`, staging=`info`, prod=`warn`.

### 3.1.1 Environment / Secret Table
| Key | Dev (Local) | Staging (Secrets Manager) | Production (Secrets Manager) | Storage Rationale |
| --- | --- | --- | --- | --- |
| `PROXY_PORT` | `3000` | `8080` | `8080` | Non-secret; env var for container runtime. |
| `SNOWFLAKE_ACCOUNT` | `acct_placeholder` | `stage_acct` | `prod_acct` | Required for Snowflake session bootstrap. |
| `SNOWFLAKE_USER` | `dev_user` | `stage_user` | `prod_user` | Maps to prepared Snowflake role. |
| `SNOWFLAKE_ROLE` | `DEV_ROLE` | `STAGE_ROLE` | `PROD_ROLE` | Access scoping. |
| `SNOWFLAKE_PRIVATE_KEY` | mock key path | secret ARN | secret ARN | RSA PKCS#8 key; rotate quarterly. |
| `JWT_SIGNING_KEY` | local dev mock | secret ARN | secret ARN | For 5-minute TTL tokens. |
| `JWT_AUDIENCE` | `dev-clients` | `staging-clients` | `prod-clients` | Validates client tokens. |
| `JWT_ISSUER` | `dev-proxy` | `stage-proxy` | `prod-proxy` | Namespaced issuer ID. |
| `RATE_LIMIT_MAX_RPS` | `5` | `3` | `2` | Tuned per environment. |
| `RATE_LIMIT_BURST` | `10` | `6` | `4` | Token bucket burst. |
| `LOG_LEVEL` | `debug` | `info` | `warn` | Observability. |
| `BENCH_BASELINE_URL` | `http://localhost:3000` | `https://stage.proxy.example.com` | `https://proxy.example.com` | Benchmark harness target. |
| `TELEMETRY_EXPORT_URL` | `http://localhost:4318` | `https://otel.stage.example.com` | `https://otel.prod.example.com` | OTLP exporter endpoint. |

### 3.1.2 Configuration Matrix
| Aspect | Dev | Staging | Prod |
| --- | --- | --- | --- |
| Authentication | Local mock JWT service | AWS Lambda token issuer | Managed key service | 
| Data sources | Synthetic fixtures | Sanitized staging data | Production datasets (read-only) |
| Tools access | `cortex_search`, `cortex_analyst_text_to_sql` mocked | Same plus gated live SQL | All tools live |
| Logging sink | Console + local file | CloudWatch Logs | CloudWatch Logs + SIEM forwarder |
| Observability | Local OTLP collector | Managed OTLP collector | Managed collector + alerts |
| Rate limiting | Disabled by default | Enabled 3 RPS | Enabled 2 RPS + burst 4 |

## 3.2 Open Questions
- OQ3.1: Confirm secret rotation cadence requirements from security.
- OQ3.2: Clarify logging retention policy (90 vs 180 days).
- OQ3.3: Determine staging data refresh frequency and anonymization method.

## 3.3 Next Steps
1. Produce `.env.example` referencing placeholders and documentation comments.
2. Draft secret rotation runbook (owner, trigger, rollback) for staging/prod keys.
3. Align with infra on network policy enforcement (security groups, firewall rules).
