+++
title = "1.9. Worklog Tuần 9"
weight = 9
translationKey = "week-09"
+++

## Mục tiêu tuần 9:

- Tìm hiểu kiến trúc Serverless cho hệ thống NetMon.
- Triển khai DynamoDB, Lambda và API Gateway phục vụ quản lý thiết bị mạng.
- Kiểm tra các chức năng thêm, sửa, xóa và xem thiết bị.

## Các công việc đã thực hiện:

| Ngày | Công việc | Nguồn tài liệu |
|---|---|---|
| 17/10/2026 | Tìm hiểu DynamoDB và thiết kế bảng NetworkDevices với khóa deviceId, thông tin thiết bị và trạng thái. | [Amazon DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html) |
| 19/10/2026 | Tìm hiểu và triển khai Lambda xử lý các chức năng CRUD, cấu hình IAM Role để truy cập DynamoDB. | [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html) |
| 22/10/2026 | Triển khai HTTP API với API Gateway, cấu hình các tuyến /devices và /devices/{id}, kiểm tra dữ liệu trả về bằng HTML/JavaScript. | [API Gateway + Lambda + DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html) |

## Kết quả đạt được tuần 9:

- Có bảng dữ liệu phục vụ quản lý thiết bị.
- Hoàn thiện các API quản lý thiết bị cơ bản để kiểm thử.
- Hiểu luồng gửi yêu cầu qua API Gateway, Lambda và DynamoDB.
