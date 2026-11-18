+++
title = "5.7.1. End-to-end system testing"
weight = 1
translationKey = "ws-6-1"
+++

## Test scenarios

| Step | Expected outcome |
|---|---|
| Cognito login | API accepts valid token and scope only |
| Create, update and delete test device | DynamoDB reflects changes |
| EC2 | CloudWatch CPU and RAM if agent works |
| Simulated device | CPU/memory change on simulator schedule |
| Test device exceeds threshold | New alert; SNS if enabled |
| Acknowledge and resolve | Alert status updates |
| Logs and pagination | Search and 10/20/50-row pages over loaded data |

## Record outcomes
Mark each case passed, failed or untested; save screenshots with tokens, IDs and personal data redacted. Offline demo does not establish a live integration pass. Topology lines describe logical management relationships, not physical network discovery.

## Live-test results worksheet

| ID | Action | Evidence | Result |
|---|---|---|---|
| T01 | Sign in and read data | HTTP 200, token masked | Pending |
| T02 | POST/GET/PUT/DELETE lab item | DynamoDB before/after | Pending |
| T03 | Simulator dryRun and forcePeak | logs, lastSimulatedAt | Pending |
| T04 | Cross threshold then recover | NetworkAlerts, email if enabled | Pending |
| T05 | Read EC2 CPU/RAM/history | CloudWatch and chart | Pending |
| T06 | Acknowledge/resolve, audit | handlingStatus, NetworkAuditLogs | Pending |
| T07 | Missing token/scope | 401/403 | Pending |
| T08 | Search, topology and pagination | UI capture | Pending |

Record Pass/Fail after running each case along with timestamps, source and observed errors. The final demonstration should prioritize sign-in → management → simulation → alert → acknowledgment → history.

## Additional test matrix for the Metrics Configuration version

| Test | Action | Acceptance criterion |
|---|---|---|
| EC2-01 | Register a valid existing instance ID in the Region | API records CLOUDWATCH source without launching EC2 |
| EC2-02 | Try an unknown or already registered ID | Request rejected, no duplicate record |
| MET-01 | Request 15-minute, one-hour and 24-hour history | Timestamped samples, no conversion of null to zero |
| MET-02 | Switch CloudWatch and browser samples | Correct source label and time range |
| SIM-01 | Set a simulation interval for lab devices | Successful save, check simulator logs and update timestamps |
| UI-01 | Change filter and 10/20/50-row pagination | Correct rows and selection for the loaded dataset |
| AUTH-01 | Call API without token or with missing scope | Request rejected; JWT remains enabled |

The supplied screenshots show a one-hour history response with 12 CPU and 59 RAM samples and a plotted browser-sample chart. Other tests require live account execution before marking them passed.

