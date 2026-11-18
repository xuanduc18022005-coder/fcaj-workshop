+++
title = "5.6.4. Kết nối giao diện và quản lý thiết bị"
weight = 4
translationKey = "ws-5-3"
+++

## Chuẩn bị giao diện

1. Giải nén gói NetMon Cloud Cấu Hình Metrics. Mở đúng thư mục chứa `index.html` bằng VS Code; cài Live Server nếu chưa có.
2. Đối chiếu `auth.js` với domain Cognito, App Client ID, API Invoke URL và callback đã cấu hình. Giữ `http://localhost:5500/`; không tạo lại tài nguyên đang chạy. Mở cửa sổ trình duyệt tại địa chỉ trên. Thực hiện đăng nhập ở mục 5.6.3 trước khi gọi API thật.
3. Mở Tổng quan để xem số lượng thiết bị, trạng thái online/offline và cảnh báo. Kiểm tra nhãn chế độ AWS hay DEMO trước khi đọc chỉ số.

## Quản lý thiết bị

1. Mở Quản lý thiết bị → Thêm thiết bị. Nhập mã thử riêng, tên, loại, IP, vị trí và nguồn dữ liệu. Với switch/router mô phỏng, chọn nguồn SIMULATED; với EC2 chọn CloudWatch và Instance ID đúng máy.
2. Lưu, kiểm tra danh sách và mở chi tiết thiết bị. Tìm kiếm theo thông tin thiết bị, kiểm tra Sửa/Xóa chỉ trên bản ghi thử. Giao diện phiên bản mới cho phép chọn số dòng 10/20/50 và chuyển trang.
3. Khi ở chế độ AWS, đối chiếu kết quả với DynamoDB NetworkDevices. Chế độ demo chỉ dùng dữ liệu trình duyệt; không chứng minh API thật hoạt động.

## Kiểm tra

Xác nhận dữ liệu đã lưu, tìm kiếm và chỉnh sửa đúng thiết bị. Nếu lỗi kết nối, xem DevTools → Network, trạng thái 401/403/5xx và CloudWatch Logs. Không tắt xác thực để sửa lỗi.

## Bài thực hành trên giao diện

| Thao tác | Đối chiếu |
|---|---|
| Thêm Switch Lab | POST /devices → item NetworkDevices |
| Xem chi tiết | GET /devices/{id} hoặc dữ liệu đã tải |
| Sửa tên/vị trí | PUT /devices/{id} → thuộc tính sau cập nhật |
| Tìm kiếm và lọc | Kết quả lọc trên tập dữ liệu đã tải |
| Xóa thiết bị lab | DELETE /devices/{id} → bản ghi không còn |

Chụp ảnh Tổng quan và Quản lý thiết bị khi dữ liệu đã tải; không để cửa sổ cài đặt lộ endpoint nội bộ. Các ảnh đang có trong Workshop là minh họa demo, không dùng để ghi một ca kiểm thử AWS là đạt.

## Đăng ký máy EC2 thực tế

1. Trong EC2 Console tại `us-east-1`, lấy Instance ID của máy đang chạy. Không tạo thêm máy nếu đã có máy cần giám sát.
2. Mở Lambda `netmon-api` → Configuration → Permissions → Execution role. Đối chiếu quyền đọc `ec2:DescribeInstances` trong `IAM-netmon-api-EC2-READ.json`; giữ các quyền đọc CloudWatch và DynamoDB đang hoạt động. Nếu API cũ chưa hỗ trợ xác minh EC2, sao lưu code và chỉ triển khai gói mới sau khi đối chiếu các biến môi trường.
3. Trong NetMon, mở Quản lý thiết bị → Thêm thiết bị → chọn **EC2 (AWS thực tế)**. Điền mã thiết bị riêng, tên, Instance ID; có thể để trống IP để backend đọc IP riêng từ EC2. Không nhập CPU/RAM thủ công.
4. Lưu lại, tải danh sách và mở Hiệu năng & Metrics. API kiểm tra Instance ID trong tài khoản/Region của Lambda và ngăn đăng ký trùng. Xóa bản ghi này khỏi NetMon không terminate máy EC2.
5. Nếu thiếu RAM, kiểm tra CloudWatch Agent trên EC2 và namespace `NetMon/EC2` theo mục 5.4.1. Không đổi loại nguồn thành mô phỏng để che dữ liệu thiếu.

**Kết quả cần đối chiếu:** bản ghi NetworkDevices có Instance ID đúng; CPU/RAM hiển thị nguồn CloudWatch nếu có mẫu. Không dùng ảnh demo để kết luận đã thực hiện thành công.

**Ảnh giao diện liên quan:** [Quản lý thiết bị](../../#netmon-devices).
