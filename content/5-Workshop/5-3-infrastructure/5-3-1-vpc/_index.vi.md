+++
title = "5.3.1. Tạo VPC, Subnet, Route Table và IGW"
weight = 1
translationKey = "ws-2-1"
+++

## Các bước thực hiện

1. Vào VPC → Your VPCs → Create VPC (hoặc mở VPC nhóm đã tạo). Ví dụ CIDR `10.0.0.0/16`.
2. Tạo subnet public `10.0.0.0/20`; private `10.0.128.0/20` nếu cần mở rộng. Chọn AZ phù hợp.
3. Tạo và attach Internet Gateway vào VPC. Thêm route `0.0.0.0/0` trỏ IGW ở route table public và associate đúng subnet. Không thêm route IGW cho subnet private.
4. Tạo Security Group cho EC2. Không mở SSH từ mọi IP; ưu tiên Session Manager nếu đã chuẩn bị đủ quyền và kết nối. Chỉ mở inbound cần thiết.

## Kiểm tra

VPC và subnet liên kết đúng, route table public trỏ IGW, security group không mở cổng không cần thiết. Không tạo NAT Gateway chỉ phục vụ demo nếu không cần, vì có chi phí.

Tài liệu: [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html).

## Bảng cấu hình tham khảo

| Thành phần | Thông số theo ảnh nhóm |
|---|---|
| VPC | netmon-vpc, 10.0.0.0/16 |
| Public subnet | 10.0.0.0/20 |
| Private subnet (nếu có) | 10.0.128.0/20 |
| Public route table | local; 0.0.0.0/0 → IGW |
| Private route table | local; không có route trực tiếp tới IGW |

Các CIDR trên được đối chiếu với ảnh cấu hình của nhóm, không đổi VPC đã triển khai để khớp báo cáo. Vào Your VPCs → chọn VPC → **Resource map** để kiểm tra subnet và route table. Nếu EC2 cần gửi metric nhưng không có đường ra dịch vụ AWS, kiểm tra đường kết nối hoặc VPC endpoint phù hợp; không mở inbound chỉ để gửi metric.

**Ảnh minh chứng:** Resource map, route table association và Internet Gateway đã attach.


## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

VPC → Your VPCs → netmon-vpc → Resource map. Kiểm tra IPv4 CIDR và các liên kết subnet/route table.

{{< photo src="workshop/aws-console/06-netmon-vpc-resource-map.png" alt="VPC → Your VPCs → netmon-vpc → Resource map. Kiểm tra IPv4 CIDR và các liên kết subnet/route table." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

VPC → Subnets → chọn public subnet; đối chiếu CIDR 10.0.0.0/20, AZ us-east-1a và route table public.

{{< photo src="workshop/aws-console/08-public-subnet-details.png" alt="VPC → Subnets → chọn public subnet; đối chiếu CIDR 10.0.0.0/20, AZ us-east-1a và route table public." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 3

Chọn private subnet; đối chiếu CIDR 10.0.128.0/20 và Auto-assign public IPv4 address = No.

{{< photo src="workshop/aws-console/09-private-subnet-details.png" alt="Chọn private subnet; đối chiếu CIDR 10.0.128.0/20 và Auto-assign public IPv4 address = No." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 4

Internet gateways → netmon IGW: kiểm tra trạng thái Attached và VPC tương ứng.

{{< photo src="workshop/aws-console/14-netmon-igw-details.png" alt="Internet gateways → netmon IGW: kiểm tra trạng thái Attached và VPC tương ứng." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 5

Route tables → netmon-rtb-public → Routes: kiểm tra local và 0.0.0.0/0 → IGW.

{{< photo src="workshop/aws-console/11-netmon-rtb-public-routes.png" alt="Route tables → netmon-rtb-public → Routes: kiểm tra local và 0.0.0.0/0 → IGW." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 6

Route table private → Routes và Subnet associations: kiểm tra đường local và không có đường IGW trực tiếp.

{{< photo src="workshop/aws-console/13-netmon-rtb-private1-us-east-1a-routes.png" alt="Route table private → Routes và Subnet associations: kiểm tra đường local và không có đường IGW trực tiếp." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

**Ảnh giao diện liên quan:** [Kiến trúc AWS và sơ đồ mạng](../../#netmon-topology).
