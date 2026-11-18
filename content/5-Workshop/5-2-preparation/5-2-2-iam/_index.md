+++
title = "5.2.2. Set up IAM and team responsibilities"
weight = 2
translationKey = "ws-1-2"
+++

## Objective
Separate team and service permissions rather than sharing credentials.

## Steps
1. Review authorized IAM users or roles. Enable MFA and avoid daily use of the root user.
2. Nguyen Tung Duong handles VPC, EC2 and security; Tran Xuan Duc handles Lambda, DynamoDB and API Gateway; Le Manh Quan handles monitoring, UI and testing.
3. Create function-specific execution roles with only required service/table actions. Review the sample policies in `AWS_BACKEND_CODE` before applying them.
4. Use an EC2 instance profile for the CloudWatch agent where needed. Never embed AWS access keys in JavaScript.

## Check
Confirm that each member can perform authorized operations; review unnecessary broad permissions.

[IAM documentation](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

## Service permissions checklist

| Principal | Permissions to inspect |
|---|---|
| netmon-api | Read/write the relevant four tables, read CloudWatch metrics and SNS configuration |
| netmon-simulator | Read settings, scan and update NetworkDevices |
| netmon-device-monitor | Read streams/devices/thresholds, write alerts, update flags, sns:Publish |
| netmon-audit-writer | Read streams, write NetworkAuditLogs |
| EventBridge Scheduler | lambda:InvokeFunction on the simulator |
| EC2 | Instance profile for metrics and, if used, Session Manager |

For AccessDenied, identify the denied operation and resource in CloudWatch Logs and grant only the necessary permission. Lambda execution roles also require appropriate logging permissions.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Lambda → netmon-api → Configuration → Permissions: inspect the execution role; open the role in IAM.

{{< photo src="workshop/aws-console/53-lambda-netmon-api-execution-role-permissions.png" alt="Lambda → netmon-api → Configuration → Permissions: inspect the execution role; open the role in IAM." caption="Configuration evidence from the team." >}}

### Step 2

IAM → Roles → netmon-api role → Permissions: compare attached policies with the function responsibilities.

{{< photo src="workshop/aws-console/54-iam-netmon-api-role-permission-policies.png" alt="IAM → Roles → netmon-api role → Permissions: compare attached policies with the function responsibilities." caption="Configuration evidence from the team." >}}

