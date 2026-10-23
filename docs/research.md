# Khảo sát yêu cầu Hụi — 23/10/2026

Mục tiêu: chuyển mô tả ban đầu thành yêu cầu có thể xác nhận, thiết kế, ước lượng và nghiệm thu. Chưa coi các lựa chọn gợi ý là quyết định của khách.

Nguồn phương pháp đã đối chiếu:
- https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service — xác định mục tiêu, biến giả định thành câu hỏi nghiên cứu.
- https://www.gov.uk/service-manual/user-research/capturing-research-questions — nhóm và ưu tiên câu hỏi.
- https://service-manual.nhs.uk/content/how-to-write-good-questions-for-forms/get-the-questions-into-order — chia biểu mẫu thành từng bước dễ xử lý.

Nội dung nghiệp vụ xuất phát từ mô tả của khách hàng trong cuộc trao đổi; chưa xác nhận quy tắc pháp lý, khả năng tích hợp Zalo hoặc chi phí thông báo.

## Đầu ra cần lấy
1. Quy trình hiện tại, vướng mắc, quy mô và vai trò quản lý.
2. Hồ sơ, xác minh tài khoản, nhiều chân, điều kiện tham gia và dữ liệu cũ.
3. Lịch, khung giờ, kênh và thời điểm nhắc, đổi/hủy lịch.
4. Kênh gửi, giới hạn mức bỏ, sửa/rút, nhập hộ, nhận sát giờ đóng.
5. Người thắng, hòa, không ai bỏ, lỗi, tranh chấp, ví dụ kiểm chứng.
6. Danh tính, quyền xem mức bỏ, phạm vi công bố và lưu lịch sử.
7. Quản lý tiền, công thức, báo cáo, thiết bị, ưu tiên giao diện và tiêu chí nghiệm thu.
8. Mốc triển khai, bàn giao và liên hệ tùy chọn. Không khảo sát ngân sách hoặc phí vận hành ở giai đoạn này.

## Cách phân tích sau khảo sát
- Lập bảng yêu cầu đã rõ / chưa quyết định / mâu thuẫn / cần kiểm tra kỹ thuật.
- Hỏi thêm nếu chọn tin nhắn nhóm nhưng muốn ẩn danh, muốn nhập hộ sau đóng nhưng muốn chốt ngay, muốn công bố tiền nhận nhưng không yêu cầu hoặc chưa có công thức tính tiền.
- Chốt quy tắc từng dây, các trường hợp ngoại lệ và tiêu chí nghiệm thu trước khi báo giá.
- Chọn tối đa ba ưu tiên khách nêu cho bản đầu, đưa nhu cầu còn lại vào giai đoạn sau theo thỏa thuận.

## Vận hành
- `/`: khảo sát; nháp trên trình duyệt, gửi lưu D1, mã phiếu chống gửi lặp khi thử lại.
- `/admin`: đọc tối đa 500 phiếu mới nhất; mã ADMIN_KEY chỉ kiểm tra tại máy chủ, không lưu ở trình duyệt. Xuất JSON.
- Tài khoản quản trị không gửi cho khách. Site hiện công khai cho khách điền; trang quản trị vẫn kiểm tra ADMIN_KEY ở máy chủ.
- Không thu danh sách khách, giấy tờ hoặc giao dịch thật trong khảo sát.
