# Snowflake Environment Preparation & Project Testing Guide

1. **Pre-Requisites Checklist**
   | Item | Action | Notes |
   | --- | --- | --- |
   | Snowflake account | Ensure access to Standard/Enterprise Trial in region `ap-southeast-1` | Use admin credentials outside repo |
   | Roles | Confirm availability of `SECURITYADMIN` + `ACCOUNTADMIN` for initial provisioning | Limit usage to setup window |
   | RSA keys | Generate PKCS#8 private key + base64 DER public key placeholders | Store securely; never commit |
   | Networking | Document source IPs for proxy + bench runners | Needed for network policy allowlists |
   Decisions:
   - All secrets managed outside repo (e.g., AWS Secrets Manager).
   Open Questions:
   - Additional corporate compliance prerequisites?
   Next Steps:
   - Collect contact info for Snowflake account owner for approvals.

2. **Role & User Provisioning**
   1. Log in with `ACCOUNTADMIN`.
   2. Create custom role `DEVELOPER_CORTEX` with minimal privileges:
      ```sql
      CREATE ROLE DEVELOPER_CORTEX;
      GRANT ROLE DEVELOPER_CORTEX TO ROLE SECURITYADMIN;
      ```
   3. Grant privileges for required objects (database, schema, warehouse, Cortex resources):
      ```sql
      GRANT USAGE ON DATABASE CORTEX_BENCH_DB TO ROLE DEVELOPER_CORTEX;
      GRANT USAGE ON SCHEMA CORTEX_BENCH_DB.PUBLIC TO ROLE DEVELOPER_CORTEX;
      GRANT SELECT ON ALL TABLES IN SCHEMA CORTEX_BENCH_DB.PUBLIC TO ROLE DEVELOPER_CORTEX;
      GRANT USAGE ON FUTURE TABLES IN SCHEMA CORTEX_BENCH_DB.PUBLIC TO ROLE DEVELOPER_CORTEX;
      GRANT USAGE ON WAREHOUSE CORTEX_BENCH_WH TO ROLE DEVELOPER_CORTEX;
      -- Replace with concrete Cortex objects once confirmed (e.g., search/analyst services)
      -- GRANT USAGE ON <CORTEX_OBJECT_NAME> TO ROLE DEVELOPER_CORTEX;
      ```
   4. Create service user `CORTEX_PROXY_USER` bound to role:
      ```sql
      CREATE USER CORTEX_PROXY_USER
        PASSWORD = 'Tmp_Str0ng_Pass!234' -- replace or omit if using key-pair only
        DEFAULT_ROLE = DEVELOPER_CORTEX
        DEFAULT_WAREHOUSE = CORTEX_BENCH_WH
        MUST_CHANGE_PASSWORD = FALSE;
      GRANT ROLE DEVELOPER_CORTEX TO USER CORTEX_PROXY_USER;
      -- Upload base64-encoded public key for key-pair auth
      ALTER USER CORTEX_PROXY_USER SET RSA_PUBLIC_KEY = '{{PUBLIC_KEY_B64}}';
      ```
   Decisions:
   - Service user dedicated to proxy; no direct client logins.
   Open Questions:
   - Need separate users per environment (dev/stg/prod)?
   Next Steps:
   - Coordinate with security to rotate passwords into secret manager.

3. **Warehouse & Database Setup**
   | Step | Command | Purpose |
   | --- | --- | --- |
   | Create database | `CREATE DATABASE CORTEX_BENCH_DB;` | Store demo data + views |
   | Create schema | `CREATE SCHEMA CORTEX_BENCH_DB.PUBLIC;` | Default schema |
   | Populate fixtures | Use `COPY INTO` or `INSERT` with synthetic data | Supports Analyst/Text-to-SQL tests |
   | Create warehouse | `CREATE WAREHOUSE CORTEX_BENCH_WH WITH WAREHOUSE_SIZE = 'XSMALL';` | Lightweight compute |
   Decisions:
   - Synthetic data only; no production records.
   Open Questions:
   - Need multi-schema support (analytics vs search)?
   Next Steps:
   - Export DDL to version-controlled folder (outside secret areas).

4. **Network & Security Controls**
   1. Define network policy allowing proxy IPs only:
      ```sql
      CREATE NETWORK POLICY CORTEX_PROXY_POLICY
        ALLOWED_IP_LIST = ('{{PUBLIC_IP_CIDR}}');
      ALTER ACCOUNT SET NETWORK_POLICY = CORTEX_PROXY_POLICY;
      ```
   2. Enforce TLS 1.2+ by default.
   3. Enable query tagging for auditing:
      ```sql
      ALTER ACCOUNT SET QUERY_TAG = 'cortex-benchmark';
      ```
   Decisions:
   - Network policies applied at account level; adjust for staging vs prod.
   Open Questions:
   - Need Snowflake PrivateLink integration? |
   Next Steps:
   - Document IP change process to avoid outages.

5. **Cortex Agent Configuration**
   | Task | Command / Action |
   | --- | --- |
   | Verify agent availability | `SHOW CORTEX ...` (models/services as enabled) |
   | Register agent or workspace | Follow Snowflake docs; fill placeholders only |
   | Assign permissions | Grant `USAGE` on specific Cortex services to `DEVELOPER_CORTEX` |
   | Record endpoint info | Placeholder `CORTEX_AGENT_ENDPOINT` stored in secret manager |
   Decisions:
   - Agent configuration stored outside repo; only placeholders referenced.
   Open Questions:
   - Required agent custom instructions/system prompts? |
   Next Steps:
   - Capture system prompt template in secure doc once approved.

6. **Key Pair Authentication (Optional)**
   1. Generate RSA key pair (PKCS#8) offline:
      ```bash
      openssl genrsa 2048 | openssl pkcs8 -topk8 -inform PEM -out rsa_key.p8 -nocrypt
      openssl rsa -in rsa_key.p8 -pubout -outform DER -out public_key.der
      openssl base64 -in rsa_key.p8 -A > private_key.b64
      openssl base64 -in public_key.der -A > public_key.b64
      ```
   2. Upload public key to Snowflake user:
      ```sql
      ALTER USER CORTEX_PROXY_USER SET RSA_PUBLIC_KEY='{{PUBLIC_KEY_B64}}';
      ```
   3. Store private key in secret manager; configure proxy to read at runtime (`SNOWFLAKE_PRIVATE_KEY_B64`).
   Decisions:
   - Key pair auth preferred over password for automation.
   Open Questions:
   - Need dual-key rotation strategy? |
   Next Steps:
   - Document rotation cadence (quarterly) in security checklist.

7. **Environment Validation**
   | Validation | Command | Expected Result |
   | --- | --- | --- |
   | Role verification | `SHOW GRANTS TO ROLE DEVELOPER_CORTEX;` | Confirms database + warehouse privileges |
   | User grants | `SHOW GRANTS TO USER CORTEX_PROXY_USER;` | Lists assigned role + objects |
   | Connection test | Use Snowflake CLI/driver from secure machine | Auth succeeds with key/password |
   | Cortex ping | Execute minimal chat query via Snowflake worksheet | Response echoes synthetic data |
   Decisions:
   - Validation performed in staging before enabling prod.
   Open Questions:
   - Need automated validation script? |
   Next Steps:
   - Plan contract tests to run against staging once proxy ready.

8. **Testing Project with Prepared Environment**
   1. **Configure Local/Staging Secrets**
      - Store `SNOWFLAKE_ACCOUNT`, `SNOWFLAKE_HOST`, `SNOWFLAKE_USER`, `SNOWFLAKE_PRIVATE_KEY_B64` (or `SNOWFLAKE_PASSWORD`), `SNOWFLAKE_ROLE`, `SNOWFLAKE_WAREHOUSE`, `PROXY_JWT_SECRET` in secret manager.
      - Populate `.env.template` with placeholders only; developers fetch secrets via secure tooling when needed.
   2. **Proxy Mock Mode** (before secrets ready)
      - Enable feature flag `PROXY_MODE=mock`.
      - Use shared package fixtures to simulate Cortex responses.
   3. **Staging Smoke Test**
      - Deploy proxy with staging secrets.
      - Run bench smoke suite pointing React/Vue clients to staging proxy.
      - Validate `/api/v1/session/token`, `/api/v1/chat`, `/api/v1/tools/*` using contract tests.
   4. **Metrics Capture**
      - Execute `pnpm --filter bench bench:ci` (once implemented) to collect TFT/TTFR and CWV metrics.
      - Store artifacts in CI for comparison.
   Decisions:
   - Secrets never committed; bench runs only on staging/prod with approval.
   Open Questions:
   - Need manual UAT checklist before staging smoke?
   Next Steps:
   - Draft test case catalog referencing bench package once ready.

9. **Maintenance & Rotation**
   | Task | Cadence | Owner |
   | --- | --- | --- |
   | Rotate RSA keys | 90 days | Security/Infra |
   | Review role grants | Quarterly | Security admin |
   | Refresh synthetic data | Each major release | Data engineering |
   | Audit network policy IPs | Monthly | Infra |
   Decisions:
   - Automate reminders via ticketing system.
   Open Questions:
   - Need compliance evidence exports (audit logs)? |
   Next Steps:
   - Create runbook for emergency secret revocation.

10. **Appendix**
   - Replace double curly braces (`{{PLACEHOLDER}}`) with actual values during deployment.
   - Keep all setup SQL scripts in secure internal repository, not this project.
   - Review Snowflake Cortex documentation for latest tool availability.
   Decisions:
   - Treat this document as baseline; update after security review.
   Open Questions:
   - Should we add automated checklist (e.g., Notion/Confluence) linked here?
   Next Steps:
   - Schedule kickoff with Snowflake admins to walkthrough plan.
