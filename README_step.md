# ✅ Coding Challenge #6 - Classroom Management App

## 🚀 Giới thiệu

Ứng dụng quản lý lớp học thời gian thực bao gồm:

- Front-end: React
- Back-end: Node.js (Express)
- Database: Firebase
- SMS/Email: Twilio hoặc dịch vụ tương tự + Nodemailer

## 🛠 Tính năng chính

### 🔐 Authentication

- Đăng nhập bằng số điện thoại (SMS code).
- Xác thực học viên qua email invite link.
- Lưu thông tin người dùng vào localStorage.

### 👥 Dashboard theo vai trò

- Instructor Dashboard: Quản lý học viên, giao bài học, chat.
- Student Dashboard: Xem bài học, đánh dấu hoàn thành, cập nhật hồ sơ, chat.

### 🧑‍🏫 Instructor Dashboard

- Thêm/Sửa/Xoá học viên.
- Giao bài học (title, description).
- Xem danh sách học viên.
- Chat real-time với học viên.

### 🎓 Student Dashboard

- Xem danh sách bài học được giao.
- Đánh dấu hoàn thành.
- Chỉnh sửa hồ sơ cá nhân.
- Chat real-time với giảng viên.

### 💬 Chat (Socket.io)

- Học viên ↔ Giảng viên nhắn tin trực tiếp.
- Tin nhắn cập nhật real-time trên nhiều thiết bị.
- (Tuỳ chọn) Lưu lịch sử chat vào Firebase.

---

## ⚙️ Cấu trúc Backend (Express)

### Authentication Routes

- `POST /createAccessCode` → Sinh mã 6 số, lưu Firebase, gửi SMS.
- `POST /validateAccessCode` → Kiểm tra mã, trả về role.

### Instructor Routes

- `POST /addStudent` → Thêm học viên + gửi email mời.
- `POST /assignLesson` → Giao bài học.
- `GET /students` → Danh sách học viên.
- `GET /student/:phone` → Thông tin học viên.
- `PUT /editStudent/:phone` → Chỉnh sửa học viên.
- `DELETE /student/:phone` → Xoá học viên.

### Student Routes

- `POST /loginEmail` → Gửi mã qua email.
- `POST /validateAccessCode` → Xác thực mã email.
- `GET /myLessons?phone=xxx` → Danh sách bài học.
- `POST /markLessonDone` → Đánh dấu hoàn thành.
- `PUT /editProfile` → Chỉnh sửa hồ sơ.

### Chat

- Thiết lập Socket.io server.
- Kết nối học viên ↔ giảng viên.
- (Tuỳ chọn) Lưu lịch sử chat vào Firebase.

---

## 🔑 Firebase Collections (gợi ý)

```
users/
  {phone} -> { name, email, role, lessons: [] }

accessCodes/
  {phone} -> { code, expireAt }

lessons/
  {lessonId} -> { title, description, assignedTo }

chats/
  {chatId} -> { messages: [] }
```

---

## 🛡️ Bảo mật

- Hash mật khẩu khi tạo tài khoản.
- Xác thực API bằng JWT.
- Chỉ cho phép user hợp lệ truy cập dữ liệu của mình (Firestore rules).
- Toàn bộ chạy qua HTTPS.

---

## 📂 Cách chạy dự án

### 1. Clone repo

```bash
git clone <repo-url>
cd classroom-management-app
```

### 2. Cài đặt dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

### 3. Cấu hình Firebase & Twilio

- Tạo project Firebase, thêm Firestore & Authentication.
- Tạo tài khoản Twilio, lấy API Key & config.

### 4. Chạy backend

```bash
cd backend
npm run dev
```

### 5. Chạy frontend

```bash
cd frontend
npm start
```

---

## 📸 Screenshots

_(Thêm hình ảnh giao diện ở đây)_

---
