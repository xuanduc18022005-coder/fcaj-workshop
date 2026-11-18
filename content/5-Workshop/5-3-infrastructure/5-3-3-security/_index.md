+++
title = "5.3.3. Security groups and IAM roles"
weight = 3
translationKey = "ws-2-3"
+++

## Steps
1. In EC2 → Security Groups, review the group attached to the monitoring instance. Restrict rules to required access; do not expose SSH to `0.0.0.0/0`.
2. For Session Manager, check the SSM Agent, instance profile and service endpoint connectivity. For SSH, allow only the necessary management source.
3. In EC2 → Instances → Actions → Security → Modify IAM role, attach an approved monitoring role if needed.

## Check
The instance runs and the agent publishes configured metrics. Instance security does not replace JWT authorization on the HTTP API.

[EC2 security groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)

## Connectivity troubleshooting

| Issue | Check |
|---|---|
| Cannot connect | EC2 Connect, instance profile, SSM Agent, routing and outbound access |
| CPU present, RAM missing | CloudWatch Agent, metric publishing role, namespace/dimensions |
| Broad SSH rule | Security group inbound rules; restrict administration sources or remove unused rule |

Do not grant account administration rights to EC2 just for metrics. Mask private administrative addresses in public screenshots.

## Network rules

| Field | Value to verify |
|---|---|
| Inbound | No rules (theo ảnh nhóm / team screenshot) |
| Outbound | All traffic (ảnh nhóm / team screenshot) |
| SSH TCP 22 | Không mở công khai / Do not expose publicly |
| EC2 IAM role | CloudWatchAgentServerPolicy; SSM policy nếu dùng / if used |

Compare these values with existing resources; do not duplicate or modify working resources solely to match the lab.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

EC2 → Security Groups → netmon-ec2-sg → Inbound rules. The screenshot shows no inbound rules; do not expose SSH.

{{< photo src="workshop/aws-console/16-netmon-ec2-sg-inbound-no-rules.png" alt="EC2 → Security Groups → netmon-ec2-sg → Inbound rules. The screenshot shows no inbound rules; do not expose SSH." caption="Configuration evidence from the team." >}}

### Step 2

Open Outbound rules: the team used All traffic; restrict according to connectivity requirements in production.

{{< photo src="workshop/aws-console/17-netmon-ec2-sg-outbound-all-traffic.png" alt="Open Outbound rules: the team used All traffic; restrict according to connectivity requirements in production." caption="Configuration evidence from the team." >}}

