# Task Backlog

1. **Documentation Updates**
   - [ ] Align Snowflake setup guide with verified SQL syntax and sequence
   - [ ] Draft security & threat model (`docs/security.md`)
   - [ ] Author CONTRIBUTING guide covering workflows and tooling
   Decisions:
   - Documentation must precede implementation for every feature area.
   Open Questions:
   - Who signs off security documentation (team/role)?
   Next Steps:
   - Collect feedback on existing docs; assign owners before editing.

2. **Schema & Contract Work**
   - [ ] Convert OpenAPI outline into fully-typed schema definitions (TypeScript + zod)
   - [ ] Define SSE heartbeat/reconnect policy within shared contracts
   - [ ] Publish error taxonomy with codes and remediation guidance
   Decisions:
   - Shared package acts as single source of truth for contracts.
   Open Questions:
   - Do we need multi-version support for contracts?
   Next Steps:
   - Schedule workshop with proxy team to confirm API behavior.

3. **Testing & Benchmarking Enablement**
   - [ ] Produce testing strategy document (smoke, contract, long-stream)
   - [ ] Outline bench harness configuration profiles and fixtures
   - [ ] Define parity acceptance tests for React/Vue clients
   Decisions:
   - Bench package responsible for metrics capture and reporting.
   Open Questions:
   - Required browsers/device targets for bench runs?
   Next Steps:
   - Collect existing QA requirements to integrate into plan.

4. **CI/CD & Ops Planning**
   - [ ] Draft CI pipeline blueprint (stages, caches, artifacts)
   - [ ] Document deployment promotion process (dev → staging → prod)
   - [ ] Prepare rollback/diagnostic playbook linked to risk register
   Decisions:
   - GitHub Actions will orchestrate builds and smoke tests.
   Open Questions:
   - Need manual approval gates per environment?
   Next Steps:
   - Align with DevOps on caching infra and artifact retention.

5. **UX & Accessibility Parity**
   - [ ] Finalize shared design tokens + component parity checklist
   - [ ] Document accessibility testing approach (axe, keyboard scripts)
   - [ ] Capture performance budgets (LCP/INP/CLS, bundle size, hydration cost)
   Decisions:
   - React and Vue clients must remain feature-aligned at every release.
   Open Questions:
   - Any additional compliance standards (WCAG AA+) to satisfy?
   Next Steps:
   - Sync with design/accessibility stakeholders for approval.
