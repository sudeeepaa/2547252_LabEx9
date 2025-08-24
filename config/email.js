const nodemailer = require('nodemailer');
require('dotenv').config();

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'sudeepasanthanam2004@gmail.com',
    pass: process.env.EMAIL_PASS || 'lkow iaid qttg mgst'
  }
});

// Email templates
const emailTemplates = {
  testEmail: () => ({
    subject: '🧪 EventEase Email Test - Working!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #17a2b8; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🧪 Email Test Successful!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello there! 👋</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            This is a test email from your EventEase system. If you're seeing this, your email configuration is working perfectly!
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #17a2b8;">
            <h3 style="color: #17a2b8; margin-top: 0;">🎉 What This Means</h3>
            <p style="color: #666; margin-bottom: 0;">
              Your EventEase email system is fully functional and ready to send beautiful emails to your users!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000" style="background-color: #17a2b8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Visit EventEase</a>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
            Best regards,<br>The EventEase Team
          </p>
        </div>
      </div>
    `,
    text: `Email Test Successful! Hello there! This is a test email from your EventEase system. If you're seeing this, your email configuration is working perfectly! Best regards, The EventEase Team`
  }),

  registrationSuccess: (userName) => ({
    subject: 'Welcome to EventEase - Registration Successful!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #4a90e2; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">🎉 Welcome to EventEase!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Thank you for registering with EventEase! Your account has been successfully created.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #4a90e2;">
            <h3 style="color: #4a90e2; margin-top: 0;">🚀 Ready to Get Started?</h3>
            <p style="color: #666; margin-bottom: 0;">
              Start exploring events and managing your schedule with our powerful event management tools!
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="http://localhost:3000" style="background-color: #4a90e2; color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Start Exploring</a>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
            Best regards,<br>The EventEase Team
          </p>
        </div>
      </div>
    `,
    text: `Welcome to EventEase! Hello ${userName}! Thank you for registering with EventEase! Your account has been successfully created. Ready to Get Started? Start exploring events and managing your schedule! Best regards, The EventEase Team`
  }),

  userUpdate: (userName) => ({
    subject: 'EventEase - Profile Updated Successfully!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #28a745; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">✅ Profile Updated!</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Your EventEase profile has been successfully updated. All changes have been saved.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="color: #28a745; margin-top: 0;">📝 What's Next?</h3>
            <p style="color: #666; margin-bottom: 0;">
              Your updated information is now active. Continue managing your events and profile!
            </p>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
            Best regards,<br>The EventEase Team
          </p>
        </div>
      </div>
    `,
    text: `EventEase - Profile Updated Successfully! Hello ${userName}! Your EventEase profile has been successfully updated. All changes have been saved. Best regards, The EventEase Team`
  }),

  userDeleted: (userName) => ({
    subject: 'EventEase - Account Deleted',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">👋 Goodbye ${userName}</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="color: #666; line-height: 1.6; font-size: 16px;">
            Your EventEase account has been successfully deleted. We're sorry to see you go!
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
            <h3 style="color: #dc3545; margin-top: 0;">💭 Feedback Welcome</h3>
            <p style="color: #666; margin-bottom: 0;">
              If you have any feedback about your experience, we'd love to hear from you.
            </p>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
            Best regards,<br>The EventEase Team
          </p>
        </div>
      </div>
    `,
    text: `EventEase - Account Deleted. Goodbye ${userName}. Your EventEase account has been successfully deleted. We're sorry to see you go! Best regards, The EventEase Team`
  }),

  customMessage: (subject, message, userName) => ({
    subject: subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; padding: 20px;">
        <div style="background-color: #6c757d; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">📧 EventEase Message</h1>
        </div>
        
        <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px;">
          <h2 style="color: #333; margin-bottom: 20px;">Hello ${userName}!</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6c757d;">
            <p style="color: #666; line-height: 1.6; font-size: 16px; margin: 0;">
              ${message}
            </p>
          </div>
          
          <p style="color: #999; font-size: 14px; margin-top: 30px; text-align: center;">
            Best regards,<br>The EventEase Team
          </p>
        </div>
      </div>
    `,
    text: `EventEase Message. Hello ${userName}! ${message}. Best regards, The EventEase Team`
  })
};

// Send email function
const sendEmail = async (to, templateName, data) => {
  try {
    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    // Pass arguments correctly to template function
    let emailContent;
    if (Array.isArray(data)) {
      emailContent = template(...data);
    } else if (typeof data === 'object' && data !== null) {
      emailContent = template(...Object.values(data));
    } else {
      emailContent = template(data);
    }

    const mailOptions = {
      from: process.env.EMAIL_USER || 'sudeepasanthanam2004@gmail.com',
      to: to,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    };

    console.log('📧 Sending email with options:', {
      to: to,
      template: templateName,
      subject: emailContent.subject,
      data: data
    });

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Test email connection
const testEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email server connection verified successfully!');
    return true;
  } catch (error) {
    console.error('❌ Email server connection failed:', error);
    return false;
  }
};

module.exports = { 
  sendEmail, 
  testEmailConnection,
  emailTemplates 
};
