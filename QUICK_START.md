# 🚀 Quick Start Guide - EventEase

## ⚡ Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```sql
-- Connect to MySQL and run:
source setup_database.sql
```

### 3. Configure Email (Optional)
Edit `config/email.js` with your Gmail credentials

### 4. Start the Server
```bash
npm run dev
```

### 5. Open Browser
Navigate to: http://localhost:3000

## 🧪 Test API Endpoints

### Create User
```bash
curl -X POST http://localhost:3000/api/users \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "phone=+1234567890" \
  -F "profile_picture=@/path/to/image.jpg"
```

### Get All Users
```bash
curl http://localhost:3000/api/users
```

## 📱 Features to Try

1. **Add User**: Click "Add User" button
2. **Upload Picture**: Drag & drop a profile picture
3. **Edit User**: Click edit icon on any user card
4. **Delete User**: Click delete icon with confirmation
5. **Responsive Design**: Resize browser window

## 🔧 Common Issues

- **Port 3000 in use**: Change port in `server.js`
- **MySQL connection failed**: Check if MySQL is running
- **Email not sending**: Verify Gmail app password

## Full Documentation

See `README.md` for complete setup and deployment instructions.

---

**Happy Coding! 🎉**
