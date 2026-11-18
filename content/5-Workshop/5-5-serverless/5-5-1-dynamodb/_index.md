+++
title = "5.5.1. Create DynamoDB tables"
weight = 1
translationKey = "ws-4-1"
+++

## Table design

| Table | Partition key (String) | Sort key |
|---|---|---|
| NetworkDevices | deviceId | — |
| NetworkAlerts | eventId | — |
| NetworkSettings | settingKey | — |
| NetworkAuditLogs | logType | eventKey (String) |

## Steps

1. Open DynamoDB → Tables → Create table and use the names and keys above. Consider on-demand billing for test workloads; check cost.
2. In NetworkDevices, use Explore table items or POST to create a test device. Record deviceName, deviceType, ipAddress, location, status, cpuUsage, memoryUsage and metricsSource.
3. Enable Streams with New and old images on NetworkDevices for the monitor and audit writer.
4. NetworkSettings uses `settingKey=thresholds` and `settingKey=simulation` for threshold and interval configuration.

Example logical JSON (not the console's typed JSON format):

```json
{"deviceId":"TEST001","deviceName":"Switch Lab","deviceType":"Switch","ipAddress":"10.0.0.10","status":"ONLINE","metricsSource":"SIMULATED","cpuUsage":45,"memoryUsage":60}
```

## Verification

Read the item back and verify its keys. Do not delete existing data. [DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html).

## Default configuration

In Explore table items → Create item, use these two logical JSON objects in `NetworkSettings`; numeric values must be Numbers, not strings. The console may require typed DynamoDB JSON.

```json
{"settingKey":"thresholds","cpuThreshold":80,"ramThreshold":80}
```

```json
{"settingKey":"simulation","intervalMinutes":5}
```

Confirm all four tables are Active and keys are Strings. Read existing configuration instead of overwriting live thresholds. The audit table requires `eventKey` in addition to `logType`.

**Evidence:** four-table inventory, key schema and a sanitized test item.

## Screenshots and supporting evidence

{{< photo src="workshop/evidence/02_DynamoDB_NetworkSettings.png" alt="NetworkSettings table in DynamoDB Console." caption="User-provided AWS screenshot. NetworkSettings table in DynamoDB Console." >}}

## AWS Console walkthrough and evidence

The following screenshots come from the same NetMon team’s project report at the time of implementation; they are not newly captured. Verify resource names and current state in AWS.

### Step 1

DynamoDB → Tables → NetworkDevices → Explore table items. Inspect deviceId and device records at the time of capture.

{{< photo src="workshop/aws-console/33-dynamodb-networkdevices-2-items.png" alt="DynamoDB → Tables → NetworkDevices → Explore table items. Inspect deviceId and device records at the time of capture." caption="Configuration evidence from the team." >}}

### Step 2

Open NetworkAlerts → Explore table items; check saved alert records.

{{< photo src="workshop/aws-console/32-dynamodb-networkalerts-7-items.png" alt="Open NetworkAlerts → Explore table items; check saved alert records." caption="Configuration evidence from the team." >}}

