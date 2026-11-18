+++
title = "5.6.6. Alerts, logs and settings"
weight = 6
translationKey = "ws-frontend-operations"
+++

## Alerts and incidents

1. Open Alerts & Incidents, check the source, and filter by status and severity. Acknowledge or resolve a lab alert.
2. Select the current page, navigate pages and resolve selected alerts. Acknowledge all applies to the loaded new alerts. Write operations require a token with `netmon-api/write`.

## History logs

Open Logs and inspect device, alert and activity tabs. The current source loads up to 100 records through GET `/logs` and up to 200 browser activity records. Search and 10/20/50-row pagination operate on the loaded dataset, not the complete DynamoDB table.

## System settings

Open Settings. Set independent CPU/RAM thresholds and a 1–60 minute simulation cadence; verify save permissions and SNS status. Simulation cadence differs from frontend refresh frequency. SNS status reads configuration and subscriptions; it does not prove email delivery. Restore the original thresholds after testing.

## Verification

Trigger a threshold breach on a lab device and restore normal values; compare alerts, handling status, history and actual email if available. Do not alter production alert thresholds or schedules without agreement.

## Verify API actions and saved values

| Feature | API or data source |
|---|---|
| Alert list | GET /alerts → NetworkAlerts |
| Acknowledge | PUT /alerts/{id}, `{"handlingStatus":"Acknowledged"}` |
| Resolve | PUT /alerts/{id}, `{"handlingStatus":"Resolved"}` |
| Device history | GET /logs → NetworkAuditLogs |
| CPU/RAM thresholds | PUT /settings, `{"cpuThreshold":80,"ramThreshold":80}` (integers 1–99) |
| Simulation interval | PUT /simulation/config, `{"intervalMinutes":5}` (1–60 minutes) |
| SNS status | GET /sns/status (read only) |

Change shared thresholds/intervals only with team approval. Reload and check the two NetworkSettings records. Try 10/20/50 rows in History; browser activity logs do not imply server-side actor identification. Restore initial settings after testing.

## Distinguish the metrics settings

| Setting | Meaning | Verification |
|---|---|---|
| UI refresh interval | Off or refresh every 30/60/120 seconds | Observe GET /devices and /metrics; simulation frequency is unchanged |
| CPU/RAM simulation interval | 1–60 minutes, saved through the API | Read GET /simulation/config and inspect scheduler and simulator logs |
| CPU/RAM thresholds | Independent thresholds for exceedance | Read GET /settings and compare separate EC2 alarms |
| EC2 history window | 15–1440 minutes, keyed by instance ID | Compare CloudWatch over the same window |
| Popup notifications | Browser presentation control | Does not enable or disable AWS SNS actions |

If the backend is working, UI-only changes do not require Lambda redeployment. Before changing AWS settings, verify permissions and record previous values. Restore the team's agreed configuration after testing.

**Related interface screenshots:** [Alerts and incident handling](../../#netmon-alerts) · [System settings and SNS](../../#netmon-settings).
