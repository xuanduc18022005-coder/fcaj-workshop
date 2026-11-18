+++
title = "5.3.2. Launch an Ubuntu EC2 instance"
weight = 2
translationKey = "ws-2-2"
+++

## Steps

1. Open EC2 → Instances → Launch instances. Example name: `netmon-ec2-server`; choose Ubuntu, instance type and EBS suitable for the budget.
2. Select the prepared VPC/subnet and security group. For Session Manager, ensure the SSM agent, instance profile and service connectivity are configured.
3. Attach an IAM role with the minimum CloudWatch agent permissions; do not place access keys on the server or frontend.
4. Start the instance, verify Running and status checks. Register its instance ID in NetMon with the CloudWatch source. Install the agent in step 5.4.1.

## Verification

EC2 is running and CPU data appears in CloudWatch; RAM requires the agent. Use actual identifiers only in private configuration.

Reference: [Getting started with EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html).

## Launch-instance settings

- Name: `netmon-ec2-server` (example); Application and OS Images: Ubuntu Server 24.04 LTS.
- Choose an instance type within budget (for example t3.micro); edit Network settings to select the team VPC, subnet and security group.
- Choose needed EBS storage; retained volumes may still incur charges. Under Advanced details, select the approved IAM instance profile for the agent if needed.
- After launch, inspect Details, Monitoring, status checks and CPU data before changing the agent.

If using Session Manager, confirm Connect → Session Manager works. Reuse the existing EC2 instance when possible.

## Deployment parameters

| Field | Value to verify |
|---|---|
| Name | netmon-ec2-server |
| AMI | Ubuntu Server 24.04 LTS |
| Instance type | t3.micro |
| VPC | netmon-vpc |
| Subnet | netmon-subnet-public1-us-east-1a |
| Security group | netmon-ec2-sg |
| IAM instance profile | CloudWatch Agent / SSM nếu cần / if needed |

Compare these values with existing resources; do not duplicate or modify working resources solely to match the lab.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

EC2 → Instances: select netmon-ec2-server and check instance state and status checks.

{{< photo src="workshop/aws-console/18-ec2-instances-netmon-list.png" alt="EC2 → Instances: select netmon-ec2-server and check instance state and status checks." caption="Configuration evidence from the team." >}}

### Step 2

Open Details: check name, instance type, VPC and subnet; copy the instance ID into private NetMon configuration.

{{< photo src="workshop/aws-console/19-ec2-netmon-ec2-server-details.png" alt="Open Details: check name, instance type, VPC and subnet; copy the instance ID into private NetMon configuration." caption="Configuration evidence from the team." >}}

