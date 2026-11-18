+++
title = "5.5.1. Khởi tạo bảng DynamoDB"
weight = 1
translationKey = "ws-4-1"
+++

## Thiết kế bảng

| Bảng | Partition key (String) | Sort key |
|---|---|---|
| NetworkDevices | deviceId | — |
| NetworkAlerts | eventId | — |
| NetworkSettings | settingKey | — |
| NetworkAuditLogs | logType | eventKey (String) |

## Các bước thực hiện

1. Vào DynamoDB → Tables → Create table, nhập tên và khóa theo bảng trên. Chọn on-demand nếu phù hợp tải thử nghiệm; kiểm tra chi phí.
2. Trong `NetworkDevices`, vào Explore table items để tạo thiết bị thử hoặc dùng API POST. Thuộc tính `deviceName`, `deviceType`, `ipAddress`, `location`, `status`, `cpuUsage`, `memoryUsage`, `metricsSource` mô tả thiết bị.
3. Bật DynamoDB Streams với New and old images trên NetworkDevices để monitor/audit writer đọc thay đổi.
4. NetworkSettings dùng `settingKey=thresholds` và `settingKey=simulation` cho ngưỡng và chu kỳ. API/Lambda sẽ đọc cấu hình này.

Ví dụ bản ghi logic (JSON thường, không phải định dạng typed JSON của Console):

```json
{"deviceId":"TEST001","deviceName":"Switch Lab","deviceType":"Switch","ipAddress":"10.0.0.10","status":"ONLINE","metricsSource":"SIMULATED","cpuUsage":45,"memoryUsage":60}
```

## Kiểm tra

Đọc lại item và khóa; không xóa bảng đã có dữ liệu. [DynamoDB Developer Guide](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html).

## Tạo cấu hình mặc định

Trong Explore table items → Create item, dùng hai bản ghi dưới đây trong `NetworkSettings` (Number, không phải chuỗi); đây là JSON logic, giao diện Console có thể yêu cầu định dạng DynamoDB JSON.

```json
{"settingKey":"thresholds","cpuThreshold":80,"ramThreshold":80}
```

```json
{"settingKey":"simulation","intervalMinutes":5}
```

Kiểm tra bốn bảng Active, đúng kiểu String cho khóa. Nếu bảng tồn tại, đọc cấu hình hiện tại thay vì ghi đè ngưỡng nhóm đang dùng. `NetworkAuditLogs` có sort key `eventKey` bắt buộc; không tạo riêng table theo key deviceId.

**Minh chứng:** danh sách bốn bảng, key schema và một item thử đã ẩn dữ liệu nội bộ.

## Hình ảnh minh họa và minh chứng

{{< photo src="workshop/evidence/02_DynamoDB_NetworkSettings.png" alt="Bảng NetworkSettings trong DynamoDB Console." caption="Ảnh AWS do người dùng cung cấp. Bảng NetworkSettings trong DynamoDB Console." >}}

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

DynamoDB → Tables → NetworkDevices → Explore table items. Kiểm tra deviceId và dữ liệu thiết bị thời điểm chụp.

{{< photo src="workshop/aws-console/33-dynamodb-networkdevices-2-items.png" alt="DynamoDB → Tables → NetworkDevices → Explore table items. Kiểm tra deviceId và dữ liệu thiết bị thời điểm chụp." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

Mở NetworkAlerts → Explore table items; kiểm tra các bản ghi cảnh báo đã lưu.

{{< photo src="workshop/aws-console/32-dynamodb-networkalerts-7-items.png" alt="Mở NetworkAlerts → Explore table items; kiểm tra các bản ghi cảnh báo đã lưu." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

