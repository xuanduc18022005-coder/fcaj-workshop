+++
title = "5.6.2. Configure JWT authorizer and OAuth scopes"
weight = 2
translationKey = "ws-5-2"
+++

## Objective

Protect the NetMon HTTP API with an Amazon API Gateway JWT authorizer. Only requests carrying a valid access token and the required scope should reach Lambda.

## Configure the JWT authorizer

1. Open API Gateway → NetMon HTTP API → Authorization → Manage authorizers. Create or inspect a JWT authorizer, for example `netmon-jwt-authorizer`.
2. Set the following values using the actual user pool and app client details:

| Parameter | Value |
|---|---|
| Identity source | `$request.header.Authorization` |
| Issuer | `https://cognito-idp.us-east-1.amazonaws.com/<USER_POOL_ID>` |
| Audience | Cognito app client ID |
| Authorization type | JWT |

The issuer identifies the user pool; it is not the login domain. For a typical Cognito access token, API Gateway checks `client_id` when `aud` is absent. If `aud` is present, it must match the configured audience.

3. In Authorization or Routes, attach the authorizer to protected routes and require appropriate scopes. The following is a proposed mapping based on the source routes; verify it in the console:

| Route | Suggested scope |
|---|---|
| GET `/devices`, `/devices/{id}`, `/metrics`, `/alerts`, `/logs`, `/settings`, `/simulation/config`, `/sns/status` | `netmon-api/read` |
| POST `/devices`; PUT, DELETE `/devices/{id}` | `netmon-api/write` |
| PUT `/alerts/{id}`, `/settings`, `/simulation/config` | `netmon-api/write` |

4. Verify CORS for origin `http://localhost:5500`, headers `Authorization`, `Content-Type` and appropriate methods. Do not require JWT for CORS preflight OPTIONS. Deploy the stage if auto-deploy is disabled.

## Authorization flow

Cognito issues access token → frontend sends token → JWT authorizer validates signature, issuer, audience, expiry and scope → Lambda handles request → DynamoDB returns data.

In `app.js`, the `awsRequest` function obtains a token from `netmonAuth.token()` and attaches the header for Cognito-protected API requests:

```javascript
const token = netmonAuth.token();
// Send the request only after obtaining an access token.
headers.set('Authorization', `Bearer ${token}`);
```

Never put a real token in the report or screenshots.

## Verification

| Test case | Expected result |
|---|---|
| Valid access token with read scope, GET `/devices` | API forwards request to Lambda; HTTP 200 if successful |
| Missing, invalid or expired token | HTTP 401 Unauthorized on protected route |
| Valid token with insufficient scope | HTTP 403 Forbidden |
| Token with write scope and valid CRUD request | Lambda processes and persists data if IAM permits |

Inspect DevTools → Network; do not disable authorization to fix 401/403 errors. These are expected test results, not tests performed in the team's AWS console. OAuth scopes control API access and do not replace Lambda's IAM execution role.

## References

- [JWT authorizers for HTTP APIs](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html)
- [JWT troubleshooting](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-troubleshooting-jwt.html)


{{< photo src="workshop/jwt-flow.svg" alt="OAuth 2.0, PKCE and JWT authentication flow (technical diagram)." caption="OAuth 2.0, PKCE and JWT authentication flow (technical diagram)." >}}

## API Gateway verification

Open HTTP API → Authorization → Manage authorizers → JWT. Verify Identity source `$request.header.Authorization`, the Cognito pool issuer and the app client audience. Attach the authorizer to each protected route: GET uses `netmon-api/read`, POST/PUT/DELETE use `netmon-api/write` by design. Keep CORS OPTIONS free of token requirements. Redeploy the stage if auto-deploy is off.

Capture the route list, authorizer and scopes without access tokens. After authentication, check GET status in browser Network; try an unauthenticated private session. Never disable the authorizer merely to make a demo work.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

API Gateway → Authorization → select GET /alerts: check the JWT authorizer and netmon-api/read scope. Repeat for protected read/write routes.

{{< photo src="workshop/aws-console/39-api-gateway-jwt-authorizer-read-scope.png" alt="API Gateway → Authorization → select GET /alerts: check the JWT authorizer and netmon-api/read scope. Repeat for protected read/write routes." caption="Configuration evidence from the team." >}}

