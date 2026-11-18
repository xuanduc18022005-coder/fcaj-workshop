+++
title = "5.6.3. Sign in with PKCE and invoke the API"
weight = 3
translationKey = "ws-5-4"
+++

## Steps
1. Run `index.html` with Live Server in VS Code at `http://localhost:5500/`.
2. Choose AWS login. Cognito managed login authenticates the user and returns an authorization code to the callback.
3. `auth.js` validates state and exchanges the code with the PKCE verifier. `app.js` sends the access token in the `Authorization: Bearer ...` header.
4. Inspect GET `/devices` in DevTools → Network. Check 401 for missing or expired tokens and 403 for insufficient scope. Never capture or publish tokens.

## Check
Login and live data work when configured correctly; offline demo illustrates the UI only.

[PKCE in Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html)

## Read the authentication code

In `auth.js`, `signIn()` creates a verifier, state and SHA-256 challenge; `complete()` validates state and exchanges the authorization code at the token endpoint. The tab's sessionStorage holds the session, not a password. In `app.js`, `awsRequest()` checks authentication before setting Authorization.

For redirect mismatch, inspect callback URL, port 5500 and trailing slash. If a directory listing appears, launch Live Server from the directory containing index.html. For 401, reauthenticate and verify issuer/audience; for 403, verify scope and route. Do not screenshot Network headers containing tokens.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Open managed login to verify the Cognito sign-in page; use an authorized lab user and never capture passwords or tokens.

{{< photo src="workshop/aws-console/48-cognito-managed-login-sign-in.png" alt="Open managed login to verify the Cognito sign-in page; use an authorized lab user and never capture passwords or tokens." caption="Configuration evidence from the team." >}}

**Related interface screenshots:** [Sign-in and authentication](../../#netmon-login).
