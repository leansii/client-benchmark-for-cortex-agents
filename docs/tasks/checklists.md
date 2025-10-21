# Execution Checklists

1. **Weekly Planning**
   - [ ] Review milestone tracker and update statuses
   - [ ] Groom backlog tasks for upcoming sprint
   - [ ] Confirm Snowflake environment changes with infra
   - [ ] Validate doc updates against latest decisions

2. **Pre-Implementation Gate**
   - [ ] Documentation (architecture, contracts, security) approved
   - [ ] Tasks linked to corresponding milestone checklist
   - [ ] Placeholder configs verified (no secrets committed)
   - [ ] Testing plan updated with new scenarios

3. **Pre-Deployment (Staging)**
   - [ ] Secrets retrieved via approved tooling and validated
   - [ ] Proxy mock mode toggled off; live staging endpoints confirmed
   - [ ] Bench smoke suite executed and artifacts archived
   - [ ] Regression review completed (UX parity + accessibility)

4. **Post-Deployment (Staging/Prod)**
   - [ ] Metrics captured (TFT/TTFR, CWV, bundle sizes)
   - [ ] Logs reviewed for anomalies (no PII/leakage)
   - [ ] Rate limit and error dashboards checked
   - [ ] Update risk register with any incidents

5. **Maintenance Cadence**
   - [ ] RSA key rotation scheduled/verified
   - [ ] Network policy IPs audited
   - [ ] Synthetic data refresh queued
   - [ ] Compliance evidence collected (if required)

Decisions:
- Checklists must be updated before each milestone review.
Open Questions:
- Preferred tool for syncing these checklists (Notion/Jira)?
Next Steps:
- Assign owners to each checklist section and integrate with project tracker.
