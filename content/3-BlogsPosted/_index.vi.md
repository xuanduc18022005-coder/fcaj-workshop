+++
title = "3. Các bài Blog đã đăng"
weight = 3
translationKey = "blogs"
+++

Phần này tổng hợp và giới thiệu ba bài blog kỹ thuật mà tôi đã tìm hiểu và viết trong quá trình thực tập. Mỗi bài trình bày một giải pháp trên AWS, kèm sơ đồ minh họa, bài viết gốc và mã nguồn thực hành để tham khảo.

## [Blog 1 - XỬ LÝ DỮ LIỆU HÀNG LOẠT HIỆU QUẢ VỚI AWS LAMBDA VÀ AMAZON SQS](blog-1/)

Bài blog giới thiệu cách sử dụng Amazon SQS kết hợp AWS Lambda để xử lý nhiều thông điệp theo lô. Nội dung làm rõ cách xử lý song song trong một lần gọi hàm, cơ chế xử lý lỗi từng thông điệp và hạn chế xử lý dữ liệu trùng lặp. Qua đó, người đọc có thể hiểu cách nâng cao hiệu quả xử lý tác vụ bất đồng bộ trên AWS.

## [Blog 2 - ĐIỀU TRA LỖI NHANH HƠN VỚI STRUCTURED LOGS TRÊN AMAZON CLOUDWATCH](blog-2/)

Bài blog tìm hiểu cách sử dụng log có cấu trúc JSON để giám sát ứng dụng và hỗ trợ điều tra sự cố. Nội dung giải thích cách truy vấn dữ liệu bằng CloudWatch Logs Insights, trích xuất chỉ số với Embedded Metric Format (EMF) và phân tích độ trễ, lỗi theo từng dịch vụ để xác định khu vực cần kiểm tra.

## [Blog 3 - TỰ ĐỘNG XỬ LÝ TÀI LIỆU QUA EMAIL BẰNG AMAZON BEDROCK VÀ SES](blog-3/)

Bài blog giới thiệu giải pháp tự động tiếp nhận và phân loại tài liệu gửi qua email bằng Amazon SES Mail Manager, AWS Lambda và Amazon Bedrock. Nội dung mô tả cách lưu trữ tệp trên Amazon S3, quản lý thông tin xử lý bằng DynamoDB, đồng thời phân tích những lưu ý về bảo mật và kiểm chứng kết quả do AI tạo ra.
