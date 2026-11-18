+++
title = "5.6.1. Create a Cognito user pool and web client"
weight = 1
translationKey = "ws-5-1"
+++

## Objective

Use an Amazon Cognito user pool to sign in to NetMon Cloud and issue an access token to the frontend. Cognito authenticates users; API authorization is covered in section 5.6.2.

## Implementation steps

1. Open Amazon Cognito in `us-east-1`. Inspect the existing user pool or create one for testing.
2. In App clients, verify or create a public app client (no client secret). Configure managed login and the user pool domain.
3. Select the OAuth 2.0 authorization code flow with PKCE. Set the exact callback URL to `http://localhost:5500/` for Live Server.
4. Create a resource server with identifier `netmon-api` and scopes `read` and `write`. Allow the corresponding scopes on the app client, along with `openid` and `email`.
5. Create or verify a test user. In `auth.js`, match the domain, app client ID and redirect URI to the active user pool. Never publish passwords, tokens or AWS keys.

## Sign-in flow

User → Cognito managed login → authorization code → frontend exchanges code and PKCE verifier for an access token → API Gateway.

NetMon's `auth.js` validates callback `state`, calls `/oauth2/token`, and stores the access token and its expiry in `sessionStorage`. Sign in again when the session expires. Do not substitute an ID token for a scoped API access token.

## Verification

Open NetMon at `http://localhost:5500/` and choose AWS sign-in. Cognito should return to the configured callback after login. Configure the JWT authorizer before testing API access. These are instructions and expected results, not verified live console settings.

## References

- [Authorization code and PKCE](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html)
- [Resource servers and custom scopes](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html)

## Console configuration checklist

| Field | Configuration |
|---|---|
| App type | Public client; no browser client secret |
| OAuth grant | Authorization code grant |
| Callback URL | http://localhost:5500/ |
| Resource server identifier | netmon-api |
| Custom scopes | netmon-api/read; netmon-api/write |
| Standard scopes | openid; email |

Create an authorized lab user under User management → Users. Complete the first-login challenge if a temporary password is issued; do not publish credentials. Verify the Managed login domain against `auth.js`. Record pool and client IDs privately and mask them in report screenshots.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Cognito → User pools → select the NetMon pool; inspect User pool overview.

{{< photo src="workshop/aws-console/43-cognito-user-pool-overview.png" alt="Cognito → User pools → select the NetMon pool; inspect User pool overview." caption="Configuration evidence from the team." >}}

### Step 2

App clients → netmon-web-client: verify public-client type and token configuration.

{{< photo src="workshop/aws-console/44-cognito-app-client-netmon-web-client.png" alt="App clients → netmon-web-client: verify public-client type and token configuration." caption="Configuration evidence from the team." >}}

### Step 3

Resource servers → netmon-api: inspect read and write scopes.

{{< photo src="workshop/aws-console/45-cognito-resource-server-netmon-api-scopes.png" alt="Resource servers → netmon-api: inspect read and write scopes." caption="Configuration evidence from the team." >}}

### Step 4

Domain: verify the managed-login domain used in auth.js.

{{< photo src="workshop/aws-console/46-cognito-domain-managed-login-issuer.png" alt="Domain: verify the managed-login domain used in auth.js." caption="Configuration evidence from the team." >}}

### Step 5

App client → Login pages: check callback URL, OAuth grant and allowed scopes.

{{< photo src="workshop/aws-console/47-cognito-app-client-managed-login-pages-oauth-scopes.png" alt="App client → Login pages: check callback URL, OAuth grant and allowed scopes." caption="Configuration evidence from the team." >}}

