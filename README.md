# Client Benchmark for Cortex Agents

1. **Project Charter**
   | Item | Detail |
   | --- | --- |
   | Goal | Compare React and Vue clients for Snowflake Cortex Agent via secure proxy. |
   | Success Criteria | Feature parity, measurable performance metrics, secure secret handling, reproducible benchmarks. |
   | Scope | Monorepo with clients, shared schemas, benchmark harness; proxy lives separately but contracts maintained here. |
   Decisions:
   - Use pnpm workspaces across four packages (`react-app`, `vue-app`, `shared`, `bench`).
   - All Cortex interactions flow through server proxy; clients never touch secrets.
   - Documentation-first: specs and checklists precede implementation.
   Open Questions:
   - Confirm proxy stack ownership and release cadence.
   - Determine design system source (internal vs external).
   Next Steps:
   - Align stakeholders on charter and success metrics.
   - Approve security and compliance requirements before coding.

2. **Repository Layout & Responsibilities**
   | Path | Role | Primary Deliverables |
   | --- | --- | --- |
   | `apps/react-app` | React client | Streaming chat UI, parity features, accessibility + perf stats. |
   | `apps/vue-app` | Vue client | Same feature set as React, Composition API implementation. |
   | `packages/shared` | Shared contracts | Types, schemas, tokens, utilities, OpenAPI outlines. |
   | `packages/bench` | Benchmark harness | Perf runs, reports, mental complexity analysis. |
   Decisions:
   - Keep proxy outside repo; consume contracts via shared package. |
   - Use `docs/` for cross-cutting specifications (architecture, runbooks).
   Open Questions:
   - Need additional workspaces (proxy mocks, infra scripts)?
   Next Steps:
   - Populate package-specific READMEs (done).
   - Define contribution guide once processes confirmed.

3. **Workflow Overview**
   | Phase | Checklist |
   | --- | --- |
   | Planning | `[ ]` Validate requirements `[ ]` Update specs `[ ]` Review security implications |
   | Implementation | `[ ]` Reference shared schemas `[ ]` Maintain parity checklist `[ ]` Update docs |
   | Verification | `[ ]` Run smoke & contract tests `[ ]` Capture metrics `[ ]` Log findings |
   | Reporting | `[ ]` Update benchmark report `[ ]` Submit comparison narrative `[ ]` Review with stakeholders |
   Decisions:
   - Docs and schemas updated before code merges.
   - Benchmarks trigger only after parity acceptance.
   Open Questions:
   - Required sign-offs per phase? (Product, Security, QA)
   Next Steps:
   - Publish governance checklist in `docs/ops.md` (future).

4. **Environment & Configuration Snapshot**
   | Env | Proxy URL | Client Domains | Secrets Store |
   | --- | --- | --- | --- |
   | Dev | `http://localhost:4000` | `http://localhost:5173`, `http://localhost:4173` | Local placeholders (no real secrets) |
   | Staging | `https://stg-proxy.example.com` | `https://stg-client-react.example.com`, `https://stg-client-vue.example.com` | AWS Secrets Manager |
   | Prod | `https://proxy.example.com` | `https://react.example.com`, `https://vue.example.com` | AWS Secrets Manager |
   Decisions:
   - Adopt `.env.template` per workspace with placeholders only.
   - Enforce strict CORS origin lists.
   Open Questions:
   - Need VPN requirements for staging access?
   Next Steps:
   - Document secret rotation runbook in security doc.

5. **Documentation Index**
   | Doc | Purpose | Status |
   | --- | --- | --- |
   | `README.md` | Entry point (this file) | Draft v0.1 |
   | `docs/architecture.md` | System architecture & flows | Pending |
   | `packages/shared/README.md` | Shared package plan | Draft v0.1 |
   | `packages/bench/README.md` | Benchmark harness plan | Draft v0.1 |
   | `apps/react-app/README.md` | React client plan | Draft v0.1 |
   | `apps/vue-app/README.md` | Vue client plan | Draft v0.1 |
   Decisions:
   - Maintain doc index in root README.
   - Version docs via semantic commits.
   Open Questions:
   - Should docs adopt numbering for snapshots (v0.1, v0.2)?
   Next Steps:
   - Fill `docs/architecture.md` next.

6. **Contribution Notes**
   | Item | Guideline |
   | --- | --- |
   | Branching | `main` protected; feature branches `feat/<area>` |
   | Commit Style | Conventional commits; docs-only commits allowed. |
   | Reviews | Require security + product review for proxy contract changes. |
   | Tooling | Node >= 18.18, pnpm >= 8.15, no code execution yet. |
   Decisions:
   - Use GitHub Actions for CI/CD (TBD pipeline).
   - Adopt Dependabot for dependency intel once code exists.
   Open Questions:
   - Required reviewer roles? (Design, Accessibility?)
   Next Steps:
   - Draft CONTRIBUTING.md after architecture doc.

7. **Milestones Snapshot**
   | Milestone | Description | Acceptance Highlights |
   | --- | --- | --- |
   | M0 Init | Repo scaffolding | Docs ready, configs templated |
   | M1 Proxy MVP | Proxy contracts + mock mode | Shared schemas published |
   | M2 Client MVP Parity | Both clients implement base chat | Parity checklist passes |
   | M5 Metrics | Bench harness outputs metrics | Baseline report stored |
   | M7 Report | Final comparison delivered | Stakeholder sign-off |
   Decisions:
   - Milestones track to 12-week roadmap.
   Open Questions:
   - Need interim design review gates?
   Next Steps:
   - Sync roadmap with PM + Security.

8. **Risk & Mitigation Summary**
   | Risk | Mitigation | Owner |
   | --- | --- | --- |
   | Cortex API drift | Contract tests + version pinning | Shared team |
   | Missing secrets early | Proxy mock mode + feature flags | Proxy team |
   | Latency variance | Bench runs on consistent hardware | Bench team |
   Decisions:
   - Capture detailed matrix in security doc.
   Open Questions:
   - Additional compliance obligations (SOC2, ISO) to reflect?
   Next Steps:
   - Expand threat model in `docs/security.md` (future).

9. **Appendix**
   - Repo assumes AWS ap-southeast-1, Snowflake Standard/Enterprise Trial.
   - RSA keys (PKCS#8) and Snowflake roles delivered later; placeholders only.
   - Network runtime default closed; allowlist `*.snowflakecomputing.com` for proxy when enabled.
   Decisions:
   - Treat all example values as placeholders until secrets provisioned.
   Open Questions:
   - Need automation for key provisioning?
   Next Steps:
   - Coordinate with infra for secret distribution timeline.
