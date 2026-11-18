+++
title = "1.7. Worklog Tuần 7"
weight = 7
translationKey = "week-07"
+++

## Mục tiêu tuần 7:

- Thống nhất đề tài, lập kế hoạch và phân chia công việc trong nhóm.
- Xác định chức năng.
- Thiết kế dữ liệu.
- Vẽ kiến trúc tổng quan.

## Các công việc đã thực hiện:

| Ngày | Công việc | Nguồn tài liệu |
|---|---|---|
| 19/09/2026 | Thảo luận đề tài NetMon, lập kế hoạch triển khai và phân công công việc trong nhóm ba người: hạ tầng mạng và EC2; backend Serverless; giám sát, giao diện và kiểm thử. Xác định chức năng thêm/sửa/xóa/xem thiết bị, cập nhật CPU/RAM, trạng thái ONLINE/OFFLINE và lưu lịch sử cảnh báo. | — |
| 21/09/2026 | Phác thảo bảng NetworkDevices và NetworkAlerts cùng các thuộc tính deviceId, status, cpuUsage, memoryUsage và lastUpdated. | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| 24/09/2026 | Làm rõ đường đi frontend → API Gateway → Lambda → DynamoDB, cùng luồng CloudWatch/SNS. | [API Gateway + Lambda + DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) |

## Kết quả đạt được tuần 7:

- Có kế hoạch làm việc nhóm, phân công nhiệm vụ và danh sách chức năng chính cần có.
- Có lược đồ dữ liệu để chuẩn bị triển khai.
- Có sơ đồ kiến trúc hệ thống cho nhóm.
