+++
title = "5.6.5. Monitoring and infrastructure topology"
weight = 5
translationKey = "ws-frontend-monitoring"
+++

## Monitor CPU and memory

1. Open Monitoring and check each device's metric source. EC2 needs the correct Instance ID and CloudWatch access; memory requires the CloudWatch Agent and actual namespace. SIMULATED devices use the simulator cadence.
2. Select an EC2 instance in the history panel and change the period from 15 minutes to 24 hours. The API reuses `GET /metrics` with history parameters; no additional API route is needed. If metrics are missing, inspect sample timestamps and agent status rather than interpreting missing data as 0% utilization.
3. Change the period and observe the chart. Demo mode cannot verify live EC2 measurements.

## Infrastructure topology

Open Infrastructure Diagram and filter by name or status. Device nodes are grouped by type and monitoring source; select a node for details. Lines illustrate management relationships, not a physical topology discovered through SNMP.

## Verification
Compare EC2 CPU with CloudWatch sample timestamps and verify memory separately. Use the simulator to observe lab device updates.

## EC2 history query

With authorized login, changing the window invokes a path such as `GET /metrics?historyMinutes=60&instanceId=INSTANCE_ID`. Valid windows are 15–1440 minutes and the instance must be registered. Try 15 minutes, 1 hour and 24 hours, comparing timestamps and resolution with CloudWatch. For missing data, inspect the real source and Lambda logs rather than writing fabricated CPU/RAM to the EC2 device item.

Select a device node and filter its status on the topology page. Grouping is attribute-based and does not imply measured physical links.

## Lab: select a chart source and time range

1. Open **Performance & Metrics** → CPU/RAM trend. Select the linked EC2 instance as the chart source.
2. Select one hour or a custom range of 15–1440 minutes, then request AWS history. Read the CPU/RAM sample counts and fetch time. Basic CPU monitoring commonly samples at five minutes; the RAM agent may sample every minute. Unequal counts alone do not indicate failure.

3. Switch to **Device average – browser samples**. This history is sampled locally; it is not an EC2 CloudWatch query. Do not use it as proof of CloudWatch values.

## Troubleshoot an empty EC2 chart

- In DevTools → Network, filter `/metrics?historyMinutes=`. Check the successful response, matching `instanceId`, `history` array and valid timestamps.
- In CloudWatch Metrics, compare `AWS/EC2` → `CPUUtilization` and `NetMon/EC2` → `mem_used_percent` for the same instance, time and period.
- For 401/403, check Cognito session and read scope. For server errors, inspect `netmon-api` logs. If samples arrive but the chart remains empty, inspect the JavaScript console and `metrics-chart` before altering AWS.
- Do not convert `null` to 0% or mix browser samples into actual EC2 history. The screenshots show UI states at capture time, not proof that the EC2 chart was fully rendered.

**Related interface screenshots:** [CPU and RAM monitoring](../../#netmon-metrics).
