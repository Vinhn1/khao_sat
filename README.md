# Khảo sát yêu cầu ứng dụng hụi

Website tiếng Việt thu thập nhu cầu của chủ hụi, gồm 50 câu hỏi trong 8 phần, câu hỏi có điều kiện, lưu nháp trên trình duyệt, xem lại và gửi phiếu. Không khảo sát ngân sách hoặc phí vận hành.

## Các trang
- `/`: khảo sát khách hàng.
- `/admin`: xem câu trả lời và xuất JSON; yêu cầu mã quản trị.
- `/api/responses`: nhận phiếu và đọc kết quả có kiểm tra mã ở máy chủ.

## Công nghệ
React, TypeScript, Vinext; máy chủ Cloudflare Workers; dữ liệu Cloudflare D1 và Drizzle migrations.

## Bảo mật và dữ liệu
- Thiết lập `ADMIN_KEY` trong cấu hình bí mật của môi trường triển khai. Không đưa giá trị vào Git hoặc mã giao diện.
- Repo không chứa câu trả lời khách hàng, cơ sở dữ liệu cục bộ, mã quản trị hay thông tin xác thực.
- Bản nháp nằm trên trình duyệt khách; phiếu đã gửi nằm trong D1 của môi trường triển khai.
- Chuyển mã nguồn sang GitHub không tự chuyển dữ liệu hoặc cấu hình bí mật.

## Phát triển và triển khai
Xem [hướng dẫn framework](docs/framework-setup.md) để cài dependencies, build và áp dụng migration cục bộ. Repo giữ cấu hình Sites hiện tại trong `.openai/hosting.json`. Muốn triển khai sang tài khoản Cloudflare riêng cần thiết lập Worker, D1, migration và `ADMIN_KEY` cho môi trường mới, rồi kiểm tra lại luồng gửi/đọc phiếu.

GitHub lưu mã nguồn. Để dùng tên miền riêng cho website hiện tại, gắn tên miền vào Sites và cấu hình DNS theo các bản ghi được cấp; không cần di chuyển dữ liệu. Nếu chuyển nền tảng hosting, cần lập phương án chuyển dữ liệu riêng.

## Nội dung khảo sát
Chỉnh sửa `app/questions.ts`. Giao diện khảo sát: `app/page.tsx`; quản trị: `app/admin/page.tsx`; API: `app/api/responses/route.ts`; bảng dữ liệu: `db/schema.ts`.
