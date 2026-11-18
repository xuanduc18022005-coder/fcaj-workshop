+++
title = "5.4.2. Tạo CloudWatch Alarm và gửi SNS Email"
weight = 2
translationKey = "ws-3-2"
+++

## Cấu hình SNS

1. Vào Amazon SNS → Topics → Create topic → Standard; sử dụng topic hiện có nếu đã triển khai.
2. Create subscription → Email, nhập địa chỉ nhận thông báo. Mở email và chọn Confirm subscription.
3. Gắn topic ARN vào `SNS_TOPIC_ARN` của Lambda monitor và API kiểm tra SNS; cấp quyền Publish cho monitor và quyền đọc topic/subscriptions cho API. Cấu hình CloudWatch Alarm action đến topic nếu dùng EC2.
4. Cấu hình ngưỡng CPU/RAM độc lập từ giao diện hoặc NetworkSettings; monitor đánh giá giá trị vượt ngưỡng trên thiết bị mô phỏng và ghi trạng thái xử lý. Dùng `forcePeak` / `forceNormal` chỉ trên thiết bị test, không dùng để thay số liệu EC2 thật.

## Kiểm tra

Xác nhận cảnh báo xuất hiện trong NetworkAlerts nếu luồng monitor hoạt động, xem email nhận được và thời điểm tương ứng; GET `/sns/status` chỉ xác nhận cấu hình/subscription. Khi kiểm thử xong đưa tải mô phỏng về bình thường. [Amazon SNS](https://docs.aws.amazon.com/sns/latest/dg/sns-getting-started.html).

## Tạo alarm cho EC2

1. CloudWatch → Alarms → All alarms → Create alarm → Select metric.
2. Chọn `AWS/EC2` → Per-Instance Metrics → CPUUtilization; với RAM chọn `NetMon/EC2` và mem_used_percent đúng InstanceId.
3. Chọn Statistic Average, period phù hợp tần suất có dữ liệu; thiết lập threshold và evaluation periods. Trong Notification, chọn In alarm → SNS topic đã xác nhận email.
4. Đặt tên dễ nhận biết, xem Preview rồi Create alarm. Kiểm tra trạng thái OK/ALARM/INSUFFICIENT_DATA và tab History. Nếu chưa có điểm dữ liệu thì không được kết luận alarm hỏng.

**Đối chiếu:** email từ CloudWatch là luồng riêng của EC2; `NetworkAlerts` được monitor mô phỏng ghi, không mặc định lưu mọi alarm EC2. Để thử gửi email, chỉ dùng tình huống lab hoặc tính năng Publish message của topic khi nhóm đồng ý.


## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

CloudWatch → Alarms → All alarms: đối chiếu các alarm của nhóm và trạng thái hiện tại.

{{< photo src="workshop/aws-console/21-cloudwatch-alarms-list.png" alt="CloudWatch → Alarms → All alarms: đối chiếu các alarm của nhóm và trạng thái hiện tại." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

Chọn alarm CPU netmon-cpu-high-80. Ảnh cũ của nhóm dùng 80%; xem threshold và notification action.

{{< photo src="workshop/aws-console/24-cloudwatch-cpu-high-80-details.png" alt="Chọn alarm CPU netmon-cpu-high-80. Ảnh cũ của nhóm dùng 80%; xem threshold và notification action." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 3

Chọn alarm RAM netmon-ram-high-80; kiểm tra metric mem_used_percent và đúng InstanceId.

{{< photo src="workshop/aws-console/23-cloudwatch-ram-high-80-details.png" alt="Chọn alarm RAM netmon-ram-high-80; kiểm tra metric mem_used_percent và đúng InstanceId." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 4

Chọn alarm đĩa netmon-disk-high-85; kiểm tra metric disk_used_percent và chiều dữ liệu.

{{< photo src="workshop/aws-console/22-cloudwatch-disk-high-85-details.png" alt="Chọn alarm đĩa netmon-disk-high-85; kiểm tra metric disk_used_percent và chiều dữ liệu." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

**Ảnh giao diện liên quan:** [Cảnh báo và xử lý sự cố](../../#netmon-alerts) · [Cấu hình hệ thống và SNS](../../#netmon-settings).

### Kiểm tra đăng ký email SNS

Amazon SNS → Topics → `netmon-alerts` → Subscriptions → chọn subscription. Kiểm tra Protocol = Email và Status = Confirmed. Filter policy để trống nếu nhận tất cả thông báo. Ảnh ghi nhận trạng thái tại thời điểm nhóm chụp; không chứng minh email mới đã được gửi.

{{< photo src="workshop/aws-console/25-sns-new-subscription-confirmed.png" alt="Subscription SNS đã xác nhận trong ảnh nhóm." caption="Subscription SNS đã xác nhận trong ảnh nhóm." >}}
