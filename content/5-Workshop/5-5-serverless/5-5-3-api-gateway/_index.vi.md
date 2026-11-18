+++
title = "5.5.3. Xây dựng HTTP API Gateway"
weight = 3
translationKey = "ws-4-3"
+++

## Tạo và cấu hình API

1. Vào API Gateway → HTTP API, tích hợp Lambda `netmon-api`. Kiểm tra stage và Invoke URL, không ghi URL nội bộ lên báo cáo.
2. Tạo các route theo mã nguồn và gắn đúng Lambda integration.

| Method | Route | Mục đích |
|---|---|---|
| GET, POST | `/devices` | Danh sách, thêm mới |
| GET, PUT, DELETE | `/devices/{id}` | Chi tiết, sửa, xóa |
| GET | `/metrics`, `/alerts`, `/logs` | Đọc giám sát, cảnh báo, nhật ký |
| PUT | `/alerts/{id}` | Đổi trạng thái xử lý |
| GET, PUT | `/settings`, `/simulation/config` | Ngưỡng, chu kỳ mô phỏng |
| GET | `/sns/status` | Kiểm tra cấu hình SNS |

3. Cấu hình CORS origin `http://localhost:5500`, methods GET/POST/PUT/DELETE/OPTIONS, headers Authorization và Content-Type. Preflight phải được xử lý mà không yêu cầu token.
4. Deploy stage nếu không bật auto-deploy. Nhập Invoke URL tương ứng vào dự án riêng; không thêm Access Key vào JavaScript.

## Kiểm tra

Kiểm tra route, Lambda integration và stage. Tiếp tục mục 5.6.1 để cấu hình Cognito và mục 5.6.2 để bảo vệ route trước khi gọi API. [CORS](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-cors.html).

## Kiểm tra route

Mã nguồn hiện hỗ trợ 14 cặp method/path trong bảng trên. Đối chiếu từng route với integration và cấu hình JWT ở mục 5.6.2; không tự nhận tất cả route đã được triển khai. `GET /metrics` xử lý lịch sử EC2 qua query string, không cần route riêng.

## Kiểm tra cấu hình từng route

Vào API Gateway → APIs → chọn HTTP API → Routes. Chọn từng method/path rồi kiểm tra Integration target `netmon-api`. Trong Integrations, kiểm tra payload format 2.0; rawPath và requestContext.http là các trường mã Python sử dụng. Kiểm tra stage `$default` (hoặc stage nhóm đã có) và URL gốc, không gắn `/devices` hai lần. Trong CORS, Origin không có dấu `/` ở cuối, cho phép `Authorization` và `Content-Type`. Nếu dùng catch-all route có authorizer, cấu hình OPTIONS phù hợp để preflight không bị bảo vệ.

| Lỗi | Kiểm tra |
|---|---|
| 404 | Route, stage, URL và rawPath |
| 401/403 | JWT, scope hoặc quyền truy cập |
| 500/502 | Integration, handler, log Lambda, quyền bảng |
| CORS | Origin, methods, allowed headers, preflight |

Chỉ sau khi hoàn tất 5.6 mới gọi các route bảo vệ bằng token thật.

## Hình ảnh minh họa và minh chứng

{{< photo src="workshop/evidence/03_API_Gateway_simulation_routes.png" alt="Route cấu hình mô phỏng trong API Gateway Console." caption="Ảnh AWS do người dùng cung cấp. Route cấu hình mô phỏng trong API Gateway Console." >}}

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

API Gateway → netmon-management-api → Routes: tạo hoặc đối chiếu danh sách method/path. Ảnh thuộc phiên bản trước; bổ sung route metrics/settings/simulation theo mã hiện tại.

{{< photo src="workshop/aws-console/38-api-gateway-netmon-management-api-routes.png" alt="API Gateway → netmon-management-api → Routes: tạo hoặc đối chiếu danh sách method/path. Ảnh thuộc phiên bản trước; bổ sung route metrics/settings/simulation theo mã hiện tại." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

Integrations: chọn route → Attach integration → Lambda netmon-api.

{{< photo src="workshop/aws-console/40-api-gateway-integrations-netmon-api.png" alt="Integrations: chọn route → Attach integration → Lambda netmon-api." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 3

CORS: Allowed origins, methods và headers phải khớp nơi chạy frontend.

{{< photo src="workshop/aws-console/41-api-gateway-cors-localhost-5500.png" alt="CORS: Allowed origins, methods và headers phải khớp nơi chạy frontend." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 4

Stages → $default: kiểm tra Auto-deploy; nếu tắt, triển khai lại sau khi sửa cấu hình.

{{< photo src="workshop/aws-console/42-api-gateway-default-stage-auto-deploy.png" alt="Stages → $default: kiểm tra Auto-deploy; nếu tắt, triển khai lại sau khi sửa cấu hình." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

