📋 Task Board & Microservices (Final Lab Set 1)
ระบบจัดการงานขนาดเล็กที่ออกแบบด้วยสถาปัตยกรรม Microservices ประกอบด้วยบริการ Auth, Task และ Log เชื่อมต่อผ่าน Nginx Reverse Proxy พร้อมระบบรักษาความปลอดภัยด้วย JWT และ Bcrypt

🚀 วิธีการติดตั้งและรันระบบ (Quick Start)
สร้างไฟล์ Environment Variables
สร้างไฟล์ชื่อ .env ที่โฟลเดอร์นอกสุด และใส่ค่าดังนี้:

ข้อมูลโค้ด
POSTGRES_USER=admin
POSTGRES_PASSWORD=adminpass
POSTGRES_DB=taskboard
JWT_SECRET=your_super_secret_key
JWT_EXPIRES=24h
สั่งรันระบบด้วย Docker Compose

Bash
docker compose up -d --build
เตรียมฐานข้อมูล (สำคัญ!)
หากต้องการให้รหัสผ่านตรงกับชุดทดสอบ ให้รันคำสั่งนี้เพื่อ Update Hash (รหัสผ่านคือ password123):

Bash
docker exec -it $(docker ps -qf "name=postgres") psql -U admin -d taskboard -c "UPDATE users SET password_hash = '\$2a\$10\$vI8tWBnDUknD0EylLNc.OOYxU9E6P/Kq0U7WJ9C19fD8.oYy.oYy.' WHERE username IN ('alice', 'bob', 'admin');"
🛠 การทดสอบผ่าน Command Line (curl)
1. การ Login
Bash
curl -k -X POST https://localhost/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email": "alice@example.com", "password": "password123"}'
2. การดึงข้อมูล Logs
Bash
curl -k -X GET https://localhost/api/logs/ \
     -H "Authorization: Bearer <ใส่_TOKEN_ที่นี่>"