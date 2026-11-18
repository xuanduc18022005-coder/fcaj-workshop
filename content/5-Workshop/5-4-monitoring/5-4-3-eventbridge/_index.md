+++
title = "5.4.3. EventBridge Scheduler and device simulation"
weight = 3
translationKey = "ws-3-3"
+++

## Objective
Automatically update CPU/RAM for devices with `metricsSource=SIMULATED`, without overwriting EC2 metrics.

## Implementation steps

1. Complete the `NetworkDevices` and `NetworkSettings` tables in [5.5.1](../../5-5-serverless/5-5-1-dynamodb/). Create or open the `netmon-simulator` Lambda, using `netmon-simulator-deploy.zip` in `AWS_BACKEND_CODE`. Verify its handler and role permissions to read settings, scan devices and update the correct table.
2. Open Amazon EventBridge → Scheduler → Schedules → Create schedule. Use a name such as `netmon-simulator-schedule`, `rate(1 minute)` and Flexible time window = Off. Set the target to AWS Lambda → `netmon-simulator`, with payload `{}` and an execution role allowed to invoke that function. Reuse existing schedules.
3. In DynamoDB, verify `settingKey=simulation`, with `intervalMinutes` as a Number from 1–60 (default 5). Scheduler invokes every minute; the function updates only due devices based on `lastSimulatedAt`. The code scans up to 100 eligible simulated devices per run.
4. In Lambda → Test, use the read-only event below to preview due devices. Do not use test events as the Scheduler payload.

```json
{"dryRun": true}
```

5. To test alerts, select a lab device (replace the ID). `forcePeak` generates random values between 90 and 97%, so configure a threshold below 90 for a deterministic breach. After testing, run `forceNormal` separately to restore values to 25–45%.

```json
{"deviceId":"LAB-CRUD-01","forcePeak":true}
```

## Verification

Inspect the function's CloudWatch Logs and Explore table items for `cpuUsage`, `memoryUsage`, and `lastSimulatedAt`. Check alerts after configuring the stream triggers in 5.4.4. Demo changes do not prove live EC2 monitoring.

[EventBridge Scheduler documentation](https://docs.aws.amazon.com/scheduler/latest/UserGuide/getting-started.html)

## Test scenarios

| Test event | Purpose |
|---|---|
| `{"dryRun":true}` | Preview due devices without writes |
| `{"deviceId":"LAB-CRUD-01","forceRun":true}` | Refresh only the lab device |
| `{"deviceId":"LAB-CRUD-01","forcePeak":true}` | Generate CPU/RAM in the 90–97% range |
| `{"deviceId":"LAB-CRUD-01","forceNormal":true}` | Return values to 25–45% |

Check the enabled schedule, target and role. If invoked but updated=0, inspect due, skippedInterval and metricsSource; if not invoked, investigate the schedule and permissions. Avoid duplicate one-minute schedules.

## Screenshots and supporting evidence

{{< photo src="workshop/evidence/04_EventBridge_chu_ky_1_phut.png" alt="EventBridge schedule configured for a one-minute interval." caption="User-provided AWS screenshot. EventBridge schedule configured for a one-minute interval." >}}

{{< photo src="workshop/evidence/08_Lambda_GET_simulation_config.png" alt="Lambda simulation configuration response." caption="User-provided AWS screenshot. Lambda simulation configuration response." >}}

## Scheduler fields

| Field | Value to verify |
|---|---|
| Schedule pattern | rate(1 minute) |
| Flexible time window | Off |
| Target | AWS Lambda → netmon-simulator |
| Payload | `{}` |
| State | Enabled |
| Execution role | lambda:InvokeFunction → netmon-simulator |

Compare these values with existing resources; do not duplicate or modify working resources solely to match the lab.
