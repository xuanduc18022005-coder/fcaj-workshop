+++
title = "5.7.2. Review costs and back up evidence"
weight = 2
translationKey = "ws-6-2"
+++

## Steps
1. Review Billing → Cost Explorer and AWS Budgets by Region and service after billing data updates.
2. Save required report screenshots of VPC, EC2, metrics, alarms, tables, API routes and authorization results with sensitive information redacted.
3. Back up Lambda code, API configuration, test data and operating instructions; never publish access keys or JWTs.
4. If the project defense is still pending, only pause agreed simulation schedules and notifications. Preserve resources needed for the demo.

## Outcome
Evidence is backed up and ongoing cost sources are understood. An estimate is not an actual bill.

## Handover package

- Frontend code, four Lambda source files and policy templates, excluding credentials and tokens.
- Table/key inventory, routes/scopes and environment configuration (private values shared only with the team).
- Sanitized evidence of resource map, EC2, CloudWatch, confirmed SNS, DynamoDB, Lambda triggers and JWT authorizer.
- Worklog, proposal, workshop and test results; preserve a stable ZIP before changes.

Do not publish recipient addresses or confidential data in GitHub.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Billing → Budgets → Budget history: review actual/forecast by period; an earlier screenshot is not the current cost.

{{< photo src="workshop/aws-console/03-aws-budget-history.png" alt="Billing → Budgets → Budget history: review actual/forecast by period; an earlier screenshot is not the current cost." caption="Configuration evidence from the team." >}}

