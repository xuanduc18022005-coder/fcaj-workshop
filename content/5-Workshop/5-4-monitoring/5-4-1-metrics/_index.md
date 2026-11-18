+++
title = "5.4.1. Collect CPU and memory metrics"
weight = 1
translationKey = "ws-3-1"
+++

## EC2 monitoring

1. Open CloudWatch → Metrics → EC2 → Per-Instance Metrics; choose the correct InstanceId and `CPUUtilization`.
2. Install the Amazon CloudWatch agent and attach an appropriate role. Configure Linux `mem_used_percent` at roughly 60 seconds with InstanceId dimension. The API reads RAM from `NetMon/EC2` (the sample agent file uses `CWAgent`); verify the live namespace, do not overwrite a working agent.
3. Create CPU/RAM alarms, e.g. 90%, with appropriate evaluation periods and SNS actions. This is a test example, not a verified live threshold. Avoid overly sensitive alarms without evaluating data.
4. Register EC2 by InstanceId in NetMon; view 15-minute to 24-hour history. The API queries CPU at 300-second periods and RAM at 60 seconds for short windows, 300 seconds for long windows. Query periods do not increase collection frequency.

## Verification

For missing RAM, check the agent, namespace, InstanceId and IAM. Missing values are not zero. Review alarm history and SNS actions. [CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html).

## Example CloudWatch Agent configuration

This example uses the namespace read by `netmon-api.py`. Use it only for a new lab instance or after preserving and verifying the existing configuration.

```json
{
  "agent": {"metrics_collection_interval": 60},
  "metrics": {
    "namespace": "NetMon/EC2",
    "append_dimensions": {"InstanceId": "${aws:InstanceId}"},
    "aggregation_dimensions": [["InstanceId"]],
    "metrics_collected": {"mem": {"measurement": ["mem_used_percent"], "metrics_collection_interval": 60}}
  }
}
```

Install the agent on Ubuntu using the AWS documentation. Save the configuration and run these commands, substituting the correct private file path:

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/path/to/netmon-agent.json -s
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a status
```

Verify `NetMon/EC2` → `InstanceId` → `mem_used_percent` in CloudWatch and CPU in `AWS/EC2`. Wait for data points before creating alarms. Do not reinstall a working agent merely for screenshots.


## Screenshots and supporting evidence

{{< photo src="workshop/evidence/01_Lambda_GET_metrics.png" alt="GET metrics test output in Lambda Console." caption="User-provided AWS screenshot. GET metrics test output in Lambda Console." >}}

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

EC2 → Instances → Monitoring: inspect CPUUtilization and NetworkIn/NetworkOut for the selected instance.

{{< photo src="workshop/aws-console/50-ec2-netmon-monitoring-cpu-network-metrics.png" alt="EC2 → Instances → Monitoring: inspect CPUUtilization and NetworkIn/NetworkOut for the selected instance." caption="Configuration evidence from the team." >}}

### Step 2

CloudWatch → Metrics: open mem_used_percent for the instance. Verify the namespace/dimension and data points.

{{< photo src="workshop/aws-console/51-cloudwatch-netmon-ec2-ram-mem-used-percent.png" alt="CloudWatch → Metrics: open mem_used_percent for the instance. Verify the namespace/dimension and data points." caption="Configuration evidence from the team." >}}

### Step 3

Open disk_used_percent to inspect disk utilization when configured in the agent.

{{< photo src="workshop/aws-console/52-cloudwatch-netmon-ec2-disk-used-percent.png" alt="Open disk_used_percent to inspect disk utilization when configured in the agent." caption="Configuration evidence from the team." >}}

**Related interface screenshots:** [CPU and RAM monitoring](../../#netmon-metrics).
