+++
title = "5.3.2. Tạo máy chủ EC2 Ubuntu"
weight = 2
translationKey = "ws-2-2"
+++

## Các bước thực hiện

1. Vào EC2 → Instances → Launch instances. Đặt tên ví dụ `netmon-ec2-server`; chọn AMI Ubuntu, loại instance và EBS phù hợp ngân sách.
2. Chọn VPC/subnet và security group đã chuẩn bị. Nếu cần kết nối Session Manager, bảo đảm SSM Agent, IAM instance profile và đường kết nối dịch vụ hoạt động.
3. Gắn IAM role cho CloudWatch Agent theo quyền tối thiểu; không đưa access key vào máy chủ hoặc mã frontend.
4. Khởi động instance, kiểm tra trạng thái Running và Status checks. Lấy Instance ID để đăng ký trong NetMon với nguồn CloudWatch. Cài CloudWatch Agent ở bước 5.4.1.

## Kết quả cần kiểm tra

EC2 hoạt động, CPU có điểm dữ liệu trong CloudWatch; RAM cần agent. Chỉ dùng ID thật khi cấu hình riêng, không công khai thông tin nội bộ.

Tài liệu: [Getting started with EC2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html).

## Thao tác trong Launch instances

- Name: `netmon-ec2-server` (tên theo ảnh nhóm); Application and OS Images: Ubuntu Server 24.04 LTS.
- Instance type: chọn loại phù hợp ngân sách (t3.micro theo ảnh nhóm); Network settings → Edit để chọn VPC/subnet và Security Group của nhóm.
- Storage: dùng dung lượng EBS cần thiết; lưu ý volume giữ lại có thể tiếp tục tính phí. Advanced details: chọn IAM instance profile đã chuẩn bị nếu cần agent.
- Sau khi Launch, vào Instances, mở tab Details và Monitoring. Kiểm tra Status checks, Instance ID và biểu đồ CPU trước khi cài hoặc chỉnh agent.

Nếu dùng Session Manager, chỉ tiếp tục khi nút Connect → Session Manager hoạt động. Không tạo thêm máy nếu nhóm đã có EC2.

## Thông số triển khai

| Thuộc tính | Giá trị cần kiểm tra |
|---|---|
| Name | netmon-ec2-server |
| AMI | Ubuntu Server 24.04 LTS |
| Instance type | t3.micro |
| VPC | netmon-vpc |
| Subnet | netmon-subnet-public1-us-east-1a |
| Security group | netmon-ec2-sg |
| IAM instance profile | CloudWatch Agent / SSM nếu cần / if needed |

Dùng các giá trị này để đối chiếu với tài nguyên đang có; không tạo thêm tài nguyên trùng hoặc thay đổi hệ thống đang hoạt động chỉ để khớp bài thực hành.

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

EC2 → Instances: chọn netmon-ec2-server, kiểm tra Instance state và Status checks.

{{< photo src="workshop/aws-console/18-ec2-instances-netmon-list.png" alt="EC2 → Instances: chọn netmon-ec2-server, kiểm tra Instance state và Status checks." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

Mở Details: đối chiếu tên, instance type, VPC và subnet; sao chép Instance ID vào cấu hình NetMon riêng.

{{< photo src="workshop/aws-console/19-ec2-netmon-ec2-server-details.png" alt="Mở Details: đối chiếu tên, instance type, VPC và subnet; sao chép Instance ID vào cấu hình NetMon riêng." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

