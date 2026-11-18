+++
title = "5.4.2. Create CloudWatch alarms and SNS email"
weight = 2
translationKey = "ws-3-2"
+++

## Configure SNS

1. Open SNS → Topics → Create topic → Standard, or reuse an existing topic.
2. Create an Email subscription and confirm it using the received email.
3. Add the topic ARN to the monitor and SNS status API's `SNS_TOPIC_ARN`. Grant Publish to the monitor and topic/subscription read permissions to the API. Configure the CloudWatch alarm action for EC2.
4. Set independent CPU/RAM thresholds through the UI or NetworkSettings. The monitor evaluates threshold crossings on synthetic devices and records handling status. Use `forcePeak` / `forceNormal` only on test devices, never to change real EC2 data.

## Verification

Check NetworkAlerts when the monitor works and confirm actual email receipt and timestamp. GET `/sns/status` only checks configuration/subscriptions. Restore normal simulated load after testing. [Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-getting-started.html).

## Create an EC2 alarm

1. CloudWatch → Alarms → All alarms → Create alarm → Select metric.
2. Select `AWS/EC2` → Per-Instance Metrics → CPUUtilization; for RAM use `NetMon/EC2`, mem_used_percent and the correct InstanceId.
3. Choose Average and an appropriate period, threshold and evaluation periods. Configure In alarm notification to the confirmed SNS topic.
4. Give the alarm a clear name, preview it and create it. Inspect OK/ALARM/INSUFFICIENT_DATA and History; missing data does not establish a broken alarm.

CloudWatch EC2 emails use a separate path. The simulation monitor writes NetworkAlerts; EC2 alarms are not automatically persisted there. Test email only in an agreed lab or use controlled SNS Publish message.


## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

CloudWatch → Alarms → All alarms: compare team alarms and current states.

{{< photo src="workshop/aws-console/21-cloudwatch-alarms-list.png" alt="CloudWatch → Alarms → All alarms: compare team alarms and current states." caption="Configuration evidence from the team." >}}

### Step 2

Select netmon-cpu-high-80. The earlier team screenshot uses 80%; inspect the threshold and notification action.

{{< photo src="workshop/aws-console/24-cloudwatch-cpu-high-80-details.png" alt="Select netmon-cpu-high-80. The earlier team screenshot uses 80%; inspect the threshold and notification action." caption="Configuration evidence from the team." >}}

### Step 3

Select netmon-ram-high-80; check mem_used_percent and the correct InstanceId.

{{< photo src="workshop/aws-console/23-cloudwatch-ram-high-80-details.png" alt="Select netmon-ram-high-80; check mem_used_percent and the correct InstanceId." caption="Configuration evidence from the team." >}}

### Step 4

Select netmon-disk-high-85; inspect disk_used_percent and its dimensions.

{{< photo src="workshop/aws-console/22-cloudwatch-disk-high-85-details.png" alt="Select netmon-disk-high-85; inspect disk_used_percent and its dimensions." caption="Configuration evidence from the team." >}}

**Related interface screenshots:** [Alerts and incident handling](../../#netmon-alerts) · [System settings and SNS](../../#netmon-settings).

### Verify the SNS email subscription

Amazon SNS → Topics → `netmon-alerts` → Subscriptions → select the subscription. Verify Protocol = Email and Status = Confirmed. Leave the filter policy empty to receive all messages. This records the state at capture time, not proof of new email delivery.

{{< photo src="workshop/aws-console/25-sns-new-subscription-confirmed.png" alt="Confirmed SNS subscription in the team screenshot." caption="Confirmed SNS subscription in the team screenshot." >}}
