+++
title = "5.2.2. Cấu hình IAM và phân công nhóm"
weight = 2
translationKey = "ws-1-2"
+++

## Mục tiêu
Phân quyền riêng cho từng thành viên và từng dịch vụ, không dùng chung thông tin đăng nhập.

## Thực hiện
1. Mở IAM, kiểm tra user/role đã được cấp quyền. Bật MFA, tránh sử dụng root trong công việc thường ngày.
2. Phân công Nguyễn Tùng Dương phụ trách VPC, EC2 và bảo mật; Trần Xuân Đức phụ trách Lambda, DynamoDB, API Gateway; Lê Mạnh Quân phụ trách giám sát, giao diện và kiểm thử.
3. Tạo execution role cho mỗi Lambda; chỉ cấp thao tác với bảng và dịch vụ cần thiết. Đối chiếu các policy mẫu trong `AWS_BACKEND_CODE` trước khi áp dụng.
4. Với EC2, dùng instance profile cho CloudWatch Agent nếu cần. Không nhúng Access Key vào mã JavaScript.

## Kiểm tra
Xác nhận từng thành viên thao tác được trong phạm vi được phép; rà các quyền rộng không cần thiết.

[Tài liệu IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

## Bảng quyền theo vai trò dịch vụ

| Đối tượng | Quyền cần kiểm tra |
|---|---|
| netmon-api | Đọc/ghi đúng bốn bảng, đọc CloudWatch metrics, đọc SNS topic/subscription |
| netmon-simulator | Đọc cấu hình, Scan và UpdateItem NetworkDevices |
| netmon-device-monitor | Đọc Streams, đọc thiết bị/ngưỡng, ghi cảnh báo, cập nhật cờ, sns:Publish |
| netmon-audit-writer | Đọc Streams, ghi NetworkAuditLogs |
| EventBridge Scheduler | lambda:InvokeFunction đối với simulator |
| EC2 | Instance profile gửi metrics; Session Manager nếu sử dụng |

Khi gặp AccessDenied, tra CloudWatch Logs để xác định action và ARN bị từ chối, bổ sung quyền đúng phạm vi thay vì cấp AdministratorAccess. Tất cả execution role của Lambda cần quyền ghi log tương ứng.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Lambda → netmon-api → Configuration → Permissions: kiểm tra Execution role; nhấn tên role để mở IAM.

{{< photo src="workshop/aws-console/53-lambda-netmon-api-execution-role-permissions.png" alt="Lambda → netmon-api → Configuration → Permissions: kiểm tra Execution role; nhấn tên role để mở IAM." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

IAM → Roles → role của netmon-api → Permissions: đối chiếu các policy đã đính kèm với nhiệm vụ của hàm.

{{< photo src="workshop/aws-console/54-iam-netmon-api-role-permission-policies.png" alt="IAM → Roles → role của netmon-api → Permissions: đối chiếu các policy đã đính kèm với nhiệm vụ của hàm." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

