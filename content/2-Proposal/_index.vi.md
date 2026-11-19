+++
title = "2. Bản đề xuất"
weight = 2
translationKey = "proposal"
+++

# NetMon Cloud – Hệ thống quản lý và giám sát hạ tầng mạng doanh nghiệp vừa và nhỏ trên AWS tích hợp Serverless

## Giải pháp quản lý và giám sát hạ tầng mạng tập trung trên AWS

### 1. Tóm tắt dự án

**Tên đề tài:** Xây dựng hệ thống quản lý và giám sát hạ tầng mạng doanh nghiệp vừa và nhỏ trên AWS tích hợp dịch vụ Serverless.

**Tên sản phẩm:** NetMon Cloud.

**Hình thức thực hiện:** Đồ án nhóm (3 sinh viên):

- **Nguyễn Tùng Dương** – phụ trách VPC, EC2 và bảo mật hạ tầng mạng.
- **Trần Xuân Đức** – phụ trách AWS Lambda, API Gateway, DynamoDB và các chức năng quản lý thiết bị.
- **Lê Mạnh Quân** – phụ trách CloudWatch, SNS, giao diện và kiểm thử.

**Môi trường triển khai:** AWS Region us-east-1; giao diện HTML, CSS, JavaScript; phát triển bằng Visual Studio Code.

NetMon Cloud hướng đến một hệ thống tập trung theo dõi hạ tầng, quản lý thiết bị và cảnh báo trên AWS. Phạm vi gồm thiết bị mô phỏng và một máy EC2 thử nghiệm; kết quả kết nối AWS cần được kiểm thử trên môi trường triển khai.

### 2. Phát biểu vấn đề

#### Vấn đề hiện tại

Các doanh nghiệp vừa và nhỏ sử dụng nhiều thiết bị như router, switch, máy chủ và điểm truy cập Wi-Fi. Việc theo dõi từng thiết bị riêng lẻ hoặc quản lý bằng bảng tính gây khó khăn khi số lượng thiết bị tăng lên, đặc biệt trong việc phát hiện tình trạng quá tải và theo dõi quá trình xử lý sự cố.

#### Giải pháp đề xuất

Nhóm đề xuất NetMon Cloud để tập trung thông tin thiết bị, chỉ số CPU/RAM và cảnh báo vào một giao diện thống nhất. Giải pháp sử dụng các dịch vụ Serverless trên AWS để xử lý API và dữ liệu, giảm nhu cầu vận hành máy chủ ứng dụng riêng. EC2 là máy chủ thử nghiệm được giám sát bằng CloudWatch; các thiết bị mạng chưa có sẵn trong môi trường thực hành sử dụng dữ liệu mô phỏng. Qua đề tài, nhóm vận dụng kiến thức mạng máy tính, điện toán đám mây, lập trình và bảo mật trong chương trình First Cloud AI Journey.

#### Lợi ích và hiệu quả đầu tư

Quản lý tập trung giúp giảm thao tác kiểm tra riêng lẻ, phát hiện bất thường sớm hơn và lưu lại quá trình xử lý. Kiến trúc dùng dịch vụ quản lý sẵn của AWS giúp giảm công sức vận hành máy chủ ứng dụng. Vì dự án ở quy mô học tập, nhóm chưa đo được tỷ lệ hoàn vốn hoặc thời gian tiết kiệm thực tế.

### 3. Kiến trúc giải pháp

{{< photo src="proposal/architecture-vi.svg" alt="Sơ đồ kiến trúc giải pháp NetMon Cloud" >}}

#### Các dịch vụ AWS sử dụng

| Công nghệ | Vai trò |
|---|---|
| Amazon VPC, Subnet, Route Table, Internet Gateway, Security Group | Tổ chức hạ tầng mạng và kiểm soát kết nối EC2. |
| Amazon EC2 và CloudWatch Agent | Máy chủ thử nghiệm, cung cấp chỉ số CPU và RAM thực khi cấu hình đầy đủ. |
| Amazon Cognito | Xác thực người dùng bằng OAuth 2.0 Authorization Code với PKCE. |
| Amazon API Gateway | Tiếp nhận HTTPS, kiểm tra JWT khi cấu hình authorizer và chuyển yêu cầu tới Lambda. |
| AWS Lambda | Xử lý API quản lý thiết bị, metrics, cảnh báo, cấu hình và nhật ký; mô phỏng và xử lý sự kiện. |
| Amazon DynamoDB | Lưu trữ thông tin thiết bị, cảnh báo, nhật ký và cấu hình. |
| Amazon EventBridge Scheduler | Kích hoạt Lambda mô phỏng theo lịch khi đã thiết lập. |
| DynamoDB Streams | Cung cấp sự kiện thay đổi thiết bị cho các hàm giám sát và ghi nhật ký. |
| Amazon CloudWatch | Thu thập metrics EC2, log và hỗ trợ cấu hình alarm. |
| Amazon SNS | Gửi email cảnh báo thông qua topic và subscription đã xác nhận. |

#### Thiết kế thành phần và luồng dữ liệu

1. Người dùng đăng nhập Cognito; giao diện gửi access token cùng yêu cầu tới API Gateway.
2. Lambda xử lý yêu cầu và đọc/ghi dữ liệu DynamoDB; giao diện hiển thị kết quả trả về.
3. Lambda mô phỏng cập nhật CPU/RAM theo lịch. DynamoDB Streams có thể kích hoạt hàm kiểm tra ngưỡng và ghi nhật ký; khi phát sinh cảnh báo phù hợp, hàm giám sát lưu lịch sử và gửi SNS.
4. Với EC2, API truy vấn CloudWatch để lấy CPUUtilization, NetworkIn/NetworkOut và RAM do CloudWatch Agent cung cấp. CloudWatch alarm có thể gửi SNS theo cấu hình riêng.
5. Người dùng xem và xác nhận xử lý cảnh báo. Hoàn tất xử lý không có nghĩa tài nguyên đã trở về mức an toàn; hệ thống vẫn tiếp tục giám sát.

#### Thiết kế lưu trữ dữ liệu

| Bảng DynamoDB | Nội dung |
|---|---|
| NetworkDevices | Mã, tên, loại, IP, vị trí, trạng thái, CPU/RAM, thời điểm cập nhật và instanceId khi liên kết EC2. |
| NetworkAlerts | Mã sự kiện, thiết bị, chỉ số bất thường, ngưỡng, thời điểm và trạng thái xử lý. |
| NetworkAuditLogs | Lịch sử thay đổi thiết bị từ DynamoDB Streams; không mặc định xác định được danh tính người thao tác. |
| NetworkSettings | Cấu hình ngưỡng CPU/RAM và chu kỳ mô phỏng. |

### 4. Triển khai kỹ thuật

#### Các giai đoạn triển khai

- Thiết kế VPC, EC2, IAM và kiến trúc Serverless.
- Xây dựng API quản lý, mô phỏng và lưu trữ dữ liệu.
- Tích hợp Cognito, CloudWatch, SNS và giao diện.
- Kiểm thử các luồng chính, rà soát chi phí và hoàn thiện hướng dẫn triển khai.

#### Yêu cầu kỹ thuật

Đề tài tập trung vào môi trường thử nghiệm quy mô nhỏ. Các router, switch, firewall chưa kết nối bộ thu thập chỉ số sử dụng dữ liệu mô phỏng. Máy EC2 được theo dõi bằng CloudWatch và CloudWatch Agent khi đã cấu hình đầy đủ. Sơ đồ hạ tầng là sơ đồ logic, không phải kết quả tự động dò mạng. Nhóm chưa triển khai thu thập SNMP/telemetry từ toàn bộ thiết bị vật lý hoặc tự động khắc phục sự cố.

Phát triển bằng HTML, CSS, JavaScript và Python cho Lambda; tài nguyên AWS và lịch mô phỏng được cấu hình riêng.

#### Giao diện tổng quan

Trang tổng quan hiển thị số lượng thiết bị, tình trạng hoạt động, thiết bị bất thường, cảnh báo chưa xử lý và xu hướng CPU/RAM.

#### Quản lý thiết bị

Cho phép tìm kiếm theo tên, mã, IP hoặc vị trí, lọc trạng thái và thực hiện các thao tác CRUD. Khi kết nối AWS hợp lệ, dữ liệu được lưu tại NetworkDevices.

#### Giám sát, cảnh báo và nhật ký

Trang hiệu năng hiển thị CPU/RAM và nguồn dữ liệu. V3.4 hỗ trợ truy vấn lịch sử CloudWatch của EC2 trong khoảng 15 phút đến 24 giờ. Người dùng có thể xem, lọc, tiếp nhận và hoàn tất cảnh báo; tra cứu lịch sử cảnh báo và thay đổi thiết bị khi các API tương ứng đã triển khai.

#### Cấu hình và bảo mật

Cho phép thiết lập ngưỡng CPU/RAM, chu kỳ tự tải giao diện và chu kỳ mô phỏng. Khi API tương ứng đã triển khai, cấu hình được đồng bộ với AWS. Hai chu kỳ tải giao diện và sinh số liệu mô phỏng độc lập với nhau. Sử dụng quyền IAM tối thiểu, JWT authorizer và CORS theo nguồn truy cập hợp lệ; không lưu AWS Access Key, Secret Access Key hoặc mật khẩu trong mã frontend.

### 5. Tiến độ và các mốc thực hiện

| Thời gian | Công việc | Phụ trách |
|---|---|---|
| 03/10–08/10/2026 | Thống nhất yêu cầu, phân công nhiệm vụ, thiết kế kiến trúc và dữ liệu. | Cả nhóm |
| 10/10–15/10/2026 | Chuẩn bị VPC, subnet, EC2, Security Group và quyền IAM. | Nguyễn Tùng Dương |
| 17/10–22/10/2026 | Tìm hiểu và triển khai DynamoDB, Lambda và API Gateway; kiểm thử CRUD. | Trần Xuân Đức |
| 24/10–29/10/2026 | Triển khai CloudWatch, SNS, ngưỡng cảnh báo và giao diện giám sát. | Lê Mạnh Quân, phối hợp cả nhóm |
| 31/10–05/11/2026 | Tích hợp API, xác thực, mô phỏng, chỉ số EC2 và lịch sử cảnh báo. | Cả nhóm |
| 07/11–14/11/2026 | Kiểm thử tích hợp, khắc phục lỗi, hoàn thiện báo cáo và chuẩn bị demo. | Cả nhóm |

### 6. Dự toán chi phí

Dự toán tham khảo tại Region us-east-1, giả định một EC2 Linux t3.micro, 8 GB EBS gp3, một IPv4 công cộng, chạy 730 giờ/tháng. Đây là kịch bản dự toán trước ưu đãi, không phải hóa đơn của tài khoản AWS của nhóm.

#### Chi phí hạ tầng

| Tài nguyên | Giả định | USD/tháng |
|---|---|---:|
| EC2 t3.micro | 730 giờ × 0,0104 USD | 7,59 |
| EBS gp3 | 8 GB × 0,08 USD | 0,64 |
| IPv4 công cộng | 730 giờ × 0,005 USD | 3,65 |
| **Tạm tính hạ tầng trên** | Chưa gồm dịch vụ tính theo sử dụng | **11,88** |
| Lambda, API Gateway, DynamoDB, EventBridge, Cognito, SNS, CloudWatch | Phụ thuộc lượt gọi, ghi/đọc, lịch mô phỏng, người dùng, email, metrics và log | Chưa xác định |

Chi phí thực tế có thể cao hoặc thấp hơn tùy thời gian chạy, cấu hình, lưu lượng, CPU credits, thuế và tín dụng AWS còn lại. Nhóm sẽ dùng [AWS Pricing Calculator](https://calculator.aws/) để lập dự toán đầy đủ theo cấu hình thực, thiết lập AWS Budgets và kiểm tra Billing. Cảnh báo ngân sách không tự động chặn mọi khoản phí. Không cần mua thêm thiết bị mạng vật lý cho phạm vi mô phỏng.

Nguồn đơn giá: [EC2 T3](https://aws.amazon.com/ec2/instance-types/t3/), [Amazon EBS](https://aws.amazon.com/ebs/pricing/), [Amazon VPC](https://aws.amazon.com/vpc/pricing/).

### 7. Đánh giá rủi ro

#### Ma trận rủi ro

| Rủi ro | Mức ảnh hưởng | Khả năng | Biện pháp giảm thiểu |
|---|---|---|---|
| Lỗi IAM, JWT hoặc CORS | Cao | Trung bình | Quyền tối thiểu, kiểm tra authorizer và origin. |
| Lambda mô phỏng không chạy | Trung bình | Trung bình | Kiểm tra Scheduler, quyền gọi và log. |
| EC2 thiếu dữ liệu RAM | Trung bình | Trung bình | Kiểm tra CloudWatch Agent, namespace và dimension. |
| SNS chưa xác nhận hoặc gửi lỗi | Cao | Trung bình | Kiểm tra subscription, quyền publish và log. |
| Chi phí vượt dự toán | Trung bình | Trung bình | AWS Budgets, giảm tần suất hợp lý và dọn tài nguyên. |

#### Phương án dự phòng

Sao lưu mã nguồn và cấu hình trước khi thay đổi; khôi phục bản hoạt động trước đó nếu tích hợp lỗi. Khi mất kết nối AWS, hiển thị lỗi hoặc dùng chế độ demo có nhãn rõ ràng, không thay dữ liệu thật bằng dữ liệu giả.

### 8. Kết quả mong đợi

#### Cải thiện kỹ thuật

- Xây dựng giao diện quản lý tập trung và xác thực người dùng trước khi truy cập dữ liệu AWS.
- Hỗ trợ thêm, xem, sửa, xóa, tìm kiếm và lọc thiết bị mạng.
- Theo dõi trạng thái, CPU/RAM; phân biệt dữ liệu mô phỏng với chỉ số EC2 từ CloudWatch.
- Phát hiện tình trạng vượt ngưỡng, gửi thông báo email qua SNS theo cấu hình giám sát.
- Lưu lịch sử cảnh báo, hỗ trợ tiếp nhận và hoàn tất xử lý.
- Kiểm thử các chức năng chính và chuẩn bị báo cáo, video demo.

#### Tiêu chí kiểm thử và sản phẩm bàn giao

| Tình huống | Kết quả mong đợi |
|---|---|
| Chưa đăng nhập hoặc token hết hạn | API từ chối truy cập bảo vệ và yêu cầu đăng nhập lại. |
| Thêm, sửa, xóa thiết bị | Giao diện phản ánh dữ liệu lưu vào DynamoDB sau khi đồng bộ. |
| Mô phỏng CPU/RAM | Số liệu thay đổi theo chu kỳ và có nhãn nguồn mô phỏng. |
| Đọc metrics EC2 | Hiển thị dữ liệu CloudWatch; thiếu dữ liệu hiển thị dấu —, không giả lập số 0. |
| Vượt ngưỡng | Tạo cảnh báo, gửi email khi luồng SNS hoạt động đúng. |
| Tiếp nhận và hoàn tất cảnh báo | Trạng thái xử lý được cập nhật, lịch sử có thể tra cứu. |
| Mất kết nối API | Hiển thị lỗi, không nhầm dữ liệu demo với dữ liệu thật. |

Sản phẩm dự kiến gồm ứng dụng NetMon Cloud, mã nguồn, sơ đồ kiến trúc, hướng dẫn triển khai, báo cáo thực tập và video demo. Kết quả kiểm thử AWS thực tế cần được xác minh riêng.

#### Giá trị lâu dài

Kiến trúc và mã nguồn có thể tái sử dụng cho bài thực hành mạng và điện toán đám mây. Khi mở rộng, nhóm có thể tích hợp SNMP/telemetry, phân quyền theo vai trò và nâng cao khả năng chịu lỗi.

