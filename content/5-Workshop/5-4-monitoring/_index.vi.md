+++
title = "5.4. CloudWatch, SNS và EventBridge"
weight = 4
translationKey = "ws-chapter-3"
+++

Theo dõi EC2 bằng CloudWatch, gửi SNS và cập nhật dữ liệu mô phỏng theo lịch EventBridge.

{{< photo src="workshop/alert-flow.svg" alt="Luồng cảnh báo" caption="Luồng cảnh báo logic." >}}

**Thứ tự thực hiện:** Cấu hình CloudWatch và SNS trước. Hai mục Scheduler và Streams cần bảng DynamoDB ở mục 5.5.1; nếu triển khai từ đầu, hãy hoàn thành bước đó trước khi bật các trigger.

## Danh sách bài thực hành chi tiết

- [5.4.1. Thu thập chỉ số CPU và RAM](5-4-1-metrics/)
- [5.4.2. Tạo CloudWatch Alarm và gửi SNS Email](5-4-2-alarms-sns/)
- [5.4.3. EventBridge Scheduler và mô phỏng thiết bị](5-4-3-eventbridge/)
- [5.4.4. DynamoDB Streams và lịch sử cảnh báo](5-4-4-alert-history/)
