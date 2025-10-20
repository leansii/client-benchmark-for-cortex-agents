# 11. Milestones & Roadmap

## 11.1 Decisions
1. Milestone cadence: eleven-week plan (M0–M7) covering initialization to final report.
2. Acceptance criteria tracked via parity checklist, contract tests, benchmark outputs, security review sign-off.
3. Definition of Done: all milestones accepted, UX parity validated, security controls documented, metrics baselined, runbooks published.

### 11.1.1 Milestone Table
| Milestone | Week(s) | Key Outputs | Acceptance Criteria |
| --- | --- | --- | --- |
| M0 Init | 0–1 | Repo scaffold, env docs, risk register | Stakeholder sign-off on scope + docs. |
| M1 Proxy MVP | 2–3 | Proxy spec + mock server plan | Contract tests defined & passing vs mocks. |
| M2 Client MVP Parity | 4–5 | Basic chat UI both clients using mocks | Smoke tests green, parity checklist core items met. |
| M3 Tools Parity | 6–7 | Tool workflows implemented with mocks | Tool parity checklist signed. |
| M4 Reliability | 8 | Error handling, rate limiting, logging plan | Error-path tests green, logging schema approved. |
| M5 Metrics | 9 | Benchmark harness generating initial report | Baseline metrics captured + shared. |
| M6 CI/CD | 10 | Pipeline operational with caching, scheduled bench job | CI pipeline green <15 min, artifacts stored. |
| M7 Final Report | 11 | Comparative analysis doc | Report reviewed, action items captured. |

### 11.1.2 Weekly Roadmap Snapshot
| Week | Focus | Key Checks |
| --- | --- | --- |
| 0 | Kickoff & charter | Charter approved, risk register drafted. |
| 1 | Repo/tooling setup | pnpm workspace verified, docs committed. |
| 2 | Proxy contract draft | OpenAPI skeleton, schema mapping. |
| 3 | Proxy mock implementation | Contract tests executing vs mocks. |
| 4 | React/Vue base UIs | Layout skeleton, SSE mock wired. |
| 5 | UX parity refinement | Citations, tables, error states parity review. |
| 6 | Tool flows | Tools wired with mocks, telemetry instrumentation. |
| 7 | Reliability | Rate limit/backoff tests, logging audits. |
| 8 | Staging live integration | Live smoke run, secret rotation test. |
| 9 | Bench harness | TFT/TTFB instrumentation validated. |
| 10 | CI/CD hardening | Cache tuning, scheduled bench job. |
| 11 | Reporting | Final report + recommendations, retro. |

## 11.2 Open Questions
- OQ11.1: Confirm milestone cadence with stakeholders; adjust if external dependencies exist.
- OQ11.2: Identify demo/review checkpoints (midpoint review?).
- OQ11.3: Determine final report audience and format (PDF vs Notion vs Markdown).

## 11.3 Next Steps
1. Present roadmap to leadership for approval.
2. Establish milestone owners and meeting cadence (weekly sync, async updates).
3. Define Definition of Done checklist per milestone (owner, verification artifacts).
