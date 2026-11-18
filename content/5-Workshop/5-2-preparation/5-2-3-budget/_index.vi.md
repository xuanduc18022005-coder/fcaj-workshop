+++
title = "5.2.3. Thiết lập AWS Budgets"
weight = 3
translationKey = "ws-1-3"
+++

## Mục tiêu
Theo dõi chi phí và tránh tài nguyên bỏ quên.

## Các bước
1. Mở Billing and Cost Management → Budgets → Create budget.
2. Chọn Cost budget và kỳ theo tháng. Đặt mức ngân sách phù hợp nhóm; không coi mức ngân sách là chi phí đã phát sinh.
3. Tạo cảnh báo chi phí thực tế theo ngưỡng nhóm thống nhất (25%, 50%, 100% theo ảnh nhóm); nhập địa chỉ nhận thông báo.
4. Xem Cost Explorer, kiểm tra EC2, EBS, IPv4, CloudWatch và các dịch vụ có phát sinh request.

## Kiểm tra
Budget xuất hiện trong danh sách. Cảnh báo không phải giới hạn chi tiêu cứng và không tự động tắt toàn bộ tài nguyên.

[AWS Budgets](https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html)

## Theo dõi định kỳ

Trong Budget, xem Actual spend và Forecast nếu có; đối chiếu với Cost Explorer theo Service. Kiểm tra cả các khoản không gắn với thời gian chạy EC2 như EBS, IPv4 và log. Không dựa vào mức Free Tier để khẳng định toàn bộ dự án miễn phí. Giữ ảnh màn hình Budget đã che email và số tài khoản.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Billing → Budgets → chọn ngân sách → Alerts. Ảnh của nhóm ghi mức $20/tháng, cảnh báo Actual cost ở 25%, 50%, 100% (tương ứng $5, $10, $20); đối chiếu mức hiện tại trước khi thay đổi.

{{< photo src="workshop/aws-console/05-budget-alerts-25-50-100.png" alt="Billing → Budgets → chọn ngân sách → Alerts. Ảnh của nhóm ghi mức $20/tháng, cảnh báo Actual cost ở 25%, 50%, 100% (tương ứng $5, $10, $20); đối chiếu mức hiện tại trước khi thay đổi." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

