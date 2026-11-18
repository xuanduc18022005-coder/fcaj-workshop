+++
title = "5.7.2. Kiểm tra chi phí và sao lưu"
weight = 2
translationKey = "ws-6-2"
+++

## Các bước
1. Xem Billing → Cost Explorer và AWS Budgets; kiểm tra theo Region và dịch vụ sau khi dữ liệu cập nhật.
2. Lưu các ảnh cần cho báo cáo: VPC, EC2, metric, alarm, bảng DynamoDB, route API và kết quả xác thực đã che thông tin nhạy cảm.
3. Sao lưu mã Lambda, cấu hình API, dữ liệu thử và hướng dẫn vận hành; không đưa access key hoặc JWT vào bản công khai.
4. Nếu chưa bảo vệ đồ án, chỉ tạm ngừng lịch mô phỏng và cảnh báo khi nhóm thống nhất. Không xóa tài nguyên còn cần demo.

## Kết quả
Có bản sao minh chứng và biết tài nguyên nào còn phát sinh chi phí. Không xem dự toán là hóa đơn thực tế.

## Hồ sơ bàn giao

- Mã frontend, bốn file Lambda và policy tham khảo trong thư mục riêng; loại trừ credential, token, mật khẩu.
- Danh sách bảng, khóa, route, scope và cấu hình môi trường (giá trị riêng chỉ chia sẻ nhóm).
- Ảnh Resource map, EC2, CloudWatch, SNS đã xác nhận, DynamoDB items, Lambda triggers và JWT authorizer.
- Worklog, Proposal, Workshop và bảng kết quả test; lưu bản ZIP ổn định trước khi chỉnh sửa.

Không đưa tên người nhận email hoặc nội dung bí mật vào GitHub công khai.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Billing → Budgets → Budget history: đối chiếu Actual/Forecast theo kỳ, không dùng ảnh cũ làm chi phí hiện tại.

{{< photo src="workshop/aws-console/03-aws-budget-history.png" alt="Billing → Budgets → Budget history: đối chiếu Actual/Forecast theo kỳ, không dùng ảnh cũ làm chi phí hiện tại." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

