+++
title = "4.1. Event 1 – Prove It Day 01"
weight = 1
translationKey = "event-1"
+++

**Tên sự kiện:** Prove It – Agentic Cloud Investigation Series, Day 01: GOVERN – Observe Before You Act

**Thời gian:** Thứ Bảy, 05/09/2026, 09:00–12:00.

**Đơn vị tổ chức:** CloudThinker phối hợp với First Cloud AI Journey (FCAJ).

## Mục đích của sự kiện

- Giới thiệu cách quản trị AI Agent khi làm việc trong môi trường điện toán đám mây.
- Tìm hiểu vai trò của Agent Supervisor và cách xác định phạm vi hoạt động của Agent.
- Rèn luyện tư duy quan sát, phân tích và kiểm chứng thông tin trước khi quyết định thay đổi hệ thống.
- Nhận biết rủi ro khi trao quyền truy cập tài nguyên Cloud cho công cụ AI.

## Đơn vị tổ chức và hướng dẫn

- **CloudThinker:** Đơn vị phối hợp tổ chức chuỗi workshop thực hành về AI Agent và điều tra sự cố Cloud.
- **First Cloud AI Journey (FCAJ):** Cộng đồng phối hợp tổ chức và hỗ trợ hoạt động học tập.

## Nội dung nổi bật

### Vai trò Agent Supervisor

AI Agent có thể hỗ trợ rà soát và tổng hợp thông tin về tài nguyên Cloud. Tuy nhiên, người giám sát cần xác định phạm vi nhiệm vụ, kiểm soát quyền và đánh giá kết quả trước khi đưa ra quyết định. Việc Agent đưa ra một khuyến nghị không có nghĩa là khuyến nghị đó đã được kiểm chứng.

### Quản trị quyền và phạm vi hoạt động

- **Scope:** Xác định tài nguyên và nhiệm vụ mà Agent được phép tiếp cận.
- **Least privilege:** Chỉ cấp những quyền cần thiết cho nhiệm vụ; không mặc định cấp quyền thay đổi tài nguyên khi mục tiêu chỉ là quan sát.
- **Guardrails:** Đặt giới hạn để giảm nguy cơ Agent thực hiện thao tác ngoài phạm vi cho phép.
- **Human oversight:** Duy trì bước kiểm tra của con người trước các quyết định quan trọng.

### Quan sát và kiểm chứng bằng chứng

Trong tình huống thực hành trên môi trường demo, người học tiếp cận quy trình rà soát tài nguyên, xem xét phát hiện của Agent, đối chiếu bằng chứng và tổng hợp kết quả thành Agentic Cloud Review. Mục tiêu là hiểu nguyên nhân của một nhận định thay vì chỉ chấp nhận câu trả lời do AI sinh ra.

Môi trường thực hành không yêu cầu cung cấp thông tin đăng nhập AWS cá nhân. Việc điều tra và đề xuất không đồng nghĩa với việc tự động chỉnh sửa hạ tầng.

## Những gì học được

### Tư duy quản trị Cloud

- Phân biệt giữa quyền quan sát và quyền thực thi thao tác.
- Hiểu vì sao quyền truy cập cần được giới hạn theo mục đích sử dụng.
- Nhận thức được vai trò của con người trong việc đánh giá các khuyến nghị do AI tạo ra.

### Kỹ năng phân tích

- Xác định câu hỏi cần giải quyết trước khi thu thập dữ liệu.
- Đối chiếu kết quả phân tích với cấu hình và dữ liệu có liên quan.
- Trình bày phát hiện theo hướng nêu rõ vấn đề, bằng chứng, ảnh hưởng và giải pháp đề xuất.

## Ứng dụng vào công việc

- Áp dụng nguyên tắc quyền tối thiểu cho IAM Role của Lambda trong NetMon Cloud.
- Phân biệt các thao tác đọc danh sách thiết bị và các thao tác thêm, sửa, xóa dữ liệu khi thiết kế API.
- Kiểm tra trạng thái thiết bị, dữ liệu CloudWatch và nhật ký trước khi xác định nguyên nhân cảnh báo.
- Nếu mở rộng hệ thống bằng AI trong tương lai, ưu tiên hỗ trợ phân tích trước khi cho phép AI thay đổi tài nguyên.

## Trải nghiệm trong sự kiện

Điều tôi quan tâm nhất ở chủ đề GOVERN là cách kết hợp khả năng hỗ trợ của AI với các nguyên tắc bảo mật trên Cloud. Một công cụ có thể xử lý nhiều thông tin nhanh chóng, nhưng vẫn cần giới hạn quyền và có người chịu trách nhiệm kiểm tra kết quả.

### Học hỏi từ tình huống thực tế

Cách tổ chức bài thực hành theo vai trò Agent Supervisor giúp tôi hình dung rõ sự khác biệt giữa việc sử dụng AI để tìm thông tin và việc giao cho AI quyền vận hành hệ thống. Đây là kiến thức hữu ích khi làm quen với IAM và các dịch vụ Serverless.

### Bài học rút ra

Tôi cần hình thành thói quen kiểm tra bằng chứng, ghi lại quá trình phân tích và không vội kết luận khi chỉ có một nguồn thông tin. Khi triển khai hệ thống quản lý mạng, việc xác định rõ quyền của từng thành phần cũng quan trọng như việc xây dựng chức năng.

## Hình ảnh chương trình

{{< photo src="events/event-1-activity.jpg" alt="Buổi chia sẻ về quản trị AI Agent" >}}
