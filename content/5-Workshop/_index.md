---
title: "5. Workshop"
date: 2026-11-11T00:00:00+07:00
draft: false
weight: 5
translationKey: "workshop"
---

> Shared NetMon Cloud team workshop, based on [Nguyen Tung Duong's report](https://tunduncode.github.io/nguyentungduong-fcj-report/5-workshop/). Screenshots and configurations reflect different implementation stages.

## Overview

NetMon is an SME network infrastructure management and monitoring system on AWS, combining EC2 infrastructure with serverless services. This workshop follows the team's implementation in `us-east-1`, from account preparation, networking, and metric collection to API design, authentication, interface operation, and testing.

## Architecture and system operation

| Component | Role |
|---|---|
| VPC, Subnet, Security Group, EC2 | Network infrastructure and the monitored Ubuntu server |
| CloudWatch and CloudWatch Agent | Collect EC2 CPU, memory, disk, and traffic metrics |
| SNS | Send alert notifications by email |
| EventBridge and Lambda | Route alarm state changes and store event history |
| DynamoDB | Store devices and alert events |
| API Gateway and Lambda | Provide management, metric retrieval, and alert handling APIs |
| Cognito | Authenticate users and issue access tokens |
| HTML, CSS, JavaScript | Provide the NetMon interface and display data |

**Management flow:** The browser authenticates with Cognito, then sends its JWT to API Gateway → Lambda → DynamoDB. Lambda also reads CloudWatch when retrieving EC2 metrics.

**EC2 monitoring flow:** EC2/CloudWatch Agent → CloudWatch → Alarm. The alarm sends notifications to SNS; state-change events are separately routed by EventBridge to Lambda for persistence in DynamoDB.

**Simulation flow:** Routers, switches, and devices without live collectors are represented by simulated data. CPU, memory, and status change according to simulation logic; automatic alert generation and SNS delivery depend on the deployed monitor and trigger schedule. Simulated values are not physical-device measurements.

## Workshop outcomes

- Manage, search, and inspect devices using CRUD.
- Monitor CPU, memory, and EC2 traffic while distinguishing live and simulated sources.
- Inspect and handle alerts, review logs, and check AWS connectivity.
- Protect APIs with JWT, restrict permissions, and control costs.

## Hands-on chapters

1. [5.1. Overview](5-1-overview/)

2. [5.2. Environment Preparation & Region](5-2-preparation/)
   - [5.2.1. AWS Sign-in and Region](5-2-preparation/5-2-1-region-budget/)
   - [5.2.2. IAM Setup and Team Roles](5-2-preparation/5-2-2-iam/)
   - [5.2.3. AWS Budgets and Cost Controls](5-2-preparation/5-2-3-budget/)

3. [5.3. VPC and EC2 Infrastructure](5-3-infrastructure/)
   - [5.3.1. Create a VPC, Subnets, Routes, and IGW](5-3-infrastructure/5-3-1-vpc/)
   - [5.3.2. Launch an Ubuntu EC2 Instance](5-3-infrastructure/5-3-2-ec2/)
   - [5.3.3. Security Groups, IAM Roles, and Safe Access](5-3-infrastructure/5-3-3-security/)

4. [5.4. CloudWatch, SNS, and EventBridge](5-4-monitoring/)
   - [5.4.1. Collect CPU, RAM, and Disk Metrics](5-4-monitoring/5-4-1-metrics/)
   - [5.4.2. Create CloudWatch Alarms and SNS Email](5-4-monitoring/5-4-2-alarms-sns/)
   - [5.4.3. Route Alarm Changes with EventBridge](5-4-monitoring/5-4-3-eventbridge/)
   - [5.4.4. Store Alert History with Lambda and DynamoDB](5-4-monitoring/5-4-4-alert-history/)

5. [5.5. Lambda, DynamoDB, and API Gateway](5-5-serverless/)
   - [5.5.1. Create NetworkDevices and NetworkAlerts Tables](5-5-serverless/5-5-1-dynamodb/)
   - [5.5.2. Build the netmon-api Python Lambda](5-5-serverless/5-5-2-lambda-api/)
   - [5.5.3. Build an HTTP API with Eight Routes](5-5-serverless/5-5-3-api-gateway/)
   - [5.5.4. Test CRUD and Data Queries](5-5-serverless/5-5-4-crud-test/)
   - [5.5.5. Device Simulation and Automated Monitoring](5-5-serverless/5-5-5-simulation/)

6. [5.6. Cognito, JWT, and the NetMon Interface](5-6-auth-frontend/)
   - [5.6.1. Create a Cognito User Pool and Web Client](5-6-auth-frontend/5-6-1-cognito/)
   - [5.6.2. Create a JWT Authorizer and OAuth Scopes](5-6-auth-frontend/5-6-2-jwt/)
   - [5.6.3. Build a VS Code Test Page](5-6-auth-frontend/5-6-3-test-ui/)
   - [5.6.4. Sign In with PKCE and Call Protected APIs](5-6-auth-frontend/5-6-4-frontend-login/)
   - [5.6.5. Operate the NetMon Management Interface](5-6-auth-frontend/5-6-5-netmon-interface/)

7. [5.7. End-to-End Tests and Resource Cleanup](5-7-testing-cleanup/)
   - [5.7.1. Test from the UI to CloudWatch/DynamoDB](5-7-testing-cleanup/5-7-1-e2e/)
   - [5.7.2. Review Costs and Preserve Evidence](5-7-testing-cleanup/5-7-2-cleanup/)
   - [5.7.3. Clean Up CloudWatch, SNS, and EventBridge](5-7-testing-cleanup/5-7-3-monitoring-cleanup/)
   - [5.7.4. Clean Up Lambda, DynamoDB, and API Gateway](5-7-testing-cleanup/5-7-4-serverless-cleanup/)
   - [5.7.5. Clean Up Cognito and Networking Resources](5-7-testing-cleanup/5-7-5-auth-cleanup/)

## Results and verification scope

The lab recorded VPC/EC2 configuration, three alarms, test SNS email delivery, EventBridge, DynamoDB data, the HTTP API, and the JWT authorizer. Lambda returned HTTP 200 in a device-list test and retrieved EC2 CPU, memory, NetworkIn, and NetworkOut. The local demo interface was tested for CRUD, simulated data, and alert handling.

For a live AWS demonstration, revalidate browser sign-in, CRUD, handling-status persistence, and automatic email delivery. Configuration screenshots or a local demo do not establish these outcomes. Network topology is illustrative; automatic physical router/switch discovery through SNMP has not been established.

Evidence screenshots reflect different implementation stages. Keep resources required for the project presentation until the demonstration is complete. Never publish credentials or tokens.

## NetMon Cloud interface

The major website features are illustrated by function below. Click an image to enlarge it. Twenty-four interface tests use a mock API and session; three previously supplied interface screenshots reflect their capture-time state. These images do not replace verification of AWS resources or live test results.

<span id="netmon-overview"></span>

### System overview

The dashboard summarizes devices, operational status and alerts for administrators.

{{< photo src="workshop/evidence/02_Tong_quan.png" alt="Overview and device counts." caption="Interface test – mock API. Overview and device counts." >}}


<span id="netmon-login"></span>

### Sign-in and authentication

Users authenticate before managing AWS data. The screen below shows the application before sign-in; Cognito and JWT configuration are covered in section 5.6.

{{< photo src="workshop/evidence/24_Man_hinh_chua_dang_nhap.png" alt="NetMon before sign-in; not the Cognito Hosted UI." caption="Interface test – mock API. NetMon before sign-in; not the Cognito Hosted UI." >}}


<span id="netmon-devices"></span>

### Device management

Administrators can search, view, add, edit and delete lab devices, and register EC2 using its instance ID. The list supports pagination.

{{< photo src="workshop/evidence/03_Quan_ly_thiet_bi.png" alt="Device list, search and pagination." caption="Interface test – mock API. Device list, search and pagination." >}}

{{< photo src="workshop/evidence/04_Xem_chi_tiet.png" alt="Device details view." caption="Interface test – mock API. Device details view." >}}

{{< photo src="workshop/evidence/05_Them_thiet_bi_mo_phong.png" alt="Add simulated device form (POST)." caption="Interface test – mock API. Add simulated device form (POST)." >}}

{{< photo src="workshop/evidence/06_Ket_qua_them_thiet_bi.png" alt="Device list after addition through the mock API." caption="Interface test – mock API. Device list after addition through the mock API." >}}

{{< photo src="workshop/evidence/07_Sua_thiet_bi.png" alt="Device update form (PUT)." caption="Interface test – mock API. Device update form (PUT)." >}}

{{< photo src="workshop/evidence/08_Ket_qua_xoa_thiet_bi.png" alt="Result of deleting a lab record (DELETE)." caption="Interface test – mock API. Result of deleting a lab record (DELETE)." >}}

{{< photo src="workshop/evidence/09_Form_dang_ky_EC2.png" alt="EC2 registration form with instance ID; not proof of AWS validation." caption="Interface test – mock API. EC2 registration form with instance ID; not proof of AWS validation." >}}


<span id="netmon-metrics"></span>

### CPU and RAM monitoring

Monitor device metrics and choose a chart source. EC2 history spans 15 minutes to 24 hours; browser samples are distinct from CloudWatch data.

{{< photo src="workshop/evidence/10_Giam_sat_EC2_va_thiet_bi.png" alt="Monitoring and performance page." caption="Interface test – mock API. Monitoring and performance page." >}}

{{< photo src="workshop/evidence/11_Bieu_do_tong_hop.png" alt="Browser-side device average chart." caption="Interface test – mock API. Browser-side device average chart." >}}

{{< photo src="workshop/evidence/12_Bieu_do_EC2_1_gio.png" alt="Mock one-hour history view." caption="Interface test – mock API. Mock one-hour history view." >}}

{{< photo src="workshop/evidence/13_Bieu_do_EC2_24_gio.png" alt="Mock 24-hour history view." caption="Interface test – mock API. Mock 24-hour history view." >}}

{{< photo src="workshop/evidence/05_EC2_CloudWatch_tren_web.png" alt="User-provided EC2 monitoring screen." caption="User-provided interface screenshot. User-provided EC2 monitoring screen." >}}

{{< photo src="workshop/evidence/07_Lich_su_EC2_1_gio.png" alt="One-hour EC2 history: inspect sample counts and chart; do not infer results from an empty plot." caption="User-provided interface screenshot. One-hour EC2 history: inspect sample counts and chart; do not infer results from an empty plot." >}}


<span id="netmon-alerts"></span>

### Alerts and incident handling

The system displays threshold alerts and supports selection, handling and status tracking.

{{< photo src="workshop/evidence/01_Popup_canh_bao.png" alt="Threshold alert popup when opening the interface." caption="Interface test – mock API. Threshold alert popup when opening the interface." >}}

{{< photo src="workshop/evidence/14_Canh_bao_va_phan_trang.png" alt="Alert list and pagination." caption="Interface test – mock API. Alert list and pagination." >}}

{{< photo src="workshop/evidence/15_Chon_canh_bao.png" alt="Selecting alerts for handling." caption="Interface test – mock API. Selecting alerts for handling." >}}

{{< photo src="workshop/evidence/16_Ket_qua_xu_ly_canh_bao.png" alt="Alert status after interacting with the mock API." caption="Interface test – mock API. Alert status after interacting with the mock API." >}}

{{< photo src="workshop/evidence/06_Canh_bao_tren_web.png" alt="User-provided alert list." caption="User-provided interface screenshot. User-provided alert list." >}}


<span id="netmon-topology"></span>

### AWS architecture and network topology

The interface presents architecture and device-management topology. These are logical diagrams, not VPC resource maps.

{{< photo src="workshop/evidence/17_Kien_truc_AWS.png" alt="AWS architecture tab in the interface." caption="Interface test – mock API. AWS architecture tab in the interface." >}}

{{< photo src="workshop/evidence/18_So_do_mang.png" alt="Logical NetMon network diagram; not a VPC resource map." caption="Interface test – mock API. Logical NetMon network diagram; not a VPC resource map." >}}


<span id="netmon-logs"></span>

### System history

History pages track device changes, alerts and administrative operations.

{{< photo src="workshop/evidence/19_Nhat_ky_thiet_bi.png" alt="Device change history." caption="Interface test – mock API. Device change history." >}}

{{< photo src="workshop/evidence/20_Nhat_ky_canh_bao.png" alt="Alert history." caption="Interface test – mock API. Alert history." >}}

{{< photo src="workshop/evidence/21_Nhat_ky_thao_tac.png" alt="Interface operation history." caption="Interface test – mock API. Interface operation history." >}}


<span id="netmon-settings"></span>

### System settings and SNS

Configure CPU/RAM thresholds and simulation intervals, and check SNS settings. The status screen does not establish actual email delivery.

{{< photo src="workshop/evidence/22_Cau_hinh_va_chu_ky.png" alt="Metric thresholds and update-cycle settings." caption="Interface test – mock API. Metric thresholds and update-cycle settings." >}}

{{< photo src="workshop/evidence/23_Kiem_tra_cau_hinh_SNS.png" alt="SNS configuration status; does not establish email delivery." caption="Interface test – mock API. SNS configuration status; does not establish email delivery." >}}
