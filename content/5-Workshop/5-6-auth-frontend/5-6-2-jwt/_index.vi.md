+++
title = "5.6.2. Xác thực JWT Authorizer và OAuth Scopes"
weight = 2
translationKey = "ws-5-2"
+++

## Mục tiêu

Bảo vệ HTTP API của NetMon bằng JWT Authorizer tại Amazon API Gateway. Chỉ yêu cầu có access token hợp lệ và scope phù hợp mới được chuyển đến Lambda.

## Cấu hình JWT Authorizer

1. Mở API Gateway → HTTP API của NetMon → Authorization → Manage authorizers. Tạo hoặc kiểm tra authorizer kiểu JWT, ví dụ `netmon-jwt-authorizer`.
2. Thiết lập các giá trị sau, sử dụng thông tin User Pool và app client thực tế:

| Tham số | Giá trị |
|---|---|
| Identity source | `$request.header.Authorization` |
| Issuer | `https://cognito-idp.us-east-1.amazonaws.com/<USER_POOL_ID>` |
| Audience | App client ID của Cognito |
| Authorization type | JWT |

Issuer là URL định danh User Pool, không phải domain trang đăng nhập. Với access token Cognito thông thường, API Gateway kiểm tra `client_id` khi token không có `aud`. Nếu có `aud`, giá trị đó phải khớp audience đã cấu hình.

3. Trong Authorization hoặc Routes, gắn authorizer vào từng route cần bảo vệ và quy định scope phù hợp. Bảng dưới là phương án cấu hình theo các route trong mã nguồn, cần đối chiếu với Console:

| Route | Scope đề xuất |
|---|---|
| GET `/devices`, `/devices/{id}`, `/metrics`, `/alerts`, `/logs`, `/settings`, `/simulation/config`, `/sns/status` | `netmon-api/read` |
| POST `/devices`; PUT, DELETE `/devices/{id}` | `netmon-api/write` |
| PUT `/alerts/{id}`, `/settings`, `/simulation/config` | `netmon-api/write` |

4. Kiểm tra CORS cho origin `http://localhost:5500`, header `Authorization`, `Content-Type` và methods phù hợp. Không yêu cầu JWT cho CORS preflight OPTIONS. Deploy stage nếu auto-deploy chưa bật.

## Luồng xác thực

{{< photo src="workshop/jwt-flow.svg" alt="Luồng xác thực OAuth 2.0, PKCE và JWT (sơ đồ kỹ thuật)." caption="Luồng xác thực OAuth 2.0, PKCE và JWT (sơ đồ kỹ thuật)." >}}


Cognito cấp access token → giao diện gửi token → JWT Authorizer xác minh chữ ký, issuer, audience, thời hạn và scope → Lambda xử lý → DynamoDB trả dữ liệu.

Trong `app.js`, hàm `awsRequest` lấy token từ `netmonAuth.token()` và gắn header khi gọi API Cognito:

```javascript
const token = netmonAuth.token();
// Chỉ gửi yêu cầu sau khi đã có access token.
headers.set('Authorization', `Bearer ${token}`);
```

Không chèn token thật vào báo cáo hoặc ảnh chụp.

## Kiểm thử

| Trường hợp | Kết quả mong đợi |
|---|---|
| Access token hợp lệ, có scope đọc, GET `/devices` | API chuyển yêu cầu đến Lambda; HTTP 200 nếu xử lý thành công |
| Thiếu token, token sai hoặc hết hạn | HTTP 401 Unauthorized trên route được bảo vệ |
| Token hợp lệ nhưng không đủ scope | HTTP 403 Forbidden |
| Token có scope ghi, gửi yêu cầu CRUD hợp lệ | Lambda xử lý và lưu dữ liệu nếu IAM cho phép |

Kiểm tra tại DevTools → Network; không tắt authorizer để xử lý lỗi 401/403. Đây là các ca kiểm thử dự kiến, chưa thực hiện trên AWS Console của nhóm. Scope là quyền gọi API, không thay thế IAM execution role của Lambda.

## Tài liệu tham khảo

- [JWT Authorizer cho HTTP API](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html)
- [Khắc phục lỗi JWT](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-troubleshooting-jwt.html)

## Quy trình kiểm tra trên API Gateway

Mở HTTP API → Authorization → Manage authorizers → JWT. Đối chiếu Identity source `$request.header.Authorization`, issuer của Cognito User Pool và audience là App Client ID. Trong Attach authorizers, gắn authorizer vào từng route. Các GET cần `netmon-api/read`; POST/PUT/DELETE cần `netmon-api/write` theo thiết kế. Không bảo vệ CORS OPTIONS bằng token. Nếu stage không auto-deploy, triển khai lại stage sau chỉnh sửa.

Chụp màn hình danh sách route cùng authorizer và scope, không chụp access token. Sau khi đăng nhập, thử GET trong giao diện, xem status code tại Network; thử phiên chưa đăng nhập trong trình duyệt mới. Không thay đổi token hay tắt authorizer để làm cho demo hoạt động.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

API Gateway → Authorization → chọn GET /alerts: kiểm tra JWT authorizer và scope netmon-api/read. Lặp lại với các route đọc/ghi cần bảo vệ.

{{< photo src="workshop/aws-console/39-api-gateway-jwt-authorizer-read-scope.png" alt="API Gateway → Authorization → chọn GET /alerts: kiểm tra JWT authorizer và scope netmon-api/read. Lặp lại với các route đọc/ghi cần bảo vệ." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

