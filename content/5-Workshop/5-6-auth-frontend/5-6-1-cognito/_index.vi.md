+++
title = "5.6.1. Tạo Cognito User Pool và Web Client"
weight = 1
translationKey = "ws-5-1"
+++

## Mục tiêu

Sử dụng Amazon Cognito User Pool để đăng nhập vào NetMon Cloud và cấp access token cho giao diện. Cognito xác thực người dùng; việc kiểm tra quyền gọi API được thực hiện tại mục 5.6.2.

## Các bước thực hiện

1. Vào Amazon Cognito tại region `us-east-1`, mở User Pool hiện có hoặc tạo User Pool cho môi trường thử nghiệm.
2. Trong App clients, kiểm tra hoặc tạo public app client (không có client secret). Cấu hình managed login và domain của User Pool.
3. Chọn luồng OAuth 2.0 Authorization Code, sử dụng PKCE. Khai báo callback URL chính xác là `http://localhost:5500/` cho môi trường Live Server.
4. Tạo resource server với identifier `netmon-api` và hai scope `read`, `write`. Cho phép các scope tương ứng ở app client, cùng `openid` và `email`.
5. Tạo hoặc kiểm tra người dùng thử nghiệm. Trong `auth.js`, đối chiếu domain, app client ID và redirect URI với giá trị của User Pool đang dùng. Không công khai mật khẩu, token hay khóa AWS.

## Luồng đăng nhập

Người dùng → Cognito managed login → authorization code → giao diện đổi code và PKCE verifier lấy access token → gọi API Gateway.

Trong mã NetMon, `auth.js` kiểm tra `state` khi nhận callback, gọi `/oauth2/token` và lưu access token cùng thời hạn trong `sessionStorage`. Khi hết hạn, giao diện cần đăng nhập lại. Không dùng ID token thay access token để gọi API có scope.

## Kiểm tra

Mở NetMon tại `http://localhost:5500/` và chọn Đăng nhập AWS. Sau khi đăng nhập, Cognito phải chuyển về đúng callback. Tiếp tục cấu hình JWT Authorizer trước khi kiểm thử API. Đây là hướng dẫn và kết quả mong đợi, chưa xác nhận cấu hình thực tế trên Console.

## Tài liệu tham khảo

- [Authorization Code và PKCE](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html)
- [Resource server và custom scopes](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-pools-define-resource-servers.html)

## Các trường cần đối chiếu trong Console

| Trường | Cấu hình |
|---|---|
| App type | Public client, không tạo secret cho browser |
| OAuth grant | Authorization code grant |
| Callback URL | http://localhost:5500/ |
| Resource server identifier | netmon-api |
| Custom scopes | netmon-api/read; netmon-api/write |
| Standard scopes | openid; email |

Trong User management → Users, tạo tài khoản lab bằng địa chỉ được phép sử dụng. Nếu có mật khẩu tạm thời, hoàn thành lần đăng nhập đầu theo Cognito; không đưa mật khẩu vào báo cáo. Kiểm tra phần Managed login/Domain để URL trong `auth.js` trùng domain. Ghi lại User Pool ID và Client ID trong cấu hình riêng, che khi chụp minh chứng.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Cognito → User pools → chọn pool của NetMon; xem User pool overview.

{{< photo src="workshop/aws-console/43-cognito-user-pool-overview.png" alt="Cognito → User pools → chọn pool của NetMon; xem User pool overview." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

App clients → netmon-web-client: kiểm tra loại public client và thông số token.

{{< photo src="workshop/aws-console/44-cognito-app-client-netmon-web-client.png" alt="App clients → netmon-web-client: kiểm tra loại public client và thông số token." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 3

Resource servers → netmon-api: kiểm tra hai scope read và write.

{{< photo src="workshop/aws-console/45-cognito-resource-server-netmon-api-scopes.png" alt="Resource servers → netmon-api: kiểm tra hai scope read và write." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 4

Domain: xác nhận domain managed login được sử dụng trong auth.js.

{{< photo src="workshop/aws-console/46-cognito-domain-managed-login-issuer.png" alt="Domain: xác nhận domain managed login được sử dụng trong auth.js." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 5

App client → Login pages: đối chiếu callback URL, OAuth grant và allowed scopes.

{{< photo src="workshop/aws-console/47-cognito-app-client-managed-login-pages-oauth-scopes.png" alt="App client → Login pages: đối chiếu callback URL, OAuth grant và allowed scopes." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

