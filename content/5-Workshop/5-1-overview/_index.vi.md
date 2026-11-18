+++
title = "5.1. Tổng quan"
weight = 1
translationKey = "ws-overview"
+++

## Giới thiệu

NetMon Cloud là hệ thống quản lý và giám sát hạ tầng mạng cho doanh nghiệp vừa và nhỏ, xây dựng trên AWS kết hợp mô hình Serverless. Workshop mô tả cách tái hiện hệ thống từ môi trường AWS đến giao diện quản lý. Region sử dụng trong mã nguồn là **US East (N. Virginia) – us-east-1**.

## Mục tiêu Workshop

- Xây dựng môi trường mạng riêng và giám sát một máy chủ EC2.
- Xây dựng API quản lý thiết bị với Lambda, DynamoDB và API Gateway.
- Xác thực người dùng với Cognito, Authorization Code + PKCE và JWT Authorizer.
- Cập nhật CPU/RAM mô phỏng, phát hiện vượt ngưỡng, gửi SNS và lưu nhật ký.
- Kết nối giao diện NetMon, kiểm thử chức năng và kiểm soát chi phí.

## Kiến trúc hệ thống

{{< photo src="proposal/architecture-vi.svg" alt="Hình 1. Kiến trúc logic NetMon Cloud." caption="Hình 1. Kiến trúc logic NetMon Cloud." >}}

| Thành phần | Vai trò |
|---|---|
| VPC, EC2 | Hạ tầng mạng và máy chủ được giám sát |
| CloudWatch, SNS | Metric thực tế của EC2, cảnh báo và email |
| EventBridge Scheduler | Gọi Lambda mô phỏng theo lịch |
| Lambda, DynamoDB Streams | CRUD, mô phỏng, phát hiện cảnh báo và ghi nhật ký |
| DynamoDB | Dữ liệu thiết bị, cấu hình, cảnh báo, nhật ký |
| API Gateway, Cognito | HTTP API, xác thực JWT và phân quyền theo scope |
| HTML, CSS, JavaScript | Dashboard NetMon chạy bằng Live Server |

## Luồng hoạt động

**Quản lý:** trình duyệt đăng nhập Cognito, lấy access token và gửi HTTP request qua API Gateway; JWT Authorizer kiểm tra token trước khi Lambda xử lý DynamoDB.

**Giám sát:** EC2 gửi metric CloudWatch; với thiết bị mô phỏng, Scheduler gọi simulator mỗi phút, simulator cập nhật bản ghi đến hạn. DynamoDB Streams kích hoạt monitor và audit writer. Monitor kiểm tra ngưỡng, lưu cảnh báo và gửi SNS khi được cấu hình; audit writer lưu thay đổi thiết bị. CloudWatch Alarm EC2 hoạt động riêng, không phải mọi email từ CloudWatch đều được ghi vào NetworkAlerts.

## Phạm vi và minh chứng

Router/switch trong phiên bản này là thiết bị mô phỏng, không kết nối SNMP tới thiết bị vật lý. Đường nối trên sơ đồ giao diện là quan hệ quản lý logic. Dữ liệu EC2 chỉ là số liệu thực khi backend AWS và agent hoạt động. Workshop được dựng theo gói mã NetMon Cloud Cấu Hình Metrics do nhóm cung cấp; sơ đồ và ảnh demo minh họa, chưa đối chiếu trực tiếp AWS Console. Các giá trị ví dụ cần thay bằng tài nguyên hiện có của nhóm trước khi thao tác.

**Ảnh giao diện liên quan:** [Tổng quan hệ thống](../#netmon-overview) · [Kiến trúc AWS và sơ đồ mạng](../#netmon-topology).
