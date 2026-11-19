+++
title = "1.11. Worklog Tuần 11"
weight = 11
translationKey = "week-11"
+++

## Mục tiêu tuần 11:

- Kết nối frontend với backend.
- Kiểm tra mô phỏng và cảnh báo.
- Cập nhật giao diện.

## Các công việc đã thực hiện:

| Ngày | Công việc | Nguồn tài liệu |
|---|---|---|
| 31/10/2026 | Kiểm tra giao diện quản lý thiết bị dùng JavaScript gọi API Gateway và hiển thị danh sách thiết bị lưu trong DynamoDB. | [API Gateway + Lambda + DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) |
| 02/11/2026 | Thử tình huống CPU/RAM vượt ngưỡng, trạng thái thiết bị thay đổi và thông báo SNS. | [CloudWatch Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Alarms.html) · [Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/welcome.html) |
| 05/11/2026 | Bổ sung màn hình dashboard, tìm kiếm thiết bị và phần lịch sử cảnh báo; rà soát CORS/đăng nhập. | [HTTP API CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html) · [API Gateway JWT authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html) |

## Kết quả đạt được tuần 11:

- Dữ liệu thiết bị có thể hiển thị và thao tác thử nghiệm.
- Tập hợp các lỗi hoặc trường hợp cần kiểm tra thêm.
- Hoàn thiện dần trải nghiệm sử dụng.
