+++
title = "5. Workshop"
weight = 5
translationKey = "workshop"
+++

Workshop hướng dẫn triển khai **NetMon Cloud – Hệ thống quản lý và giám sát hạ tầng mạng doanh nghiệp vừa và nhỏ trên AWS tích hợp dịch vụ Serverless**. Bên dưới là các chương thực hành từ cấu hình hạ tầng AWS đến tích hợp và kiểm thử, cùng bộ ảnh giao diện của hệ thống.

## Nội dung Workshop

- [5.1. Tổng quan](5-1-overview/)
- [5.2. Chuẩn bị môi trường & chọn Region](5-2-preparation/)
- [5.3. Thiết kế hạ tầng VPC và EC2](5-3-infrastructure/)
- [5.4. CloudWatch, SNS và EventBridge](5-4-monitoring/)
- [5.5. Lambda, DynamoDB và API Gateway](5-5-serverless/)
- [5.6. Cognito, JWT và giao diện](5-6-auth-frontend/)
- [5.7. Kiểm thử tổng thể và dọn dẹp tài nguyên](5-7-testing-cleanup/)

## Giao diện hệ thống NetMon Cloud

Các chức năng chính của website được minh họa theo từng nhóm dưới đây. Bấm vào ảnh để xem kích thước lớn. 24 ảnh kiểm thử sử dụng API và phiên đăng nhập giả lập; 3 ảnh giao diện do nhóm cung cấp trước đó phản ánh trạng thái tại thời điểm chụp. Các ảnh không thay thế việc xác nhận tài nguyên AWS hay kết quả kiểm thử trực tiếp.

<span id="netmon-overview"></span>

### Tổng quan hệ thống

Dashboard hiển thị số lượng thiết bị, trạng thái hoạt động và cảnh báo, giúp người quản trị theo dõi toàn bộ hệ thống.

{{< photo src="workshop/evidence/02_Tong_quan.png" alt="Tổng quan hệ thống và số lượng thiết bị." caption="Kiểm thử giao diện – API giả lập. Tổng quan hệ thống và số lượng thiết bị." >}}


<span id="netmon-login"></span>

### Đăng nhập và xác thực

Người dùng cần xác thực để sử dụng chức năng quản lý dữ liệu AWS. Giao diện trước khi đăng nhập được minh họa dưới đây; cấu hình Cognito và JWT nằm ở mục 5.6.

{{< photo src="workshop/evidence/24_Man_hinh_chua_dang_nhap.png" alt="Giao diện NetMon trước khi đăng nhập; không phải Cognito Hosted UI." caption="Kiểm thử giao diện – API giả lập. Giao diện NetMon trước khi đăng nhập; không phải Cognito Hosted UI." >}}


<span id="netmon-devices"></span>

### Quản lý thiết bị

Quản trị viên có thể tìm kiếm, xem chi tiết, thêm, sửa, xóa thiết bị thử nghiệm và đăng ký EC2 bằng Instance ID. Danh sách hỗ trợ phân trang.

{{< photo src="workshop/evidence/03_Quan_ly_thiet_bi.png" alt="Danh sách quản lý thiết bị, tìm kiếm và phân trang." caption="Kiểm thử giao diện – API giả lập. Danh sách quản lý thiết bị, tìm kiếm và phân trang." >}}

{{< photo src="workshop/evidence/04_Xem_chi_tiet.png" alt="Xem chi tiết một thiết bị." caption="Kiểm thử giao diện – API giả lập. Xem chi tiết một thiết bị." >}}

{{< photo src="workshop/evidence/05_Them_thiet_bi_mo_phong.png" alt="Form thêm thiết bị mô phỏng (POST)." caption="Kiểm thử giao diện – API giả lập. Form thêm thiết bị mô phỏng (POST)." >}}

{{< photo src="workshop/evidence/06_Ket_qua_them_thiet_bi.png" alt="Danh sách thiết bị sau thao tác thêm trên API giả lập." caption="Kiểm thử giao diện – API giả lập. Danh sách thiết bị sau thao tác thêm trên API giả lập." >}}

{{< photo src="workshop/evidence/07_Sua_thiet_bi.png" alt="Form cập nhật thiết bị (PUT)." caption="Kiểm thử giao diện – API giả lập. Form cập nhật thiết bị (PUT)." >}}

{{< photo src="workshop/evidence/08_Ket_qua_xoa_thiet_bi.png" alt="Kết quả xóa bản ghi thử nghiệm (DELETE)." caption="Kiểm thử giao diện – API giả lập. Kết quả xóa bản ghi thử nghiệm (DELETE)." >}}

{{< photo src="workshop/evidence/09_Form_dang_ky_EC2.png" alt="Form đăng ký EC2 với Instance ID; chưa chứng minh instance được xác thực bởi AWS." caption="Kiểm thử giao diện – API giả lập. Form đăng ký EC2 với Instance ID; chưa chứng minh instance được xác thực bởi AWS." >}}


<span id="netmon-metrics"></span>

### Giám sát hiệu năng CPU/RAM

Theo dõi chỉ số thiết bị và lựa chọn nguồn biểu đồ. Với EC2, có thể truy vấn lịch sử từ 15 phút đến 24 giờ; số liệu mẫu trình duyệt được phân biệt với CloudWatch.

{{< photo src="workshop/evidence/10_Giam_sat_EC2_va_thiet_bi.png" alt="Trang giám sát và hiệu năng." caption="Kiểm thử giao diện – API giả lập. Trang giám sát và hiệu năng." >}}

{{< photo src="workshop/evidence/11_Bieu_do_tong_hop.png" alt="Biểu đồ trung bình thiết bị trong trình duyệt." caption="Kiểm thử giao diện – API giả lập. Biểu đồ trung bình thiết bị trong trình duyệt." >}}

{{< photo src="workshop/evidence/12_Bieu_do_EC2_1_gio.png" alt="Mô phỏng trải nghiệm xem lịch sử một giờ." caption="Kiểm thử giao diện – API giả lập. Mô phỏng trải nghiệm xem lịch sử một giờ." >}}

{{< photo src="workshop/evidence/13_Bieu_do_EC2_24_gio.png" alt="Mô phỏng trải nghiệm xem lịch sử 24 giờ." caption="Kiểm thử giao diện – API giả lập. Mô phỏng trải nghiệm xem lịch sử 24 giờ." >}}

{{< photo src="workshop/evidence/05_EC2_CloudWatch_tren_web.png" alt="Màn hình giám sát máy chủ EC2 do người dùng cung cấp." caption="Ảnh giao diện do người dùng cung cấp. Màn hình giám sát máy chủ EC2 do người dùng cung cấp." >}}

{{< photo src="workshop/evidence/07_Lich_su_EC2_1_gio.png" alt="Lịch sử EC2 một giờ: kiểm tra số mẫu và biểu đồ; không suy diễn kết quả khi biểu đồ trống." caption="Ảnh giao diện do người dùng cung cấp. Lịch sử EC2 một giờ: kiểm tra số mẫu và biểu đồ; không suy diễn kết quả khi biểu đồ trống." >}}


<span id="netmon-alerts"></span>

### Cảnh báo và xử lý sự cố

Hệ thống hiển thị cảnh báo vượt ngưỡng, hỗ trợ chọn cảnh báo, xử lý và theo dõi trạng thái.

{{< photo src="workshop/evidence/01_Popup_canh_bao.png" alt="Popup thông báo vượt ngưỡng khi mở giao diện." caption="Kiểm thử giao diện – API giả lập. Popup thông báo vượt ngưỡng khi mở giao diện." >}}

{{< photo src="workshop/evidence/14_Canh_bao_va_phan_trang.png" alt="Cảnh báo và phân trang." caption="Kiểm thử giao diện – API giả lập. Cảnh báo và phân trang." >}}

{{< photo src="workshop/evidence/15_Chon_canh_bao.png" alt="Chọn cảnh báo để xử lý." caption="Kiểm thử giao diện – API giả lập. Chọn cảnh báo để xử lý." >}}

{{< photo src="workshop/evidence/16_Ket_qua_xu_ly_canh_bao.png" alt="Trạng thái cảnh báo sau thao tác trên API giả lập." caption="Kiểm thử giao diện – API giả lập. Trạng thái cảnh báo sau thao tác trên API giả lập." >}}

{{< photo src="workshop/evidence/06_Canh_bao_tren_web.png" alt="Danh sách cảnh báo do người dùng cung cấp." caption="Ảnh giao diện do người dùng cung cấp. Danh sách cảnh báo do người dùng cung cấp." >}}


<span id="netmon-topology"></span>

### Kiến trúc AWS và sơ đồ mạng

Giao diện cung cấp góc nhìn kiến trúc và sơ đồ quản lý thiết bị. Đây là sơ đồ logic, không phải bản đồ tài nguyên VPC.

{{< photo src="workshop/evidence/17_Kien_truc_AWS.png" alt="Tab kiến trúc AWS trong giao diện." caption="Kiểm thử giao diện – API giả lập. Tab kiến trúc AWS trong giao diện." >}}

{{< photo src="workshop/evidence/18_So_do_mang.png" alt="Sơ đồ mạng logic trong NetMon; không phải Resource map của VPC." caption="Kiểm thử giao diện – API giả lập. Sơ đồ mạng logic trong NetMon; không phải Resource map của VPC." >}}


<span id="netmon-logs"></span>

### Nhật ký hệ thống

Các trang nhật ký theo dõi thay đổi thiết bị, lịch sử cảnh báo và thao tác quản trị.

{{< photo src="workshop/evidence/19_Nhat_ky_thiet_bi.png" alt="Nhật ký thay đổi thiết bị." caption="Kiểm thử giao diện – API giả lập. Nhật ký thay đổi thiết bị." >}}

{{< photo src="workshop/evidence/20_Nhat_ky_canh_bao.png" alt="Nhật ký cảnh báo." caption="Kiểm thử giao diện – API giả lập. Nhật ký cảnh báo." >}}

{{< photo src="workshop/evidence/21_Nhat_ky_thao_tac.png" alt="Nhật ký thao tác trong giao diện." caption="Kiểm thử giao diện – API giả lập. Nhật ký thao tác trong giao diện." >}}


<span id="netmon-settings"></span>

### Cấu hình hệ thống và SNS

Thiết lập ngưỡng CPU/RAM, chu kỳ mô phỏng và kiểm tra cấu hình SNS. Trạng thái SNS trên giao diện không thay thế minh chứng email thực nhận.

{{< photo src="workshop/evidence/22_Cau_hinh_va_chu_ky.png" alt="Cấu hình ngưỡng và chu kỳ metrics." caption="Kiểm thử giao diện – API giả lập. Cấu hình ngưỡng và chu kỳ metrics." >}}

{{< photo src="workshop/evidence/23_Kiem_tra_cau_hinh_SNS.png" alt="Kiểm tra trạng thái cấu hình SNS; không chứng minh đã gửi email." caption="Kiểm thử giao diện – API giả lập. Kiểm tra trạng thái cấu hình SNS; không chứng minh đã gửi email." >}}
