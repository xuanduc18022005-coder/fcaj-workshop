+++
title = "4.2. Sự kiện 2 – FCAJ Meetup 17/10"
weight = 2
translationKey = "event-2"
+++

**Tên sự kiện:** First Cloud AI Journey – Community Day / Weekly Meetup Hà Nội

**Thời gian:** Thứ Bảy, 17/10/2026, 09:00–12:00.

**Địa điểm:** Tầng 7, Grand Terra, 36 Cát Linh, Hà Nội.

## Mục đích của sự kiện

- Chia sẻ kinh nghiệm thực tế về bảo mật khi xây dựng ứng dụng AI trên Cloud.
- Giới thiệu cách tổ chức và quản trị hệ thống nhiều tài khoản AWS.
- Tìm hiểu Apache Iceberg và một số xu hướng trong xây dựng nền tảng dữ liệu.
- Nâng cao nhận thức về bảo mật hạ tầng mạng và tạo cơ hội kết nối với cộng đồng công nghệ.

## Danh sách diễn giả

- **Nguyễn Thành Trung** – Software Engineer, FPT Software: Securing Chatbots When Calling LLM APIs.
- **Phạm Minh Quang** – Cloud Engineer, NTQ Solution: Migration Journey: From Disconnected AWS Accounts to a Landing Zone.
- **Vũ Thế Huy** – Data Engineer, Rikkeisoft: Beyond Parquet: Apache Iceberg on AWS.

Chương trình còn có chuyên đề về bảo mật mạng trên AWS.

{{< photo src="events/fcaj-community-day-17-10-poster.jpg" alt="Poster Community Day ngày 17/10/2026" caption="Poster giới thiệu chương trình và các diễn giả" >}}

## Nội dung nổi bật

### Bảo mật chatbot khi gọi LLM API

Chatbot kết nối với mô hình ngôn ngữ không chỉ cần đưa ra phản hồi phù hợp mà còn phải bảo vệ dữ liệu và hệ thống. Những vấn đề được đề cập gồm prompt injection, bảo vệ thông tin nhạy cảm và tích hợp AI Agent an toàn.

- Kiểm tra và giới hạn dữ liệu đầu vào trước khi gửi đến mô hình.
- Không để thông tin nhạy cảm xuất hiện trong lời nhắc hoặc nhật ký nếu không cần thiết.
- Giới hạn quyền công cụ mà Agent có thể sử dụng; không xem câu trả lời của mô hình là cơ chế xác thực.

### Hành trình chuyển đổi sang AWS Landing Zone

Khi nhiều tài khoản AWS được tạo và quản lý riêng lẻ, việc thống nhất chính sách, phân quyền và quản lý tài nguyên có thể trở nên khó khăn. AWS Control Tower hỗ trợ xây dựng môi trường nhiều tài khoản theo hướng có quản trị tập trung.

- Tổ chức tài khoản theo môi trường hoặc mục đích sử dụng.
- Thiết lập các quy tắc quản trị và kiểm soát quyền.
- Giảm phạm vi ảnh hưởng khi một môi trường gặp sự cố.

### Apache Iceberg trên AWS

Apache Iceberg là một định dạng bảng mở cho các nền tảng dữ liệu lớn. Khác với việc chỉ lưu tệp Parquet, Iceberg cung cấp thêm cơ chế quản lý metadata và phiên bản của bảng.

- **Snapshot:** Ghi nhận trạng thái của bảng tại một thời điểm.
- **Time travel:** Hỗ trợ truy vấn lại dữ liệu theo phiên bản đã lưu.
- **Schema evolution:** Cho phép thay đổi cấu trúc bảng linh hoạt hơn.

### Bảo mật mạng trên AWS

Chuyên đề giúp liên hệ các kiến thức về phân đoạn mạng, kiểm soát truy cập và phòng thủ nhiều lớp với việc thiết kế hạ tầng Cloud. Mỗi lớp bảo vệ cần được lựa chọn theo mục đích của dịch vụ thay vì mở rộng quyền truy cập không cần thiết.

## Những gì học được

### Tư duy thiết kế hệ thống

- Bảo mật cần được xem xét từ giai đoạn thiết kế, không chỉ sau khi ứng dụng đã hoàn thành.
- Cần phân biệt vấn đề thuộc ứng dụng, dữ liệu, tài khoản hay hạ tầng mạng trước khi lựa chọn dịch vụ AWS.
- Kiến trúc nên có ranh giới rõ ràng để dễ quản lý và hạn chế ảnh hưởng khi phát sinh lỗi.

### Kiến thức kỹ thuật

- Nhận biết các rủi ro cơ bản khi tích hợp LLM API.
- Hiểu vai trò của AWS Control Tower trong quản trị nhiều tài khoản.
- Nắm được khái niệm snapshot, time travel và schema evolution của Apache Iceberg.
- Củng cố kiến thức về phân đoạn mạng và kiểm soát truy cập.

## Ứng dụng vào công việc

- Kiểm tra JWT và quyền truy cập trước khi API Gateway chuyển yêu cầu đến Lambda trong NetMon Cloud.
- Hạn chế quyền IAM của từng chức năng và tránh ghi thông tin nhạy cảm vào log.
- Phối hợp với thành viên phụ trách hạ tầng để kiểm tra Security Group và các luồng truy cập EC2.
- Tiếp tục nghiên cứu Landing Zone và Iceberg cho những bài toán lớn hơn; hai công nghệ này không phải thành phần đã triển khai trong NetMon.

## Trải nghiệm trong sự kiện

Community Day giúp tôi nhìn nhận AWS ở góc độ rộng hơn so với việc chỉ học cách tạo tài nguyên trên Console. Các chuyên đề liên kết giữa bảo mật, quản trị tài khoản, nền tảng dữ liệu và mạng cho thấy việc xây dựng hệ thống cần sự phối hợp của nhiều lĩnh vực.

### Học hỏi từ kinh nghiệm của diễn giả

Các chủ đề về chatbot và Landing Zone giúp tôi hiểu thêm những vấn đề có thể phát sinh khi một ứng dụng mở rộng. Phần Iceberg là kiến thức mới đối với tôi, tạo động lực để tiếp tục tìm hiểu về quản lý dữ liệu trên Cloud.

### Liên hệ kiến thức thực tập

Khi nhóm xây dựng NetMon, tôi tập trung vào Lambda, API Gateway và DynamoDB. Qua các nội dung của sự kiện, tôi nhận thấy việc phân quyền, xác thực và phối hợp với hạ tầng mạng cần được quan tâm song song với chức năng của API.

### Bài học rút ra

- Lựa chọn công nghệ dựa trên bài toán và nhu cầu thực tế, không chỉ vì công nghệ đó mới.
- Cân nhắc bảo mật, khả năng quản trị và chi phí khi thiết kế kiến trúc.
- Tiếp tục tự học sau mỗi buổi chia sẻ để biến kiến thức thành kỹ năng thực hành.

## Hình ảnh chương trình

{{< photo src="events/event-2-activity.jpg" alt="Buổi chia sẻ kỹ thuật" >}}
