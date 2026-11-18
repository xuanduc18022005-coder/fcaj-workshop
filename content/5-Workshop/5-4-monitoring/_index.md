+++
title = "5.4. CloudWatch, SNS and EventBridge"
weight = 4
translationKey = "ws-chapter-3"
+++

Monitor EC2 with CloudWatch, send SNS notifications and schedule simulated updates through EventBridge.

{{< photo src="workshop/alert-flow.svg" alt="Alert flow" caption="Logical alert flow." >}}

**Execution order:** Configure CloudWatch and SNS first. Scheduler and Streams require the DynamoDB tables in 5.5.1; complete that step before enabling triggers when starting from scratch.

## Detailed lab exercises

- [5.4.1. Collect CPU and memory metrics](5-4-1-metrics/)
- [5.4.2. Create CloudWatch alarms and SNS email](5-4-2-alarms-sns/)
- [5.4.3. EventBridge Scheduler and device simulation](5-4-3-eventbridge/)
- [5.4.4. DynamoDB Streams and alert history](5-4-4-alert-history/)
