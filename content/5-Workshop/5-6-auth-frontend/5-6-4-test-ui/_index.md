+++
title = "5.6.4. Connect the interface and manage devices"
weight = 4
translationKey = "ws-5-3"
+++

## Frontend setup

1. Extract the NetMon Cloud topology and pagination archive. Open the directory containing `index.html` in VS Code; install Live Server if necessary.
2. Verify the Cognito domain, App Client ID, API Invoke URL and callback in `auth.js`. Keep `http://localhost:5500/`; reuse working resources. Open the browser at that address and complete sign-in in 5.6.3 before using the live API.
3. Open Overview to see total devices, online/offline status and alerts. Check the AWS or DEMO mode badge before interpreting metrics.

## Device management

1. Open Device Management → Add Device. Enter a unique lab ID, name, type, IP, location and source. Use SIMULATED for a simulated switch/router; use CloudWatch with the correct EC2 Instance ID for a monitored instance.
2. Save, inspect the list and open device details. Search and edit/delete lab records only. The latest UI supports 10/20/50 rows per page and page navigation.
3. In AWS mode, compare changes with DynamoDB NetworkDevices. Demo mode uses browser data; it does not establish that the live API works.

## Verification

Confirm that records are saved and the correct device is searched and updated. For connection errors, inspect DevTools → Network, 401/403/5xx responses and CloudWatch Logs. Do not disable authentication to fix errors.

## Interface exercise

| Action | Verify |
|---|---|
| Add Switch Lab | POST /devices → NetworkDevices item |
| Inspect details | GET /devices/{id} or loaded data |
| Change name/location | PUT /devices/{id} → updated attributes |
| Search and filter | results on the loaded dataset |
| Delete the lab record | DELETE /devices/{id} → item removed |

Capture Overview and Devices after loading data without exposing internal endpoints. Existing workshop screenshots are demos, not proof of successful live AWS tests.

## Register a real EC2 instance

1. In the EC2 console in `us-east-1`, obtain the ID of the existing running instance. Do not launch another instance unnecessarily.
2. In Lambda `netmon-api` → Configuration → Permissions → Execution role, verify `ec2:DescribeInstances` against `IAM-netmon-api-EC2-READ.json`; retain existing CloudWatch and DynamoDB permissions. If the old API lacks EC2 validation, back up its code and check environment settings before deploying the new package.
3. In NetMon, open Device management → Add device → **EC2 (AWS actual)**. Enter a unique device ID, name and instance ID; leave IP blank if private IP discovery is desired. Do not enter CPU/RAM manually.
4. Save, reload the list and open Performance & Metrics. The API validates the instance in the Lambda account/Region and checks duplicates. Deleting the NetMon record does not terminate EC2.
5. If RAM is absent, inspect the CloudWatch Agent and `NetMon/EC2` namespace as in section 5.4.1. Do not replace missing real values with simulation data.

**Verification:** NetworkDevices contains the correct instance ID; CPU/RAM show CloudWatch as the source when samples exist. Demo images are not evidence of successful live deployment.

**Related interface screenshots:** [Device management](../../#netmon-devices).
