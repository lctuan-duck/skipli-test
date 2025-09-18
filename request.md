# Classroom Management App API

## 1. Yêu cầu chức năng

- Đăng nhập bằng số điện thoại (SMS code)
- Xác thực học viên qua email invite link
- Instructor: Quản lý học viên, giao bài học, chat
- Student: Xem bài học, đánh dấu hoàn thành, cập nhật hồ sơ, chat

---

## 2. Danh sách API & Payload

### AUTH

- **POST /api/auth/access-code/:phoneNumber**
  - Params: `phoneNumber` (string)
  - Trả về: Mã truy cập gửi qua SMS

---

### INSTRUCTOR

- **POST /api/instructor/student**

  - Body: `{ name: string, phone: string, email?: string }`
  - Thêm học viên

- **POST /api/instructor/lesson**

  - Body: `{ studentPhone: string, title: string, description?: string }`
  - Giao bài học cho học viên

- **GET /api/instructor/students**

  - Trả về: Danh sách học viên

- **GET /api/instructor/student/:phone**

  - Params: `phone` (string)
  - Trả về: Thông tin học viên + danh sách bài học

- **PUT /api/instructor/student/:phone**

  - Params: `phone` (string)
  - Body: `{ name?: string, email?: string }`
  - Chỉnh sửa thông tin học viên

- **DELETE /api/instructor/student/:phone**
  - Params: `phone` (string)
  - Xoá học viên

---

### STUDENT

- **POST /api/student/email/login**

  - Body: `{ email: string }`
  - Gửi mã truy cập qua email

- **POST /api/student/email/validate-access-code**

  - Body: `{ email: string, accessCode: string }`
  - Xác thực mã truy cập email

- **GET /api/student/lessons?phone=xxx**

  - Query: `phone` (string)
  - Trả về: Danh sách bài học

- **POST /api/student/lesson/mark-done**

  - Body: `{ phone: string, lessonId: string }`
  - Đánh dấu hoàn thành bài học

- **PUT /api/student/profile**
  - Body: `{ phone: string, name?: string, email?: string }`
  - Chỉnh sửa hồ sơ cá nhân

---

## 3. Lưu ý

- Tất cả API trả về `{ success: boolean, ... }`
- Các trường hợp lỗi trả về mã lỗi HTTP và message
- Các API chat, socket.io: tuỳ chỉnh theo thiết kế frontend

---

## 4. Ví dụ payload

```json
// Thêm học viên
{
	"name": "Nguyen Van A",
	"phone": "0987654321",
	"email": "a@gmail.com"
}

// Giao bài học
{
	"studentPhone": "0987654321",
	"title": "Bài 1",
	"description": "Làm bài tập toán"
}

// Đánh dấu hoàn thành bài học
{
	"phone": "0987654321",
	"lessonId": "abc123"
}
```
