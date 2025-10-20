# 6. Security & Compliance Guide

## 6.1 Decisions
1. Secrets handling: never commit to repo; dev uses placeholders; staging/prod rely on AWS Secrets Manager with IAM role binding.
2. JWT policy: TTL ≤ 5 minutes, clock skew tolerance ±60 seconds, rotation every 90 days or on incident, store keys in HSM-backed service.
3. Rate limiting: IP + client ID token bucket (burst 2x base); respond with 429 + `Retry-After` header.
4. Request validation: proxy uses shared zod schemas; reject requests >64 KB; sanitize tool inputs to prevent SSRF.
5. Logging hygiene: structured logs with allow-listed fields (traceId, sessionId, latency); redaction middleware removes secrets/PII.
6. Compliance alignment: target SOC2 controls for access management, logging retention (min 90 days), audit trails on sensitive actions.
7. Threat model coverage: SSRF, secret leakage, log hygiene, misconfigured CORS, replay attacks, upstream outages.

### 6.1.1 Controls Checklist
- [ ] Document IAM policies for Secrets Manager (least privilege, rotation).
- [ ] Implement JWT rotation runbook with key versioning.
- [ ] Define SSRF validation rules (allowlist domains for tool URLs).
- [ ] Configure proxy to drop responses lacking `X-Request-ID` or invalid content types.
- [ ] Create logging schema + alerting thresholds for anomalies (rate limit spikes, auth failures).
- [ ] Provide data retention policy referencing compliance requirements.

## 6.2 Open Questions
- OQ6.1: Are additional compliance frameworks (ISO 27001, GDPR) applicable?
- OQ6.2: Do we require per-user audit logs or session-level logs sufficient?
- OQ6.3: Clarify incident response SLAs and on-call rotation responsibilities.

## 6.3 Next Steps
1. Draft STRIDE-lite threat model doc with mitigations + owners.
2. Align with security team on logging retention and alerting thresholds.
3. Prepare checklist for pre-production security review (penetration test scope, dependencies).
