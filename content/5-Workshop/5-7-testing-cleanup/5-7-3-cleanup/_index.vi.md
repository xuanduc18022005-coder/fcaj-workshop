+++
title = "5.7.3. Dọn dẹp tài nguyên sau demo"
weight = 3
translationKey = "ws-6-3"
+++

## Dọn dẹp sau Workshop

Chỉ thực hiện khi nhóm kết thúc demo và không cần giữ tài nguyên; sao lưu trước, hỏi các thành viên dùng chung tài khoản.

1. Tắt lịch EventBridge và trigger không còn dùng; tắt alarm actions khi dừng demo.
2. Xóa API, Lambda và Cognito chỉ khi chắc chắn không phục vụ hệ thống khác. Gỡ event source mapping trước khi xóa bảng/stream.
3. Export dữ liệu cần giữ; xóa các bảng DynamoDB thử nghiệm và log groups không còn dùng theo chính sách lưu trữ.
4. Xóa subscription/topic SNS nếu không còn dùng. Dừng hoặc terminate EC2 theo nhu cầu; kiểm tra EBS, snapshot và public IPv4 còn phát sinh phí.
5. Gỡ tài nguyên mạng phụ thuộc, route/IGW/subnet/VPC chỉ khi không dùng chung. Rà IAM role và quyền dư thừa.
6. Kiểm tra Billing và Cost Explorer sau khi dữ liệu chi phí cập nhật; không giả định xóa ứng dụng là hết phí. Giữ AWS Budget phù hợp.

Tài liệu: [AWS Billing](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/billing-what-is.html).

## Thứ tự xác nhận

Trước khi xóa, lập danh sách tài nguyên theo Region và xác nhận với cả ba thành viên. Tắt lịch và mapping trước để dừng phát sinh sự kiện; lưu dữ liệu cần giữ rồi mới xóa tài nguyên đích. Khi demo chưa kết thúc, chỉ dừng phần không cần thiết theo thống nhất của nhóm. Kiểm tra EBS, địa chỉ IPv4, log, snapshot và Budget sau dọn dẹp. Không xóa nhầm VPC hoặc IAM role dùng chung.

