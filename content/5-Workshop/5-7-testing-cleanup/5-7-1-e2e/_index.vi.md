+++
title = "5.7.1. Kiểm thử toàn bộ hệ thống"
weight = 1
translationKey = "ws-6-1"
+++

## Kịch bản kiểm thử

| Bước | Kết quả mong đợi |
|---|---|
| Đăng nhập Cognito | API chỉ nhận token và scope hợp lệ |
| Tạo, sửa và xóa thiết bị thử | DynamoDB phản ánh thay đổi |
| EC2 | CPU từ CloudWatch, RAM nếu Agent hoạt động |
| Thiết bị mô phỏng | CPU/RAM thay đổi qua lịch simulator |
| Thiết bị thử vượt ngưỡng | Cảnh báo mới; SNS nếu được bật |
| Tiếp nhận, xử lý | Trạng thái cảnh báo cập nhật |
| Nhật ký và phân trang | Tìm kiếm, phân trang 10/20/50 dòng trong dữ liệu đã tải |

## Ghi nhận kết quả
Ghi trạng thái từng ca là đạt, lỗi hoặc chưa thử; lưu ảnh đã ẩn token, ID và dữ liệu cá nhân. Không đánh dấu đạt chỉ vì chạy demo offline. Đường nối sơ đồ hạ tầng là minh họa quan hệ quản lý, không phải khám phá mạng vật lý.

## Bảng ghi kết quả kiểm thử thực tế

| Mã ca | Thao tác | Minh chứng cần lưu | Kết quả |
|---|---|---|---|
| T01 | Đăng nhập và đọc dữ liệu | HTTP 200, không lộ token | Chưa điền |
| T02 | POST/GET/PUT/DELETE bản ghi lab | DynamoDB trước/sau | Chưa điền |
| T03 | Lambda simulator dryRun và forcePeak | Log, lastSimulatedAt | Chưa điền |
| T04 | Vượt ngưỡng rồi hạ bình thường | NetworkAlerts, email nếu bật | Chưa điền |
| T05 | Đọc EC2 CPU/RAM/lịch sử | CloudWatch và biểu đồ | Chưa điền |
| T06 | Tiếp nhận/hoàn tất, nhật ký | handlingStatus, NetworkAuditLogs | Chưa điền |
| T07 | Phiên thiếu token/scope | 401/403 | Chưa điền |
| T08 | Tìm kiếm, sơ đồ và phân trang | Ảnh UI | Chưa điền |

Điền Đạt/Không đạt sau khi tự thực hiện; giữ thời điểm, nguồn dữ liệu và mô tả lỗi nếu có. Với demo bảo vệ, ưu tiên luồng đăng nhập → quản lý → mô phỏng → cảnh báo → xác nhận → nhật ký.

## Ma trận kiểm thử bổ sung cho phiên bản Cấu Hình Metrics

| Ca kiểm thử | Thao tác | Tiêu chí chấp nhận |
|---|---|---|
| EC2-01 | Đăng ký Instance ID hợp lệ đã có trong Region | API lưu bản ghi nguồn CLOUDWATCH, không tạo EC2 mới |
| EC2-02 | Thử Instance ID không tồn tại hoặc đã đăng ký | API từ chối, không tạo bản ghi trùng |
| MET-01 | Truy vấn lịch sử 15 phút, 1 giờ, 24 giờ | API trả mẫu có timestamp, UI không thay null thành 0 |
| MET-02 | Đổi giữa CloudWatch và mẫu trình duyệt | Nguồn, chú thích và khoảng thời gian phù hợp |
| SIM-01 | Cấu hình chu kỳ mô phỏng trên thiết bị lab | Lưu thành công, kiểm tra log simulator và thời gian cập nhật |
| UI-01 | Đổi bộ lọc, phân trang 10/20/50 | Số dòng và lựa chọn đúng tập dữ liệu đã tải |
| AUTH-01 | Thử gọi API không token hoặc thiếu scope | Yêu cầu bị từ chối; không tắt JWT để sửa lỗi |

Ảnh cung cấp cho thấy phản hồi lịch sử một giờ có 12 mẫu CPU và 59 mẫu RAM, và chế độ mẫu trình duyệt có đường biểu diễn. Các ca còn lại cần kiểm thử trên tài khoản thật trước khi ghi đạt.

