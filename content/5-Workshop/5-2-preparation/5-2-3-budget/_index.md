+++
title = "5.2.3. Set up AWS Budgets"
weight = 3
translationKey = "ws-1-3"
+++

## Objective
Monitor spending and avoid forgotten resources.

## Steps
1. Open Billing and Cost Management → Budgets → Create budget.
2. Select a monthly Cost budget and a team-appropriate amount; a budget is not actual spending.
3. Configure an actual-cost alert at an agreed threshold (for example 25%) and enter notification recipients.
4. Review Cost Explorer for EC2, EBS, IPv4, CloudWatch and request-based services.

## Check
The budget appears in the list. An alert is not a hard spending cap and does not automatically stop all resources.

[AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)

## Periodic review

Inspect actual and forecast spending where available and compare by service in Cost Explorer. Check charges that may persist independently of EC2 runtime, including EBS, public IPv4 and logs. Free Tier eligibility does not establish that the whole project is free. Capture the budget with email and account numbers masked.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Billing → Budgets → select the budget → Alerts. The team screenshot shows a $20 monthly budget with actual-cost thresholds of 25%, 50%, and 100% ($5, $10, $20); verify the current amount before changing it.

{{< photo src="workshop/aws-console/05-budget-alerts-25-50-100.png" alt="Billing → Budgets → select the budget → Alerts. The team screenshot shows a $20 monthly budget with actual-cost thresholds of 25%, 50%, and 100% ($5, $10, $20); verify the current amount before changing it." caption="Configuration evidence from the team." >}}

