+++
title = "5.2.1. Sign in to AWS and select a Region"
weight = 1
translationKey = "ws-1-1"
+++

## Prerequisites

- Authorized AWS account with access to the required services in `us-east-1`.
- VS Code, Live Server, browser and the folder containing `index.html`, `app.js`, `auth.js`, `style.css` and `AWS_BACKEND_CODE`.
- Email address able to confirm SNS subscriptions. Enable MFA; avoid routine root use.

## Pre-deployment checks

1. Open the [AWS Console](https://console.aws.amazon.com/); review region, existing resources, permissions and Billing/Budgets.
2. Reuse working APIs, tables, roles and agents instead of duplicating them. Back up configuration before editing.
3. Run Live Server at `http://localhost:5500/`, matching the Cognito callback in the source. Never publish keys, secrets, JWTs or account identifiers in the public report.

Reference: [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

## Prepare the working directory

Open the extracted NetMon folder containing `index.html`, `auth.js` and `AWS_BACKEND_CODE`. Install Live Server from VS Code Extensions if needed. In the authorized team AWS account, check the Region selector. Record resource names and settings in a private configuration note, not credentials or session information in Git.

**Evidence:** Region selector and resource inventory with internal identifiers masked.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Select US East (N. Virginia), us-east-1, in the Console region menu before opening a service.

{{< photo src="workshop/aws-console/01-aws-region-us-east-1.png" alt="Select US East (N. Virginia), us-east-1, in the Console region menu before opening a service." caption="Configuration evidence from the team." >}}

