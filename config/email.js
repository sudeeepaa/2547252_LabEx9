const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'sudeepasanthanam2004@gmail.com', // Your Gmail address
    pass: 'smhibtzclhmwiqso' // Replace with your Gmail app password
  }
});

// Email templates
const emailTemplates = {
  registrationSuccess: (userName) => ({
    subject: 'Welcome to EventEase - Registration Successful!',
    html: `
      <html>
      <head>
        <title>Welcome to EventEase</title>
      </head>
      <body>
        <h1>🎉 Welcome to EventEase!</h1>
        <h2>Hello ${userName}!</h2>
        <p>Thank you for registering with EventEase! Your account has been successfully created.</p>
        <p>Ready to Get Started? Start exploring events and managing your schedule!</p>
        <p>Best regards,<br>The EventEase Team</p>
      </body>
      </html>
    `,
    text: `Welcome to EventEase! Hello ${userName}! Thank you for registering with EventEase! Your account has been successfully created. Ready to Get Started? Start exploring events and managing your schedule! Best regards, The EventEase Team`
  })
};

// Send email function
const sendEmail = async (to, templateName, data = {}) => {
  try {
    const template = emailTemplates[templateName];
    if (!template) {
      throw new Error(`Email template '${templateName}' not found`);
    }

    const mailOptions = {
      from: 'sudeepasanthanam2004@gmail.com', // Your Gmail address
      to: to,
      subject: typeof template.subject === 'function' ? template.subject(data) : template.subject,
      html: typeof template.html === 'function' ? template.html(data) : template.html,
      text: typeof template.text === 'function' ? template.text(data) : template.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = { sendEmail };
