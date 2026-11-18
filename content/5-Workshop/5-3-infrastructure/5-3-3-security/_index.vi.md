+++
title = "5.3.3. Security Group và IAM Role"
weight = 3
translationKey = "ws-2-3"
+++

## Các bước
1. Trong EC2 → Security Groups, mở security group gắn với instance giám sát. Kiểm tra inbound và outbound theo nhu cầu; không mở SSH từ `0.0.0.0/0`.
2. Nếu dùng Session Manager, kiểm tra SSM Agent, instance profile và kết nối tới các endpoint dịch vụ. Nếu dùng SSH, chỉ cho phép nguồn quản trị cần thiết.
3. Vào EC2 → Instances → Actions → Security → Modify IAM role; gắn role giám sát đã được phê duyệt nếu chưa có.

## Kiểm tra
EC2 hoạt động, agent gửi metric theo cấu hình. Việc bảo vệ instance không thay thế xác thực JWT cho HTTP API.

[EC2 security groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html)

## Kiểm tra kết nối

| Vấn đề | Vị trí kiểm tra |
|---|---|
| Không vào được máy | EC2 Connect, IAM instance profile, SSM Agent, route và kết nối outbound |
| CPU có nhưng RAM trống | CloudWatch Agent, role gửi metric, namespace/dimension |
| Cổng SSH mở rộng | Security Group → Inbound rules; giới hạn nguồn quản trị hoặc xóa rule không dùng |

Không gắn quyền quản trị tài khoản cho EC2 chỉ để thu thập metric. Ảnh inbound/outbound cần che IP quản trị riêng khi công bố.

## Quy tắc mạng

| Thuộc tính | Giá trị cần kiểm tra |
|---|---|
| Inbound | No rules (theo ảnh nhóm / team screenshot) |
| Outbound | All traffic (ảnh nhóm / team screenshot) |
| SSH TCP 22 | Không mở công khai / Do not expose publicly |
| EC2 IAM role | CloudWatchAgentServerPolicy; SSM policy nếu dùng / if used |

Dùng các giá trị này để đối chiếu với tài nguyên đang có; không tạo thêm tài nguyên trùng hoặc thay đổi hệ thống đang hoạt động chỉ để khớp bài thực hành.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

EC2 → Security Groups → netmon-ec2-sg → Inbound rules. Ảnh cho thấy không có inbound rules; không mở SSH công khai.

{{< photo src="workshop/aws-console/16-netmon-ec2-sg-inbound-no-rules.png" alt="EC2 → Security Groups → netmon-ec2-sg → Inbound rules. Ảnh cho thấy không có inbound rules; không mở SSH công khai." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

Mở Outbound rules: cấu hình nhóm đã dùng All traffic; với môi trường production, thu hẹp theo yêu cầu kết nối.

{{< photo src="workshop/aws-console/17-netmon-ec2-sg-outbound-all-traffic.png" alt="Mở Outbound rules: cấu hình nhóm đã dùng All traffic; với môi trường production, thu hẹp theo yêu cầu kết nối." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

