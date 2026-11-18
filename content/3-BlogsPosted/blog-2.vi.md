+++
title = "3.2. Blog 2: Điều tra lỗi nhanh hơn với Structured Logs trên Amazon CloudWatch"
weight = 2
translationKey = "blog-2"
+++

## Cảnh báo chỉ là điểm bắt đầu
Khi ứng dụng chậm hoặc trả lỗi, CPU và số lượng lỗi chỉ cho biết có dấu hiệu bất thường. Người vận hành còn cần biết yêu cầu nào thất bại, xảy ra ở dịch vụ nào và thời điểm nào. Log có cấu trúc giúp kết nối những thông tin này.

## Từ log văn bản đến dữ liệu có thể truy vấn
Thay vì ghi một câu dài, ứng dụng có thể ghi mỗi sự kiện dưới dạng JSON gồm thời gian, requestId, service, mức độ, durationMs và mã lỗi. CloudWatch Logs Insights có thể lọc, thống kê và sắp xếp các trường. Embedded Metric Format (EMF) còn cho phép trích metric từ log có metadata phù hợp, sau đó tạo biểu đồ và alarm.

{{< photo src="blogs/structured-logs.svg" alt="Sơ đồ luồng xử lý – minh họa kỹ thuật" caption="Sơ đồ luồng xử lý – minh họa kỹ thuật" >}}

## Ví dụ điều tra lỗi
Giả sử API có một số yêu cầu mất nhiều thời gian. Với log JSON chứa `durationMs`, có thể lọc lỗi và tính độ trễ p95 theo từng dịch vụ:

```text
fields @timestamp, service, requestId, durationMs, level
| filter level = "ERROR" or durationMs > 500
| stats count(*) as requests, pct(durationMs, 95) as p95 by service
| sort p95 desc
```

Kết quả giúp chọn nơi cần điều tra tiếp, không tự động chứng minh nguyên nhân gốc. Cần đối chiếu timestamp, log của yêu cầu và metrics liên quan.

## Thực hành
Repository One Observability Demo cung cấp ứng dụng microservice mẫu. Đọc hướng dẫn triển khai, tạo lưu lượng thử, mở CloudWatch Logs Insights và chạy truy vấn trên các trường tương ứng. Đặt retention phù hợp, không ghi token, mật khẩu hay dữ liệu nhạy cảm; xóa tài nguyên lab sau khi dùng.

## Nhận xét
Việc thống nhất cấu trúc log từ đầu giúp quá trình tìm lỗi bớt phụ thuộc vào việc đọc từng dòng thủ công. Đối với các API giám sát, đây là hướng cải thiện hữu ích bên cạnh metrics CPU/RAM và lịch sử cảnh báo.

> **Bài viết gốc (AWS):** [Troubleshoot faster with structured logs in Amazon CloudWatch](https://aws.amazon.com/blogs/mt/accelerate-troubleshooting-with-structured-logs-in-amazon-cloudwatch/)
>
> **Mã nguồn demo trên GitHub:** [one-observability-demo](https://github.com/aws-samples/one-observability-demo)
