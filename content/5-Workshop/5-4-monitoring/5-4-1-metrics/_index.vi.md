+++
title = "5.4.1. Thu thập chỉ số CPU và RAM"
weight = 1
translationKey = "ws-3-1"
+++

## Cấu hình giám sát EC2

1. Vào CloudWatch → Metrics → EC2 → Per-Instance Metrics, chọn đúng InstanceId và `CPUUtilization`.
2. Cài Amazon CloudWatch Agent trên máy EC2 và gắn role phù hợp. Cấu hình Linux thu thập `mem_used_percent` khoảng 60 giây và chiều `InstanceId`. Mã API hiện đọc RAM từ namespace `NetMon/EC2` (file agent mẫu ghi `CWAgent`); phải đối chiếu namespace thực tế, không ghi đè cấu hình đang chạy.
3. Tạo alarm CPU/RAM, ví dụ ngưỡng 90%, chọn thời gian đánh giá phù hợp và SNS action. Mức 90% là ví dụ thử nghiệm, không khẳng định ngưỡng AWS thực tế. Không đặt alarm quá nhạy mà chưa xem dữ liệu.
4. Trong NetMon, đăng ký EC2 đúng InstanceId, xem số liệu và lịch sử 15 phút–24 giờ. Mã API đọc CPU theo period 300 giây; RAM 60 giây cho cửa sổ ngắn và 300 giây cho cửa sổ dài. Period truy vấn không làm tăng tần suất thu thập.

## Kiểm tra

Nếu RAM trống, kiểm tra Agent, namespace, InstanceId và IAM; nếu thiếu số liệu thì hiển thị thiếu dữ liệu thay vì 0. Kiểm tra Alarm history và hành động SNS. [CloudWatch Agent](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html).

## Ví dụ cấu hình CloudWatch Agent

Mẫu JSON dưới đây dùng namespace mà `netmon-api.py` đang đọc. Chỉ áp dụng cho máy lab mới hoặc sau khi sao lưu và xác nhận cấu hình hiện tại.

```json
{
  "agent": {"metrics_collection_interval": 60},
  "metrics": {
    "namespace": "NetMon/EC2",
    "append_dimensions": {"InstanceId": "${aws:InstanceId}"},
    "aggregation_dimensions": [["InstanceId"]],
    "metrics_collected": {"mem": {"measurement": ["mem_used_percent"], "metrics_collection_interval": 60}}
  }
}
```

Trên Ubuntu, cài agent theo tài liệu AWS. Sau khi lưu file cấu hình tại đường dẫn lab đã chọn, có thể nạp bằng `amazon-cloudwatch-agent-ctl` (đổi đường dẫn đúng file):

```bash
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -c file:/path/to/netmon-agent.json -s
sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a status
```

Trong CloudWatch → All metrics, xác nhận `NetMon/EC2` → `InstanceId` → `mem_used_percent`; CPU ở `AWS/EC2`. Chờ điểm dữ liệu xuất hiện rồi mới tạo alarm. Không cài lại agent đang hoạt động chỉ để lấy ảnh.


## Hình ảnh minh họa và minh chứng

{{< photo src="workshop/evidence/01_Lambda_GET_metrics.png" alt="Kết quả test GET metrics trong Lambda Console." caption="Ảnh AWS do người dùng cung cấp. Kết quả test GET metrics trong Lambda Console." >}}

## Thao tác trên AWS Console và ảnh đối chiếu

Các ảnh dưới đây lấy từ bộ báo cáo của cùng nhóm NetMon, ở thời điểm triển khai; không phải ảnh chụp mới. Tên tài nguyên và trạng thái hiện tại cần kiểm tra lại trên tài khoản AWS.

### Bước 1

EC2 → Instances → Monitoring: xem CPUUtilization và NetworkIn/NetworkOut của đúng instance.

{{< photo src="workshop/aws-console/50-ec2-netmon-monitoring-cpu-network-metrics.png" alt="EC2 → Instances → Monitoring: xem CPUUtilization và NetworkIn/NetworkOut của đúng instance." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 2

CloudWatch → Metrics: mở metric mem_used_percent của instance. Kiểm tra namespace/dimension và điểm dữ liệu.

{{< photo src="workshop/aws-console/51-cloudwatch-netmon-ec2-ram-mem-used-percent.png" alt="CloudWatch → Metrics: mở metric mem_used_percent của instance. Kiểm tra namespace/dimension và điểm dữ liệu." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

### Bước 3

Mở metric disk_used_percent để kiểm tra thêm dung lượng đĩa nếu agent đã cấu hình.

{{< photo src="workshop/aws-console/52-cloudwatch-netmon-ec2-disk-used-percent.png" alt="Mở metric disk_used_percent để kiểm tra thêm dung lượng đĩa nếu agent đã cấu hình." caption="Ảnh đối chiếu cấu hình của nhóm." >}}

**Ảnh giao diện liên quan:** [Giám sát hiệu năng CPU/RAM](../../#netmon-metrics).
