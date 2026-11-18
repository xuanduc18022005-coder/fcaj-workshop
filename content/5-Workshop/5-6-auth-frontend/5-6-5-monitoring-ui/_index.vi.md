+++
title = "5.6.5. Giám sát và sơ đồ hạ tầng"
weight = 5
translationKey = "ws-frontend-monitoring"
+++

## Theo dõi CPU/RAM

1. Chọn Giám sát. Kiểm tra nguồn dữ liệu của từng thiết bị. EC2 cần Instance ID đúng và backend đọc CloudWatch; RAM cần CloudWatch Agent với namespace thực tế. Những thiết bị SIMULATED thay đổi theo chu kỳ simulator.
2. Chọn EC2 trong phần lịch sử và đổi khoảng thời gian từ 15 phút đến 24 giờ. API dùng `GET /metrics` với tham số lịch sử, không cần tạo route API mới. Nếu thiếu metric, kiểm tra thời điểm dữ liệu và agent; không diễn giải dữ liệu thiếu là mức sử dụng 0%.
3. Thử đổi khoảng thời gian và quan sát biểu đồ. Chế độ demo không thể kiểm chứng số liệu EC2 thật.

## Sơ đồ hạ tầng

Mở Sơ đồ hạ tầng, lọc theo tên hoặc trạng thái. Các nút thiết bị được phân nhóm theo loại và nguồn giám sát; nhấn nút để xem thông tin chi tiết. Đường nối là minh họa quan hệ quản lý, không phải bản đồ kết nối vật lý do SNMP phát hiện.

## Kiểm tra
Đối chiếu CPU trên EC2 CloudWatch với thời gian điểm dữ liệu hiển thị; kiểm tra RAM riêng. Với thiết bị lab, dùng simulator để quan sát chu kỳ thay đổi.

## Truy vấn lịch sử EC2

Với phiên đăng nhập hợp lệ, khi đổi khoảng thời gian trong giao diện, mã gọi đường dẫn dạng `GET /metrics?historyMinutes=60&instanceId=INSTANCE_ID`. Giá trị hợp lệ từ 15–1440 phút; ID phải là EC2 đã đăng ký. Thử các mốc 15 phút, 1 giờ và 24 giờ, đối chiếu thời điểm và độ phân giải với CloudWatch. Nếu không có dữ liệu, kiểm tra nguồn thực và log Lambda, không sửa bằng cách ghi CPU/RAM vào bảng thiết bị EC2.

Đối với sơ đồ thiết bị, bấm một nút để xem chi tiết rồi lọc trạng thái. Sơ đồ nhóm thiết bị theo thuộc tính, không đại diện kết nối vật lý đã đo.

## Thực hành: chọn nguồn biểu đồ và khoảng thời gian

1. Mở **Hiệu năng & Metrics** → Xu hướng CPU / RAM. Trong Nguồn biểu đồ, chọn EC2 đã liên kết.
2. Chọn 1 giờ hoặc khoảng tùy chỉnh 15–1440 phút, sau đó bấm **Xem lịch sử AWS**. Đọc số mẫu CPU/RAM và giờ tải. CPU cơ bản thường có mẫu 5 phút; RAM do agent có thể có mẫu 1 phút. Số mẫu khác nhau không đồng nghĩa lỗi.

3. Chuyển sang nguồn **Trung bình thiết bị – mẫu trình duyệt**. Đây là lịch sử lấy mẫu cục bộ, không phải truy vấn EC2. Không dùng đường biểu diễn này để kết luận số liệu CloudWatch.

## Xử lý khi biểu đồ EC2 trống

- Mở DevTools → Network, lọc `/metrics?historyMinutes=`. Xác nhận response thành công, `instanceId` trùng máy được chọn, `history` là mảng và timestamp hợp lệ.
- Trong CloudWatch → Metrics, mở `AWS/EC2` → `CPUUtilization` và `NetMon/EC2` → `mem_used_percent`, chọn cùng InstanceId, so sánh thời gian và period.
- Nếu API trả 401/403, kiểm tra phiên Cognito và read scope. Nếu API trả lỗi server, xem log `netmon-api`. Nếu mẫu đã về nhưng đồ thị trống, kiểm tra Console JavaScript và vùng `metrics-chart` trước khi sửa AWS.
- Không biến giá trị `null` thành 0% hoặc trộn dữ liệu mẫu trình duyệt vào lịch sử EC2. Các ảnh ở trang Workshop chỉ cho thấy trạng thái tại thời điểm chụp; chưa chứng minh đồ thị EC2 thực tế đã vẽ đầy đủ.

**Ảnh giao diện liên quan:** [Giám sát hiệu năng CPU/RAM](../../#netmon-metrics).
