+++
title = "5.5.4. Kiểm thử CRUD và truy vấn dữ liệu"
weight = 4
translationKey = "ws-4-4"
+++

## Các bước
Sau khi tạo API, kiểm thử trực tiếp bằng Lambda Test trước khi dùng HTTP API bảo vệ. Dùng `deviceId` thử riêng, ví dụ `LAB-CRUD-01`; không sửa/xóa EC2 đang hoạt động.

| Kiểm thử | Kết quả mong đợi |
|---|---|
| GET `/devices` | Danh sách JSON |
| POST `/devices` | Tạo thiết bị thử với dữ liệu hợp lệ |
| GET `/devices/LAB-CRUD-01` | Chi tiết thiết bị |
| PUT `/devices/LAB-CRUD-01` | Dữ liệu được cập nhật |
| DELETE `/devices/LAB-CRUD-01` (sau khi kiểm thử mô phỏng) | Xóa đúng bản ghi thử |

Mở DynamoDB → Explore table items để đối chiếu, xem CloudWatch Logs khi có lỗi. Sau khi cấu hình Cognito và JWT ở chương 5.6, lặp lại qua giao diện để kiểm tra quyền đọc/ghi. Không tắt JWT để xử lý lỗi 401/403.

## Kết quả mong đợi
CRUD phản ánh trên DynamoDB và giao diện, các lỗi dữ liệu được xử lý; chưa xác nhận kết quả trên AWS thật trong tài liệu này.

## Ví dụ event Lambda Test (không đi qua JWT)

Tạo thiết bị lab có ID chưa tồn tại. Dùng JSON sau trong tab Test của Lambda `netmon-api`:

```json
{"requestContext": {"http": {"method": "POST"}}, "rawPath": "/devices", "body": "{\"deviceId\":\"LAB-CRUD-01\",\"deviceName\":\"Switch Lab\",\"deviceType\":\"Switch\",\"ipAddress\":\"10.0.0.20\",\"location\":\"Lab\"}"}
```

Mã dự án tự sinh CPU/RAM ban đầu cho thiết bị mô phỏng nếu không nhập. Kỳ vọng HTTP 201 và `metricsSource=SIMULATED`. Kiểm tra lại:

```json
{"requestContext":{"http":{"method":"GET"}},"rawPath":"/devices/LAB-CRUD-01"}
```

```json
{"requestContext": {"http": {"method": "PUT"}}, "rawPath": "/devices/LAB-CRUD-01", "body": "{\"deviceName\":\"Switch Lab Updated\"}"}
```

Giữ bản ghi này cho ca kiểm thử simulator và cảnh báo, chỉ DELETE sau khi hoàn thành và xác nhận đúng ID. Kiểm tra API trả 400 khi payload sai; không coi Lambda Test là minh chứng JWT vì đã bỏ qua API Gateway.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Lambda → Test: chọn event GET devices và bấm Test, kiểm tra Execution result.

{{< photo src="workshop/aws-console/35-lambda-netmon-api-test-succeeded-details-collapsed.png" alt="Lambda → Test: chọn event GET devices và bấm Test, kiểm tra Execution result." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

**Ảnh giao diện liên quan:** [Quản lý thiết bị](../../#netmon-devices).
