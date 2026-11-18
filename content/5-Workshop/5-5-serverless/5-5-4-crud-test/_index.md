+++
title = "5.5.4. Test CRUD and data retrieval"
weight = 4
translationKey = "ws-4-4"
+++

## Steps
After creating the API, use Lambda Test before exercising protected HTTP routes. Use an isolated ID such as `LAB-CRUD-01`; do not change or delete the live EC2 device.

| Test | Expected outcome |
|---|---|
| GET `/devices` | JSON list |
| POST `/devices` | Create a valid test device |
| GET `/devices/LAB-CRUD-01` | Device details |
| PUT `/devices/LAB-CRUD-01` | Record updated |
| DELETE `/devices/LAB-CRUD-01` | Only test item deleted |

Check DynamoDB Explore table items and inspect CloudWatch Logs on failure. After Cognito and JWT are configured in chapter 5.6, repeat via the UI to verify read/write access. Do not disable JWT to work around 401/403 errors.

## Expected result
CRUD is reflected in DynamoDB and the UI, with invalid data handled. These are expected outcomes, not verified live AWS results.

## Lambda Test events (not JWT tests)

Create a lab item with an unused ID using the Test tab of `netmon-api`:

```json
{"requestContext": {"http": {"method": "POST"}}, "rawPath": "/devices", "body": "{\"deviceId\":\"LAB-CRUD-01\",\"deviceName\":\"Switch Lab\",\"deviceType\":\"Switch\",\"ipAddress\":\"10.0.0.20\",\"location\":\"Lab\"}"}
```

The project initializes simulated CPU/RAM if omitted. Expect 201 and `metricsSource=SIMULATED`. Read and update the item:

```json
{"requestContext":{"http":{"method":"GET"}},"rawPath":"/devices/LAB-CRUD-01"}
```

```json
{"requestContext": {"http": {"method": "PUT"}}, "rawPath": "/devices/LAB-CRUD-01", "body": "{\"deviceName\":\"Switch Lab Updated\"}"}
```

Keep this item for simulation and alert tests, then DELETE only the confirmed lab ID. Expect 400 for an invalid payload. Lambda Test bypasses API Gateway and therefore is not evidence of JWT authorization.

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

Lambda → Test: select the GET devices event and run Test; inspect Execution result.

{{< photo src="workshop/aws-console/35-lambda-netmon-api-test-succeeded-details-collapsed.png" alt="Lambda → Test: select the GET devices event and run Test; inspect Execution result." caption="Configuration evidence from the team." >}}

**Related interface screenshots:** [Device management](../../#netmon-devices).
