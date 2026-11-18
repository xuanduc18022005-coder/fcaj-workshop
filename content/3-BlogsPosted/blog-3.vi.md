+++
title = "3.3. Blog 3: Tự động xử lý tài liệu qua email bằng Amazon Bedrock và SES"
weight = 3
translationKey = "blog-3"
+++

## Bài toán nhận tài liệu qua email
Doanh nghiệp thường nhận hóa đơn, hồ sơ và tài liệu hỗ trợ từ nhiều người gửi. Nếu nhân viên phải tải tệp và phân loại từng email thủ công, việc xử lý chậm và dễ bỏ sót. Kiến trúc mẫu của AWS tiếp cận vấn đề này bằng pipeline nhận thư và xử lý theo sự kiện.

## Luồng xử lý
Amazon SES Mail Manager tiếp nhận email theo quy tắc routing. Tệp đính kèm và dữ liệu được lưu trong Amazon S3 tùy cấu hình; Lambda xử lý nội dung và gọi Amazon Bedrock để hỗ trợ phân loại. DynamoDB giữ metadata và trạng thái để các thành phần khác có thể tiếp tục xử lý. CDK trong demo giúp triển khai các tài nguyên liên quan.

{{< photo src="blogs/email-pipeline.svg" alt="Sơ đồ luồng xử lý – minh họa kỹ thuật" caption="Sơ đồ luồng xử lý – minh họa kỹ thuật" >}}

## AI hỗ trợ, không thay thế kiểm tra
Mô hình có thể đề xuất nhóm tài liệu và mức ưu tiên, nhưng kết quả có thể sai hoặc bị ảnh hưởng bởi nội dung độc hại trong email. Không nên cho phép chỉ dẫn trong thư tự thay đổi quyền hoặc thực hiện thao tác nhạy cảm. Cần kiểm tra loại tệp, giới hạn kích thước, quyền truy cập S3, mã hóa và quy trình duyệt khi có dữ liệu nhạy cảm.

## Thử nghiệm
Đọc README về điều kiện SES, domain và quyền Bedrock trước khi triển khai CDK. Dùng email giả lập, không chứa thông tin cá nhân, kiểm tra tệp được đưa vào S3 và metadata trong DynamoDB. So sánh kết quả phân loại với nhãn mong đợi. Xóa stack và kiểm tra các dịch vụ/add-on có thể tiếp tục phát sinh phí.

## Điều đáng chú ý
Điểm hay là AI chỉ là một khâu trong luồng có kiểm soát, không phải toàn bộ hệ thống. Đây là ví dụ độc lập về tự động hóa nghiệp vụ bằng AWS, không thuộc dự án NetMon.

> **Bài viết gốc (AWS):** [Automate emailed document processing with Amazon Bedrock and SES](https://aws.amazon.com/blogs/messaging-and-targeting/build-an-ai-email-pipeline-with-amazon-bedrock-and-ses-mail-manager/)
>
> **Mã nguồn demo trên GitHub:** [sample-amazon-ses-mail-manager-attachment-pipeline](https://github.com/aws-samples/sample-amazon-ses-mail-manager-attachment-pipeline)
