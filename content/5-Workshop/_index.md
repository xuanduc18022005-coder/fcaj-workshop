+++
title = "5. Workshop"
weight = 5
translationKey = "workshop"
+++

This workshop guides the deployment of **NetMon Cloud – a serverless AWS network infrastructure management and monitoring system for small and medium enterprises**. The chapters below cover infrastructure configuration, integration and testing, followed by the system interface screenshots.

## Workshop contents

- [5.1. Overview](5-1-overview/)
- [5.2. Environment preparation and Region](5-2-preparation/)
- [5.3. Design VPC and EC2 infrastructure](5-3-infrastructure/)
- [5.4. CloudWatch, SNS and EventBridge](5-4-monitoring/)
- [5.5. Lambda, DynamoDB and API Gateway](5-5-serverless/)
- [5.6. Cognito, JWT and frontend](5-6-auth-frontend/)
- [5.7. End-to-end testing and cleanup](5-7-testing-cleanup/)

## Lab execution order

After 5.1–5.3, create tables and Lambda functions in 5.5.1–5.5.2 before enabling Scheduler/Streams in 5.4.3–5.4.4. Configure metrics/SNS in 5.4.1–5.4.2 independently; create the HTTP API in 5.5.3 and complete Cognito/JWT in 5.6.1–5.6.3. Then test the interface and scenarios, and clean up only when the team approves.

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
