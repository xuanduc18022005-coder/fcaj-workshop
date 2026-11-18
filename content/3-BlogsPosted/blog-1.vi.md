+++
title = "3.1. Blog 1: Xử lý dữ liệu hàng loạt hiệu quả với AWS Lambda và Amazon SQS"
weight = 1
translationKey = "blog-1"
+++

## Khi lượng công việc tăng đột biến
Một ứng dụng có thể nhận hàng trăm bản ghi trong một thời gian ngắn. Nếu mỗi yêu cầu buộc hệ thống xử lý ngay, việc tăng tải dễ kéo theo thời gian chờ và lỗi. SQS giúp tách quá trình tiếp nhận khỏi xử lý, còn Lambda đọc các thông điệp theo batch.

## Xử lý song song trong một lần gọi Lambda
Trong giải pháp mẫu, một hàm nhận một nhóm thông điệp, phân chia công việc cho các worker chạy đồng thời rồi chờ tất cả hoàn thành trước khi trả kết quả. Với tác vụ chờ I/O, cách này có thể giảm thời gian thực thi mà không cần tăng số lần gọi hàm tương ứng. Nếu công việc phụ thuộc thứ tự, cần thiết kế khác để không làm sai trình tự.

{{< photo src="blogs/lambda-batch.svg" alt="Sơ đồ luồng xử lý – minh họa kỹ thuật" caption="Sơ đồ luồng xử lý – minh họa kỹ thuật" >}}

## Nếu một bản ghi bị lỗi thì sao?
Với SQS, cấu hình `ReportBatchItemFailures` cho event source mapping cho phép báo lại ID của từng thông điệp xử lý thất bại. Các bản ghi thành công không cần bị xử lý lại chỉ vì một bản ghi lỗi. Tuy nhiên, SQS có thể chuyển phát lặp, vì vậy thao tác ghi cần có tính idempotent. Có thể dùng khóa nghiệp vụ hoặc điều kiện ghi DynamoDB để ngăn xử lý trùng.

## Thực hành với mã nguồn mẫu
1. Đọc README và xem cấu trúc CDK cùng Lambda Node.js trong repository.
2. Trong tài khoản lab, triển khai theo README; gửi một batch thông điệp thử có ít nhất một bản ghi lỗi.
3. So sánh Duration, Errors, ConcurrentExecutions và độ dài hàng đợi; kiểm tra các thông điệp cần retry.
4. Dọn stack, kiểm tra hàng đợi và log group sau bài thực hành.

## Điều tôi rút ra
Không phải cứ thêm Lambda là giải quyết được mọi vấn đề về hiệu năng. Cần tìm phần đang chờ I/O, đo thời gian và chọn mức concurrency phù hợp. Đây là kiến thức tham khảo cho thiết kế xử lý sự kiện, không phải chức năng SQS đang chạy trong NetMon.

> **Bài viết gốc (AWS):** [Efficient batch processing with AWS Lambda and Amazon SQS](https://aws.amazon.com/blogs/compute/efficiently-processing-batched-data-using-parallelization-in-aws-lambda/)
>
> **Mã nguồn demo trên GitHub:** [lambda-with-multithreading](https://github.com/aws-samples/lambda-with-multithreading)
