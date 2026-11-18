+++
title = "5.6.3. Đăng nhập PKCE và gọi API"
weight = 3
translationKey = "ws-5-4"
+++

## Các bước
1. Đối chiếu API URL, domain Cognito, client ID và callback trong `auth.js` với cấu hình đã có. Mở VS Code, chạy `index.html` bằng Live Server tại `http://localhost:5500/`.
2. Chọn Đăng nhập AWS. Cognito managed login nhận thông tin người dùng và trả authorization code về callback.
3. `auth.js` kiểm tra state, dùng PKCE verifier đổi code tại token endpoint. `app.js` gửi access token theo header `Authorization: Bearer ...`.
4. Mở DevTools → Network và kiểm tra GET `/devices`. Kiểm tra 401 khi thiếu/hết hạn token và 403 khi scope không đủ. Không chụp hoặc công khai token.

## Kiểm tra
Đăng nhập thành công và dữ liệu AWS hiển thị khi cấu hình đúng; demo offline chỉ minh họa UI.

[PKCE in Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/using-pkce-in-authorization-code.html)

## Đọc mã xác thực trong dự án

Trong `auth.js`, `signIn()` tạo verifier, state và SHA-256 challenge; `complete()` đối chiếu state và gọi token endpoint để đổi authorization code. Phiên được lưu trong sessionStorage của tab, không lưu mật khẩu. Trong `app.js`, `awsRequest()` kiểm tra phiên trước khi gắn Authorization.

Nếu Cognito báo redirect mismatch, kiểm tra URL callback và port 5500, kể cả dấu gạch cuối. Nếu trang trả về thư mục listing, mở Live Server từ thư mục chứa index.html. Nếu 401, đăng nhập lại và kiểm tra issuer/audience; nếu 403, kiểm tra scope và route. Không chụp màn hình Network Headers chứa token.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Mở managed login để kiểm tra trang đăng nhập Cognito; nhập tài khoản lab được cấp, không chụp mật khẩu hoặc token.

{{< photo src="workshop/aws-console/48-cognito-managed-login-sign-in.png" alt="Mở managed login để kiểm tra trang đăng nhập Cognito; nhập tài khoản lab được cấp, không chụp mật khẩu hoặc token." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

**Ảnh giao diện liên quan:** [Đăng nhập và xác thực](../../#netmon-login).
