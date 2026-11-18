+++
title = "5.2.1. Đăng nhập AWS và chọn Region"
weight = 1
translationKey = "ws-1-1"
+++

## Chuẩn bị

- Tài khoản AWS có quyền được cấp cho VPC, EC2, DynamoDB, Lambda, API Gateway, Cognito, CloudWatch, SNS và EventBridge; chọn `us-east-1`.
- VS Code, Live Server, trình duyệt và thư mục chứa `index.html`, `app.js`, `auth.js`, `style.css`, `AWS_BACKEND_CODE`.
- Một email nhận cảnh báo có thể xác nhận subscription. Bật MFA, không dùng root cho thao tác thường ngày.

## Kiểm tra trước khi triển khai

1. Vào [AWS Console](https://console.aws.amazon.com/) và kiểm tra region, tài nguyên hiện có, quyền và Billing/Budgets.
2. Nếu nhóm đã có API, bảng, IAM role hoặc agent hoạt động, sử dụng lại thay vì tạo trùng. Sao lưu cấu hình trước khi sửa.
3. Chạy Live Server tại `http://localhost:5500/` vì callback Cognito trong mã nguồn dùng địa chỉ này. Không đưa Access Key, Secret, JWT hay ID tài khoản vào báo cáo công khai.

Tài liệu: [IAM best practices](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

## Chuẩn bị thư mục làm việc

Mở đúng thư mục gói NetMon, không phải thư mục ZIP bên ngoài. Kiểm tra có `index.html`, `auth.js` và `AWS_BACKEND_CODE`. Trong VS Code, mở Extensions, cài Live Server nếu chưa có. Dùng AWS Console của tài khoản nhóm đã được phân quyền, kiểm tra Region ở góc trên bên phải. Ghi lại tên tài nguyên và Region trong một tệp cấu hình riêng tại máy, không commit mật khẩu hoặc thông tin phiên đăng nhập.

**Minh chứng cần lưu:** màn hình chọn Region và danh sách tài nguyên của nhóm (che các định danh nội bộ).

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

Chọn Region ở góc trên Console: US East (N. Virginia), mã us-east-1. Kiểm tra trước khi mở dịch vụ.

{{< photo src="workshop/aws-console/01-aws-region-us-east-1.png" alt="Chọn Region ở góc trên Console: US East (N. Virginia), mã us-east-1. Kiểm tra trước khi mở dịch vụ." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

