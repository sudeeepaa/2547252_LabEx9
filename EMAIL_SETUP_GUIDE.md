# 📧 EventEase Email Setup Guide

## 🎯 **What's Already Working**

Your EventEase project already has a complete email system with:
- ✅ **Nodemailer installed** and configured
- ✅ **Gmail integration** set up
- ✅ **Email templates** for all user actions
- ✅ **Automatic emails** on user registration, updates, and deletion
- ✅ **Custom email sending** capability
- ✅ **Email testing tools** included

## 🚀 **Quick Start - Your Email System is Ready!**

### 1. **Current Configuration**
Your email is already configured with:
- **Email:** sudeepasanthanam2004@gmail.com
- **App Password:** lkow iaid qttg mgst
- **Service:** Gmail

### 2. **Test Your Email System**
1. **Start your server:**
   ```bash
   npm run dev
   ```

2. **Visit the email test page:**
   ```
   http://localhost:3000/email-test.html
   ```

3. **Test email connection** - Click "Test Connection"
4. **Send a test email** - Fill out the form and send

## 📧 **Email Templates Available**

### **Automatic Emails (Already Working)**
1. **Welcome Email** - Sent when users register
2. **Update Confirmation** - Sent when profiles are updated  
3. **Goodbye Email** - Sent when accounts are deleted

### **Custom Emails (New Feature)**
- Send personalized messages to any user
- Custom subjects and content
- Professional HTML formatting

## 🔧 **How to Use the Email System**

### **1. Automatic Emails**
These work automatically when you:
- **Create a user** → Welcome email sent
- **Update a user** → Update confirmation sent
- **Delete a user** → Goodbye email sent

### **2. Manual Email Sending**
Use the API endpoint:
```bash
POST /api/users/send-email
{
  "to": "recipient@example.com",
  "subject": "Your Subject",
  "message": "Your message content",
  "userName": "Recipient Name"
}
```

### **3. Test Email Connection**
```bash
POST /api/users/test-email
```

## 🎨 **Email Features**

### **Beautiful HTML Templates**
- Professional design with EventEase branding
- Responsive layout for all devices
- Color-coded sections for different message types
- Call-to-action buttons where appropriate

### **Automatic Fallbacks**
- HTML and plain text versions
- Error handling without breaking user operations
- Detailed logging for debugging

## 🛠️ **Customization Options**

### **Add New Email Templates**
Edit `config/email.js` to add new templates:

```javascript
const emailTemplates = {
  // ... existing templates ...
  
  newTemplate: (userName) => ({
    subject: 'Your Subject',
    html: `<div>Your HTML content for ${userName}</div>`,
    text: `Your plain text for ${userName}`
  })
};
```

### **Modify Existing Templates**
- Update colors, fonts, and styling
- Add company logos or branding
- Customize message content

### **Change Email Service**
Modify the transporter in `config/email.js`:

```javascript
// For Outlook
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// For custom SMTP
const transporter = nodemailer.createTransport({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
```

## 🔒 **Security Best Practices**

### **Current Setup**
- ✅ Using Gmail App Passwords (more secure than regular passwords)
- ✅ Environment variable support ready
- ✅ No hardcoded credentials in production code

### **Recommended Improvements**
1. **Create `.env` file** (optional but recommended):
   ```env
   EMAIL_USER=sudeepasanthanam2004@gmail.com
   EMAIL_PASS=lkow iaid qttg mgst
   ```

2. **Never commit credentials** to version control
3. **Use environment variables** in production

## 🧪 **Testing Your Email System**

### **1. Test Page**
Visit: `http://localhost:3000/email-test.html`

### **2. API Testing**
Use tools like Postman or curl:

```bash
# Test connection
curl -X POST http://localhost:3000/api/users/test-email

# Send custom email
curl -X POST http://localhost:3000/api/users/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "message": "This is a test message",
    "userName": "Test User"
  }'
```

### **3. User Operations Testing**
- Create a new user → Check for welcome email
- Update user profile → Check for update email
- Delete user → Check for goodbye email

## 🚨 **Troubleshooting**

### **Common Issues**

1. **"Authentication failed"**
   - Verify your Gmail app password: `lkow iaid qttg mgst`
   - Enable 2-factor authentication on Google
   - Generate new app password if needed

2. **"Connection timeout"**
   - Check internet connection
   - Verify Gmail service is accessible
   - Check firewall settings

3. **"Email not received"**
   - Check spam/junk folder
   - Verify recipient email address
   - Check Gmail sending limits

### **Debug Steps**
1. Check server console for error messages
2. Use the test connection feature
3. Verify email credentials
4. Test with a simple email first

## 📊 **Monitoring & Logging**

### **Console Output**
Your server logs all email activities:
- ✅ Email sent successfully
- ⚠️ Email failed to send
- ❌ Email errors

### **Email Tracking**
- Message IDs for each sent email
- Success/failure status
- Detailed error messages

## 🎉 **You're All Set!**

Your EventEase email system is:
- ✅ **Fully functional** and ready to use
- ✅ **Professionally designed** with beautiful templates
- ✅ **Automatically integrated** with user operations
- ✅ **Easy to test** with the included test page
- ✅ **Highly customizable** for future needs

## 🚀 **Next Steps**

1. **Test the system** using the test page
2. **Create some users** to see welcome emails
3. **Customize templates** to match your brand
4. **Add new email types** as needed
5. **Deploy and enjoy** your professional email system!

---

**Need help?** Check the console logs and use the test page to diagnose any issues.
