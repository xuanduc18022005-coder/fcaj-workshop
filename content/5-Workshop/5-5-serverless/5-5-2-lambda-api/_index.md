+++
title = "5.5.2. Deploy the netmon-api Lambda"
weight = 2
translationKey = "ws-4-2"
+++

## Functions in the source

| Function | Responsibility |
|---|---|
| netmon-api | CRUD, metrics, alerts, settings, logs and SNS status |
| netmon-simulator | Periodic simulated CPU/RAM updates |
| netmon-device-monitor | Analyze device changes, write alerts and send SNS |
| netmon-audit-writer | Record stream INSERT/MODIFY/REMOVE events |

## Steps

1. Create Python Lambda functions or reuse existing ones. Deploy the matching `netmon-api-deploy.zip` and `netmon-simulator-deploy.zip` from AWS_BACKEND_CODE. Package monitor/audit writer separately if needed. Check that handler `lambda_function.lambda_handler` matches the packaged module.
2. Create execution roles for CloudWatch Logs and only the required tables, metrics, streams or SNS. Source IAM policies are examples: verify ARNs first.
3. Configure relevant environment variables: `DEVICES_TABLE`, `ALERTS_TABLE`, `SETTINGS_TABLE`, `AUDIT_LOGS_TABLE`, `SNS_TOPIC_ARN` and `CORS_ORIGIN`.
4. Configure the simulator and stream processors in 5.4.3 and 5.4.4 once the tables exist. Do not create duplicate triggers or schedules.
5. Test the API GET in Lambda using this event in an authorized lab.

```json
{"requestContext":{"http":{"method":"GET"}},"rawPath":"/devices"}
```

## Review permissions by function

| Function | Required business permissions to review |
|---|---|
| netmon-api | Required table CRUD; CloudWatch and SNS status reads |
| netmon-simulator | Scan/UpdateItem NetworkDevices, GetItem NetworkSettings |
| netmon-device-monitor | Stream/settings reads, device flags, alert writes and SNS Publish |
| netmon-audit-writer | Stream reads and NetworkAuditLogs writes |

Each function needs CloudWatch Logs permissions. Do not apply sample policies with unverified ARNs.

## Verification

Expect statusCode 200, a JSON body and no permission error in Logs. Use a separate test device for simulation; never force actual EC2 readings. [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) · [EventBridge Scheduler](https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html).

## Environment and deployment packages

| Variable | Example |
|---|---|
| DEVICES_TABLE | NetworkDevices |
| ALERTS_TABLE | NetworkAlerts |
| SETTINGS_TABLE | NetworkSettings |
| AUDIT_LOGS_TABLE | NetworkAuditLogs |
| CORS_ORIGIN | http://localhost:5500 |
| SNS_TOPIC_ARN | private environment topic ARN |

Create a Lambda with a supported Python runtime and approved role. Under Code → Upload from → .zip file, upload the corresponding package. For the monitor/audit Python files, package as root-level `lambda_function.py` or configure the correct module handler. Set the relevant environment variables, save and use the tests in 5.5.4. Inspect Monitor → View CloudWatch logs on errors.

Do not redeploy a working function solely because the UI changed. Never embed AWS credentials in packages.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Lambda → netmon-api → Code: compare function code and the API Gateway trigger.

{{< photo src="workshop/aws-console/34-lambda-netmon-api-code-and-api-gateway.png" alt="Lambda → netmon-api → Code: compare function code and the API Gateway trigger." caption="Configuration evidence from the team." >}}

### Step 2

Lambda → Monitor → View CloudWatch logs: inspect /aws/lambda/netmon-api and log streams.

{{< photo src="workshop/aws-console/36-cloudwatch-logs-netmon-api-6-streams.png" alt="Lambda → Monitor → View CloudWatch logs: inspect /aws/lambda/netmon-api and log streams." caption="Configuration evidence from the team." >}}

