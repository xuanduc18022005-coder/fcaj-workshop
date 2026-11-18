+++
title = "5.4.3. EventBridge Scheduler và mô phỏng thiết bị"
weight = 3
translationKey = "ws-3-3"
+++

## Mục tiêu
Tự động cập nhật CPU/RAM thiết bị có `metricsSource=SIMULATED`; không ghi đè chỉ số của EC2.

## Các bước thực hiện

1. Hoàn thành bảng `NetworkDevices`, `NetworkSettings` ở mục [5.5.1](../../5-5-serverless/5-5-1-dynamodb/). Trong Lambda, tạo hoặc mở `netmon-simulator`, dùng gói `netmon-simulator-deploy.zip` trong `AWS_BACKEND_CODE`. Kiểm tra handler và role có quyền đọc cấu hình, Scan và UpdateItem đúng bảng.
2. Vào Amazon EventBridge → Scheduler → Schedules → Create schedule. Đặt tên ví dụ `netmon-simulator-schedule`, dùng biểu thức `rate(1 minute)` và đặt Flexible time window = Off. Target chọn AWS Lambda → `netmon-simulator`, payload `{}`. Sử dụng execution role có quyền gọi đúng hàm. Không tạo lịch trùng nếu đã có.
3. Trong DynamoDB, kiểm tra item `settingKey=simulation`, thuộc tính `intervalMinutes` kiểu Number từ 1–60 (mặc định 5). Lịch luôn gọi mỗi phút; hàm chỉ cập nhật thiết bị đến hạn dựa trên `lastSimulatedAt`. Mã giới hạn tối đa 100 thiết bị mô phỏng mỗi lần duyệt.
4. Trong Lambda → Test, dùng event chỉ đọc dưới đây để xem thiết bị đến hạn. Không dùng các event test để cấu hình Scheduler.

```json
{"dryRun": true}
```

5. Để thử cảnh báo, dùng thiết bị lab đã tạo (đổi ID đúng bản ghi). `forcePeak` tạo giá trị ngẫu nhiên 90–97%, nên cần đặt ngưỡng thấp hơn 90 để kiểm thử chắc chắn. Khi xong, dùng `forceNormal` riêng để hạ giá trị về 25–45%.

```json
{"deviceId":"LAB-CRUD-01","forcePeak":true}
```

## Kiểm tra

Mở CloudWatch Logs của Lambda và Explore table items để xem `cpuUsage`, `memoryUsage`, `lastSimulatedAt`. Xem trạng thái cảnh báo sau khi thiết lập trigger ở mục 5.4.4. Không coi việc thay đổi số liệu demo là kết quả giám sát EC2 thực tế.

[Tài liệu EventBridge Scheduler](https://docs.aws.amazon.com/scheduler/latest/UserGuide/getting-started.html)

## Đối chiếu các tình huống kiểm thử

| Test event | Mục đích |
|---|---|
| `{"dryRun":true}` | Kiểm tra số thiết bị đến hạn, không ghi dữ liệu |
| `{"deviceId":"LAB-CRUD-01","forceRun":true}` | Cập nhật riêng thiết bị lab |
| `{"deviceId":"LAB-CRUD-01","forcePeak":true}` | Sinh CPU/RAM 90–97% |
| `{"deviceId":"LAB-CRUD-01","forceNormal":true}` | Đưa giá trị về 25–45% |

Ở Scheduler xem trạng thái Enabled, target và execution role. Nếu Lambda có lượt gọi nhưng `updated=0`, kiểm tra `due`, `skippedInterval` và `metricsSource`; nếu không có lượt gọi, kiểm tra lịch/role. Không tạo lịch 1 phút thứ hai khi lịch cũ đã chạy.

## Cấu hình Scheduler

| Thuộc tính | Giá trị cần kiểm tra |
|---|---|
| Schedule pattern | rate(1 minute) |
| Flexible time window | Off |
| Target | AWS Lambda → netmon-simulator |
| Payload | `{}` |
| State | Enabled |
| Execution role | lambda:InvokeFunction → netmon-simulator |

Dùng các giá trị này để đối chiếu với tài nguyên đang có; không tạo thêm tài nguyên trùng hoặc thay đổi hệ thống đang hoạt động chỉ để khớp bài thực hành.

## Hình ảnh minh họa và minh chứng

{{< photo src="workshop/evidence/04_EventBridge_chu_ky_1_phut.png" alt="Cấu hình lịch EventBridge theo chu kỳ một phút." caption="Ảnh AWS do người dùng cung cấp. Cấu hình lịch EventBridge theo chu kỳ một phút." >}}

{{< photo src="workshop/evidence/08_Lambda_GET_simulation_config.png" alt="Kết quả đọc cấu hình mô phỏng từ Lambda." caption="Ảnh AWS do người dùng cung cấp. Kết quả đọc cấu hình mô phỏng từ Lambda." >}}
