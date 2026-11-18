+++
title = "5.7.3. Clean up after the demo"
weight = 3
translationKey = "ws-6-3"
+++

## Cleanup after the workshop

Only proceed when the group has finished the demo and no longer needs the resources. Back up first and coordinate with all shared-account users.

1. Disable unneeded EventBridge schedules and triggers; disable alarm actions when ending the demo.
2. Delete API, Lambda and Cognito only if no other workload relies on them. Remove event source mappings before deleting tables/streams.
3. Export required data; delete test DynamoDB tables and unneeded log groups according to retention needs.
4. Remove unused SNS subscriptions/topics. Stop or terminate EC2 as appropriate; check EBS, snapshots and public IPv4 for remaining charges.
5. Remove dependent network resources and route/IGW/subnet/VPC only when unshared. Review unnecessary IAM roles and permissions.
6. Review Billing and Cost Explorer after cost data refreshes; deleting the frontend alone does not eliminate costs. Retain a suitable AWS Budget.

Reference: [AWS Billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-what-is.html).

## Verification order

Inventory resources by Region and confirm with all three members before deletion. Disable schedules and mappings first, preserve required data, and only then remove targets. While the demo remains active, stop only agreed unnecessary resources. Review EBS, IPv4 addresses, logs, snapshots and Budgets after cleanup. Do not delete shared VPCs or IAM roles.

