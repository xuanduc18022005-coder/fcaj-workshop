+++
title = "5.6.6. Cảnh báo, nhật ký và cấu hình"
weight = 6
translationKey = "ws-frontend-operations"
+++

## Cảnh báo và sự cố

1. Mở Cảnh báo & sự cố. Kiểm tra nguồn dữ liệu và lọc theo trạng thái, mức độ. Chọn cảnh báo thử nghiệm để tiếp nhận (Acknowledged) hoặc xử lý (Resolved).
2. Có thể chọn cả trang, chuyển trang và xử lý cảnh báo đã chọn. Tiếp nhận tất cả áp dụng với tập cảnh báo mới đã tải. Thao tác ghi cần token có scope `netmon-api/write`.

## Nhật ký lịch sử

Mở Nhật ký và kiểm tra ba tab: thiết bị, cảnh báo, thao tác. Mã nguồn hiện tải tối đa 100 bản ghi nhật ký từ GET `/logs` và tối đa 200 dòng nhật ký thao tác tại trình duyệt. Tìm kiếm và phân trang 10/20/50 dòng trên tập đã tải; đây không phải cơ chế phân trang toàn bộ DynamoDB.

## Cấu hình hệ thống

Mở Cấu hình. Đặt ngưỡng CPU/RAM độc lập và chu kỳ mô phỏng 1–60 phút; kiểm tra quyền lưu và trạng thái SNS. Chu kỳ mô phỏng khác tần suất giao diện tải dữ liệu. SNS status chỉ đọc cấu hình và subscription, không khẳng định email được gửi. Đặt ngưỡng lại như ban đầu sau thử nghiệm.

## Kiểm tra

Thử thiết bị lab vượt ngưỡng rồi trở lại bình thường; đối chiếu cảnh báo, trạng thái xử lý, nhật ký và email thật nếu có. Không thay đổi ngưỡng hoặc lịch cảnh báo sản xuất mà chưa thống nhất.

## Kiểm tra thao tác API và giá trị lưu

| Chức năng | API hoặc nguồn dữ liệu |
|---|---|
| Danh sách cảnh báo | GET /alerts → NetworkAlerts |
| Tiếp nhận | PUT /alerts/{id}, `{"handlingStatus":"Acknowledged"}` |
| Hoàn tất | PUT /alerts/{id}, `{"handlingStatus":"Resolved"}` |
| Nhật ký thiết bị | GET /logs → NetworkAuditLogs |
| Ngưỡng CPU/RAM | PUT /settings, `{"cpuThreshold":80,"ramThreshold":80}` (số nguyên 1–99) |
| Chu kỳ mô phỏng | PUT /simulation/config, `{"intervalMinutes":5}` (1–60 phút) |
| Kiểm tra SNS | GET /sns/status (chỉ đọc) |

Trên Cấu hình, lưu ngưỡng/chu kỳ chỉ khi nhóm đồng ý. Tải lại giao diện và kiểm tra hai item `thresholds`/`simulation` trong DynamoDB. Đổi số dòng 10/20/50 ở Nhật ký; tab thao tác lưu ở trình duyệt, không đồng nghĩa audit server xác định được người thao tác. Khi đã hoàn tất thử nghiệm, khôi phục các giá trị ban đầu.

## Phân biệt các cấu hình Metrics

| Cấu hình | Ý nghĩa | Kiểm tra |
|---|---|---|
| Chu kỳ cập nhật giao diện | Tắt hoặc tải lại sau 30/60/120 giây | Quan sát số lần GET /devices, /metrics; không làm thay đổi chu kỳ simulator |
| Chu kỳ CPU/RAM | 1–60 phút, lưu bằng API | Đọc lại GET /simulation/config; kiểm tra scheduler và log simulator |
| Ngưỡng CPU/RAM | Hai ngưỡng độc lập, điều kiện vượt ngưỡng | Đọc lại GET /settings; so sánh Alarm EC2 riêng |
| Khoảng lịch sử EC2 | 15–1440 phút, truy vấn theo Instance ID | Đối chiếu CloudWatch theo cùng khoảng thời gian |
| Thông báo popup | Điều khiển hiển thị tại trình duyệt | Không đồng nghĩa bật/tắt hành động SNS trên AWS |

Nếu backend đang chạy ổn, chỉ thay giao diện không cần triển khai lại các Lambda. Trước khi cập nhật cấu hình trong chế độ AWS, xác nhận quyền và ghi lại thông số cũ. Sau khi kiểm thử, khôi phục cấu hình đã thống nhất với nhóm.

**Ảnh giao diện liên quan:** [Cảnh báo và xử lý sự cố](../../#netmon-alerts) · [Cấu hình hệ thống và SNS](../../#netmon-settings).
