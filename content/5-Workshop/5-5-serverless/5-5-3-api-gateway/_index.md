+++
title = "5.5.3. Build an HTTP API Gateway"
weight = 3
translationKey = "ws-4-3"
+++

## Create and configure the API

1. Open API Gateway → HTTP API, integrate the `netmon-api` Lambda. Check stage and Invoke URL; do not publish internal configuration.
2. Create routes matching the source and attach the correct integration.

| Method | Route | Purpose |
|---|---|---|
| GET, POST | `/devices` | List, create |
| GET, PUT, DELETE | `/devices/{id}` | Detail, edit, delete |
| GET | `/metrics`, `/alerts`, `/logs` | Metrics, alerts, logs |
| PUT | `/alerts/{id}` | Update handling status |
| GET, PUT | `/settings`, `/simulation/config` | Thresholds, simulator interval |
| GET | `/sns/status` | Check SNS configuration |

3. Configure CORS for `http://localhost:5500`, GET/POST/PUT/DELETE/OPTIONS and Authorization/Content-Type headers. Preflight must be handled without a token.
4. Deploy the stage if auto-deploy is off. Enter the matching private project Invoke URL; never add access keys to JavaScript.

## Verification

Check routes, Lambda integrations and stage. Continue to 5.6.1 for Cognito and 5.6.2 to protect routes before invoking the API. [CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html).

## Route verification

The source currently supports 14 method/path pairs in the table above. Compare each route against its integration and the JWT configuration in 5.6.2; this does not establish that every route is deployed. `GET /metrics` also handles EC2 history through query parameters, with no separate route.

## Verify individual routes

In API Gateway → APIs → HTTP API → Routes, select each method/path and inspect its `netmon-api` integration. Check payload format 2.0, which supplies rawPath and requestContext.http. Verify the `$default` or existing stage and base URL rather than appending `/devices` twice. Configure CORS origin without a trailing slash and allow Authorization and Content-Type. If a catch-all route has an authorizer, handle OPTIONS without requiring a token.

| Error | Check |
|---|---|
| 404 | Route, stage, URL and rawPath |
| 401/403 | JWT, scope or access policy |
| 500/502 | Integration, handler, Lambda logs and table permissions |
| CORS | Origin, methods, headers and preflight |

Complete chapter 5.6 before invoking protected routes with a real token.

## Screenshots and supporting evidence

{{< photo src="workshop/evidence/03_API_Gateway_simulation_routes.png" alt="Simulation configuration route in API Gateway Console." caption="User-provided AWS screenshot. Simulation configuration route in API Gateway Console." >}}

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

API Gateway → netmon-management-api → Routes: create or verify method/path pairs. This earlier screenshot predates some metrics/settings/simulation routes; use the current code as the route reference.

{{< photo src="workshop/aws-console/38-api-gateway-netmon-management-api-routes.png" alt="API Gateway → netmon-management-api → Routes: create or verify method/path pairs. This earlier screenshot predates some metrics/settings/simulation routes; use the current code as the route reference." caption="Configuration evidence from the team." >}}

### Step 2

Integrations: select the route → Attach integration → Lambda netmon-api.

{{< photo src="workshop/aws-console/40-api-gateway-integrations-netmon-api.png" alt="Integrations: select the route → Attach integration → Lambda netmon-api." caption="Configuration evidence from the team." >}}

### Step 3

CORS: allowed origins, methods and headers must match the frontend origin.

{{< photo src="workshop/aws-console/41-api-gateway-cors-localhost-5500.png" alt="CORS: allowed origins, methods and headers must match the frontend origin." caption="Configuration evidence from the team." >}}

### Step 4

Stages → $default: check Auto-deploy; if disabled, deploy after changes.

{{< photo src="workshop/aws-console/42-api-gateway-default-stage-auto-deploy.png" alt="Stages → $default: check Auto-deploy; if disabled, deploy after changes." caption="Configuration evidence from the team." >}}

