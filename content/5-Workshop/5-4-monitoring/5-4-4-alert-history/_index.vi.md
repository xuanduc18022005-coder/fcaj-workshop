+++
title = "5.4.4. DynamoDB Streams và lịch sử cảnh báo"
weight = 4
translationKey = "ws-3-4"
+++

## Chuẩn bị
Hoàn thành các bảng ở mục 5.5.1 và tạo SNS topic ở mục 5.4.2 trước khi bật trigger. Mã `netmon-device-monitor.py` và `netmon-audit-writer.py` có trong thư mục `AWS_BACKEND_CODE`.

## Thiết lập luồng xử lý cảnh báo
1. DynamoDB → NetworkDevices → Exports and streams → bật DynamoDB Streams với **New and old images**. Nếu đã có stream thì giữ nguyên.
2. Tạo Lambda Python `netmon-device-monitor` và `netmon-audit-writer` (hoặc dùng hàm đang có); upload mã tương ứng, đặt đúng tên file và handler. Gắn role tối thiểu cho đọc stream và ghi đúng bảng đích; monitor cần đọc NetworkSettings, cập nhật cờ cảnh báo và SNS Publish nếu gửi mail.
3. Lambda → Add trigger → DynamoDB → chọn stream của NetworkDevices. Tạo event source mapping riêng cho mỗi hàm. Khi chỉ muốn xử lý thay đổi mới, chọn Latest. Kiểm tra trigger đã Enabled, cấu hình retry và theo dõi lỗi trước khi bật thử nghiệm.
4. `netmon-device-monitor` đọc ngưỡng CPU/RAM từ item `thresholds` (mặc định 80 nếu chưa có cấu hình); so sánh **lớn hơn** ngưỡng, bỏ qua EC2/CloudWatch và thiết bị OFFLINE. Cờ `simCpuAlarmActive` và `simRamAlarmActive` hạn chế cảnh báo trùng khi giá trị còn ở mức cao. Khi vượt ngưỡng, ghi NetworkAlerts và gửi SNS nếu có cấu hình.

{{< photo src="workshop/alert-flow.svg" alt="Luồng cảnh báo và thông báo logic." caption="Luồng cảnh báo và thông báo logic." >}}

## Nhật ký thay đổi thiết bị

Audit writer nhận INSERT/MODIFY/REMOVE, giải mã OldImage/NewImage, lưu `NetworkAuditLogs` theo `logType=DEVICE`, `eventKey` là thời gian ghép eventID. Chỉ ghi các trường nghiệp vụ thay đổi; không ghi cờ nội bộ để tránh log rác. Có `expiresAt` (30 ngày) nhưng TTL chỉ có tác dụng nếu đã bật trên bảng. Streams không mang danh tính người dùng thực nên trường actor có thể là Unknown.

## Kiểm tra

Dùng thiết bị mô phỏng lab, cập nhật CPU/RAM và kiểm tra CloudWatch Logs, NetworkAlerts, NetworkAuditLogs. Mở giao diện sau khi thiết lập JWT. CloudWatch Alarm của EC2 có lịch sử riêng; không suy diễn email EC2 đều xuất hiện trong NetworkAlerts.

[Tài liệu AWS Lambda và DynamoDB Streams](https://docs.aws.amazon.com/lambda/latest/dg/with-ddb.html)

## Kiểm tra cả hai event source mapping

Mở Lambda → Configuration → Triggers của từng hàm. Cả monitor và audit writer cần đọc cùng stream NetworkDevices, với role riêng và mapping Enabled. Đọc CloudWatch log nếu ghi thất bại; với audit writer kiểm tra khóa ghép `logType` + `eventKey` của bảng. Có thể bật TTL trên `expiresAt` theo chính sách nhóm (dữ liệu log cũ cần được sao lưu nếu cần).

Một lần tăng CPU vượt ngưỡng có thể tạo cảnh báo; các cập nhật liên tiếp trên ngưỡng không nhất thiết tạo thêm email do cờ chống trùng. Khi hạ về bình thường rồi vượt ngưỡng lần nữa sẽ là tình huống mới. Không nhầm `alarmState` với `handlingStatus`.


**Ảnh giao diện liên quan:** [Nhật ký hệ thống](../../#netmon-logs).

## Thuộc tính event source mapping

| Thuộc tính | Giá trị cần kiểm tra |
|---|---|
| Source | NetworkDevices DynamoDB Stream |
| Stream view type | NEW_AND_OLD_IMAGES |
| Function | netmon-device-monitor / netmon-audit-writer |
| Starting position | LATEST (lab mới / new lab) |
| Enable trigger | Yes |
| Batch size | 10 (đề xuất / suggested; đối chiếu thực tế / verify) |

Dùng các giá trị này để đối chiếu với tài nguyên đang có; không tạo thêm tài nguyên trùng hoặc thay đổi hệ thống đang hoạt động chỉ để khớp bài thực hành.
