# EventEase - Event Management System

A full-stack web application for managing events and user registrations with a beautiful Pinterest-inspired aesthetic.

## Features

- **User Registration & Management**: Complete CRUD operations for users
- **Profile Picture Upload**: Handle profile pictures with Multer
- **Email Confirmation**: Automatic welcome emails using Nodemailer
- **Beautiful UI**: Minimal Pinterest-inspired aesthetic with Tailwind CSS
- **Responsive Design**: Works on all devices
- **Real-time Updates**: Dynamic user interface with JavaScript
- **Background Images**: Dynamic backgrounds from Unsplash API

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **File Upload**: Multer
- **Email Service**: Nodemailer
- **Image API**: Unsplash
- **Development**: Nodemon

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- Git

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd 2547252_LabEx9
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

#### Option A: Using MySQL Command Line
```sql
-- Connect to MySQL
mysql -u root -p

-- Enter your password: 123456

-- Run the setup script
source setup_database.sql
```

#### Option B: Using MySQL Workbench
1. Open MySQL Workbench
2. Connect to your MySQL server
3. Open and run the `setup_database.sql` file

### 4. Configure Email Settings

Edit `config/email.js` and update:
```javascript
auth: {
    user: 'your-email@gmail.com', // Your Gmail address
    pass: 'your-app-password'     // Your Gmail app password
}
```

**To get Gmail App Password:**
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account Settings > Security
3. Generate an App Password for "Mail"

### 5. Environment Variables (Optional)
Create a `.env` file in the root directory:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=eventease_db
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

## Running the Application

### Development Mode (with Nodemon)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Request Format for User Creation/Update
```javascript
// FormData with fields:
{
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    profile_picture: File (optional)
}
```

## 🧪 Testing with Postman/Thunder Client

### 1. Create User (POST)
- **URL**: `http://localhost:3000/api/users`
- **Method**: POST
- **Body**: Form-data
  - `name`: John Doe
  - `email`: john@example.com
  - `phone`: +1234567890
  - `profile_picture`: [Select File]

### 2. Get All Users (GET)
- **URL**: `http://localhost:3000/api/users`
- **Method**: GET

### 3. Get User by ID (GET)
- **URL**: `http://localhost:3000/api/users/1`
- **Method**: GET

### 4. Update User (PUT)
- **URL**: `http://localhost:3000/api/users/1`
- **Method**: PUT
- **Body**: Form-data (same as create)

### 5. Delete User (DELETE)
- **URL**: `http://localhost:3000/api/users/1`
- **Method**: DELETE

## Project Structure

```
2547252_LabEx9/
├── config/
│   ├── database.js          # MySQL connection
│   └── email.js            # Email configuration
├── controllers/
│   └── userController.js   # User CRUD operations
├── middleware/
│   └── upload.js           # Multer file upload
├── routes/
│   └── userRoutes.js       # User API routes
├── public/
│   ├── css/                # Stylesheets
│   ├── js/
│   │   └── app.js         # Frontend JavaScript
│   ├── uploads/           # Profile picture uploads
│   ├── images/            # Static images
│   └── index.html         # Main HTML file
├── server.js               # Express server
├── setup_database.sql      # Database setup script
├── package.json            # Dependencies
└── README.md              # This file
```

## Customization

### Changing Colors
Edit the Tailwind config in `public/index.html`:
```javascript
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'pinterest-red': '#E60023',    // Change this
                'pinterest-gray': '#EFEFEF',   // Change this
                'pinterest-dark': '#111827'    // Change this
            }
        }
    }
}
```

### Changing Background Images
Update the Unsplash query in `public/js/app.js`:
```javascript
const response = await fetch(`${UNSPLASH_API_URL}/photos/random?query=event&orientation=landscape`, {
    // Change 'event' to any other query like 'nature', 'city', etc.
});
```

## Deployment

### Heroku
1. Install Heroku CLI
2. Create Heroku app
3. Add MySQL addon (ClearDB or JawsDB)
4. Deploy:
```bash
git push heroku main
```

### Vercel
1. Install Vercel CLI
2. Deploy:
```bash
vercel
```

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Add environment variables

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set publish directory: `public`
4. Add environment variables

## 🔧 Troubleshooting

### Common Issues

1. **MySQL Connection Error**
   - Verify MySQL is running
   - Check credentials in `config/database.js`
   - Ensure database exists

2. **Email Not Sending**
   - Verify Gmail credentials
   - Check app password is correct
   - Ensure 2FA is enabled

3. **File Upload Issues**
   - Check `public/uploads` directory exists
   - Verify file size (max 5MB)
   - Ensure file type is image

4. **Port Already in Use**
   - Change port in `server.js`
   - Kill process using the port

### Error Logs
Check the console for detailed error messages. The application logs all errors with stack traces.

## Features in Detail

### User Management
- **Create**: Add new users with profile pictures
- **Read**: View all users in a beautiful grid layout
- **Update**: Edit user information and profile pictures
- **Delete**: Remove users with confirmation

### Profile Pictures
- Drag & drop support
- Image preview
- Automatic resizing
- Multiple format support (JPG, PNG, etc.)

### Email System
- Welcome emails on registration
- HTML and text email formats
- Professional email templates
- Error handling for failed emails

### Statistics Dashboard
- Total user count
- New users this month
- Active user count
- Real-time updates

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

##  Author

Sudeepa - Student ID: 2547252

## Support

For support and questions:
- Create an issue in the repository
- Contact: your-email@example.com

---

**Happy Coding!**
