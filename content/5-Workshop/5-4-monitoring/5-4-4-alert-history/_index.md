+++
title = "5.4.4. DynamoDB Streams and alert history"
weight = 4
translationKey = "ws-3-4"
+++

## Prerequisites
Complete the tables in 5.5.1 and the SNS topic in 5.4.2 before enabling triggers. `netmon-device-monitor.py` and `netmon-audit-writer.py` are in `AWS_BACKEND_CODE`.

## Configure the alert processing pipeline
1. DynamoDB → NetworkDevices → Exports and streams → enable DynamoDB Streams with **New and old images**. Preserve an existing stream if configured.
2. Create or reuse Python functions `netmon-device-monitor` and `netmon-audit-writer`; upload the corresponding source and configure the correct file name and handler. Assign least-privilege stream-read and destination-table permissions; the monitor also reads NetworkSettings, updates alarm flags and publishes to SNS when configured.
3. Lambda → Add trigger → DynamoDB → select the NetworkDevices stream. Create an event source mapping for each function. Use Latest if only new changes should be processed. Check that triggers are Enabled, configure retries and monitor errors before testing.
4. `netmon-device-monitor` reads CPU/RAM thresholds from the `thresholds` item (default 80 if unconfigured). It compares values strictly **above** the threshold, excludes EC2/CloudWatch and offline devices, and uses `simCpuAlarmActive` and `simRamAlarmActive` flags to reduce duplicate alerts while values remain high. It stores alerts in NetworkAlerts and publishes SNS when configured.

{{< photo src="workshop/alert-flow.svg" alt="Logical alert and notification flow." caption="Logical alert and notification flow." >}}

## Device audit history

The audit writer handles INSERT/MODIFY/REMOVE, decodes OldImage/NewImage and stores records in `NetworkAuditLogs` with `logType=DEVICE` and an `eventKey` made from the timestamp and eventID. Only changed business fields are logged; internal flags are excluded. `expiresAt` specifies 30-day retention only if table TTL is enabled. Streams do not include actual user identity, so actor may be Unknown.

## Verification

Update a lab simulated device and inspect CloudWatch Logs, NetworkAlerts and NetworkAuditLogs. Open the UI after JWT is configured. EC2 CloudWatch alarms have their own history; not every EC2 email belongs in NetworkAlerts.

[AWS Lambda and DynamoDB Streams documentation](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html)

## Inspect both event source mappings

Open Configuration → Triggers in each Lambda. Monitor and audit writer need enabled mappings from the same NetworkDevices stream and appropriate independent execution roles. Check CloudWatch logs and the audit table's `logType` + `eventKey` composite key. Enable TTL on `expiresAt` only if it agrees with the retention policy and required records are preserved.

A crossing can produce an alert, but consecutive above-threshold updates may not produce additional email because of deduplication flags. Returning to normal and crossing again is a new case. Distinguish `alarmState` from `handlingStatus`.


**Related interface screenshots:** [System history](../../#netmon-logs).

## Event source mapping fields

| Field | Value to verify |
|---|---|
| Source | NetworkDevices DynamoDB Stream |
| Stream view type | NEW_AND_OLD_IMAGES |
| Function | netmon-device-monitor / netmon-audit-writer |
| Starting position | LATEST (lab mới / new lab) |
| Enable trigger | Yes |
| Batch size | 10 (đề xuất / suggested; đối chiếu thực tế / verify) |

Compare these values with existing resources; do not duplicate or modify working resources solely to match the lab.
