+++
title = "5.5.2. Triển khai Lambda netmon-api"
weight = 2
translationKey = "ws-4-2"
+++

## Các hàm trong mã nguồn

| Hàm | Nhiệm vụ |
|---|---|
| netmon-api | CRUD, metrics, cảnh báo, cấu hình, nhật ký và kiểm tra SNS |
| netmon-simulator | Cập nhật CPU/RAM mô phỏng theo chu kỳ |
| netmon-device-monitor | Phân tích thay đổi thiết bị, ghi cảnh báo và gửi SNS |
| netmon-audit-writer | Ghi lại INSERT/MODIFY/REMOVE từ Streams |

## Các bước thực hiện

1. Tạo Lambda Python hoặc dùng hàm nhóm đã có. Từ `AWS_BACKEND_CODE`, dùng `netmon-api-deploy.zip` và `netmon-simulator-deploy.zip` đúng hàm; hai file monitor/audit writer được đóng gói riêng nếu cần. Kiểm tra handler `lambda_function.lambda_handler` tương ứng với tên file trong gói.
2. Tạo execution role có quyền ghi CloudWatch Logs và quyền đúng bảng, metric, stream hoặc SNS cần dùng. Các file IAM trong mã nguồn là mẫu, phải đối chiếu ARN trước khi áp dụng.
3. Cấu hình biến môi trường phù hợp: `DEVICES_TABLE`, `ALERTS_TABLE`, `SETTINGS_TABLE`, `AUDIT_LOGS_TABLE`, `SNS_TOPIC_ARN` và `CORS_ORIGIN` cho hàm cần chúng.
4. Với simulator và hai hàm xử lý stream, thực hiện cấu hình trigger ở mục 5.4.3 và 5.4.4 sau khi các bảng đã sẵn sàng. Không tạo trigger/lịch trùng.
5. Test API GET trong Lambda với event sau. Chỉ test vùng/lab có quyền.

```json
{"requestContext":{"http":{"method":"GET"}},"rawPath":"/devices"}
```

## Đối chiếu quyền theo chức năng

| Hàm | Quyền nghiệp vụ cần rà |
|---|---|
| netmon-api | CRUD trên các bảng cần dùng; đọc CloudWatch, SNS status |
| netmon-simulator | Scan/UpdateItem NetworkDevices, GetItem NetworkSettings |
| netmon-device-monitor | Đọc Streams và settings, cập nhật cờ trên Devices, ghi Alerts, SNS Publish |
| netmon-audit-writer | Đọc Streams, ghi NetworkAuditLogs |

Mỗi hàm cần quyền ghi CloudWatch Logs. Không áp policy mẫu với ARN chưa xác minh. 

## Kiểm tra

Kỳ vọng statusCode 200, body JSON và không có lỗi permission trong Logs. Với simulator, dùng thiết bị thử riêng; không ép dữ liệu EC2 thật. [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html) · [EventBridge Scheduler](https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html).

## Biến môi trường và gói triển khai

| Biến | Giá trị mẫu |
|---|---|
| DEVICES_TABLE | NetworkDevices |
| ALERTS_TABLE | NetworkAlerts |
| SETTINGS_TABLE | NetworkSettings |
| AUDIT_LOGS_TABLE | NetworkAuditLogs |
| CORS_ORIGIN | http://localhost:5500 |
| SNS_TOPIC_ARN | ARN topic của môi trường riêng (không công khai) |

Chọn Lambda → Create function → Author from scratch, runtime Python được hỗ trợ, đúng execution role. Trong Code → Upload from → .zip file, chọn gói đúng hàm. Với mã `.py` monitor/audit, tạo gói ZIP chứa `lambda_function.py` ở gốc hoặc đặt handler đúng module. Trong Configuration → Environment variables điền giá trị phù hợp hàm. Save và Test ở 5.5.4, mở Monitor → View CloudWatch logs để tìm lỗi.

Không upload lại hàm AWS đang chạy chỉ vì giao diện thay đổi. Không chèn khóa AWS vào ZIP/mã nguồn.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Lambda → netmon-api → Code: đối chiếu mã và trigger API Gateway.

{{< photo src="workshop/aws-console/34-lambda-netmon-api-code-and-api-gateway.png" alt="Lambda → netmon-api → Code: đối chiếu mã và trigger API Gateway." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

Lambda → Monitor → View CloudWatch logs: kiểm tra log group /aws/lambda/netmon-api và log streams.

{{< photo src="workshop/aws-console/36-cloudwatch-logs-netmon-api-6-streams.png" alt="Lambda → Monitor → View CloudWatch logs: kiểm tra log group /aws/lambda/netmon-api và log streams." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

