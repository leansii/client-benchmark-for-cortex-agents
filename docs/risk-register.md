# 10. Risk Register

## 10.1 Decisions
1. Maintain lightweight risk register updated weekly; categorize by likelihood/impact (Low/Med/High).
2. Primary risks tracked: Cortex API changes, regional access restrictions, Snowflake cost overrun, clock skew, missing secrets, benchmarking flakiness.
3. Mitigation strategies documented with owners and triggers; include rollback procedures for proxy/client deployments.
4. Incident response: leverage existing org on-call; define escalation matrix before staging go-live.

### 10.1.1 Risk Table
| Risk | Likelihood | Impact | Mitigation | Owner |
| --- | --- | --- | --- | --- |
| Cortex API changes | Medium | High | Monitor release notes, version flag in proxy, schema validation. | Proxy lead |
| Regional restrictions | Low | Medium | Validate Snowflake region availability, plan failover region. | Infra lead |
| Snowflake costs | Medium | Medium | Set query quotas, monitor via usage API, alerting on spend. | Data lead |
| Clock skew | Medium | Medium | NTP sync, ±60s skew tolerance in JWT validation. | Platform |
| Missing secrets early | High | Medium | Use mocks, block staging deploy until secrets present, create gating checklist. | PM |
| Benchmark noise | Medium | Medium | Control hardware, run median of 5 iterations, log ambient metrics. | Bench owner |
| SSRF exposure | Low | High | Validate URLs, allowlist, disable direct network access for tools. | Security |

## 10.2 Open Questions
- OQ10.1: Confirm incident response process and paging tool.
- OQ10.2: Determine acceptable downtime during rollback operations.
- OQ10.3: Need legal review for data retention or user consent?

## 10.3 Next Steps
1. Assign owners formally and collect mitigation sign-offs.
2. Draft rollback SOP referencing release artifacts and verification steps.
3. Integrate risk review into weekly status meeting agenda.
