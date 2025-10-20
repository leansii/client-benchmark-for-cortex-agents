## Shared Package (`packages/shared`)

### 1. Overview
| Item | Detail |
| --- | --- |
| Purpose | Centralize types, schemas, design tokens, utilities shared by React and Vue clients plus proxy contracts. |
| Primary Deliverables | TypeScript definitions (messages, tools, configs), zod schemas, design tokens, Storybook stories. |
| Consumers | `apps/react-app`, `apps/vue-app`, `packages/bench`, proxy repo (read-only). |
| Outputs | ESM bundle, type declarations, generated OpenAPI/JSON schema docs. |

### 2. Planned Structure
1. `src/index.ts` – export surface aggregator.
2. `src/types/` – message schemas, tool payloads, API responses.
3. `src/schemas/` – zod validators mirroring API contracts.
4. `src/ui/` – design tokens, shared styles, icons.
5. `src/config/` – environment defaults, feature flag definitions.
6. `src/testing/` – fixtures, builders, MSW handlers for consumers.
7. `docs/` – OpenAPI, JSON schema outputs (generated).

### 3. Build & Scripts (planned)
- `pnpm build` → tsup/rollup compile to ESM + d.ts.
- `pnpm lint` → ESLint with TypeScript plugin.
- `pnpm test` → Vitest for schema and util coverage.
- `pnpm generate:schemas` → Emit JSON schema/OpenAPI artifacts.
- `pnpm storybook` → Token + shared component showcase (optional).

### 4. Versioning & Publishing
| Policy | Detail |
| --- | --- |
| Versioning | Managed via workspace, semantic commits trigger changesets. |
| Distribution | Local workspace consumption; optional npm dist internally. |
| Compatibility | Breaking schema changes require client + proxy coordination. |

Checklist:
- [ ] Define export map (`package.json`) with ESM + types.
- [ ] Set up tsconfig references for downstream packages.
- [ ] Document schema generation workflow + storage location.

### 5. Contract Coverage
1. Message + Tool schemas with zod + TypeScript types.
2. API request/response definitions for `/session/token`, `/chat`, `/tools/*`, `/history`, `/metrics/report`.
3. Logging metadata types (traceId, sessionId, clientVersion).
4. Error codes enumeration with helpers for UI copy mapping.
5. Feature flag definition + guards.

### 6. Decisions
- TypeScript strict mode with project references.
- zod as single source of truth for runtime validation.
- tsup (ESM) for bundling to keep build lightweight.
- Storybook tokens exported to clients for parity.

### 7. Open Questions
- Should JSON schema artifacts commit to repo or publish to S3?
- Need localization utilities shared between clients?
- Any proxy-side language bindings required (e.g., Python)?

### 8. Next Steps
1. Draft module surface in `src/index.ts` (no implementation yet).
2. Prepare schema scaffolding list aligning with API plan.
3. Plan integration tests to ensure consumers align with schemas.
