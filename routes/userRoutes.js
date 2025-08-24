const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');
const { sendEmail, testEmailConnection } = require('../config/email');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post('/', upload.single('profile_picture'), userController.createUser);

router.put('/:id', upload.single('profile_picture'), userController.updateUser);

router.delete('/:id', userController.deleteUser);

router.post('/test-email', async (req, res) => {
  try {
    const isConnected = await testEmailConnection();
    if (isConnected) {
      res.json({ success: true, message: 'Email connection successful!' });
    } else {
      res.status(500).json({ success: false, message: 'Email connection failed' });
    }
  } catch (error) {
    console.error('Error testing email connection:', error);
    res.status(500).json({ success: false, message: 'Error testing email connection' });
  }
});

router.post('/send-test-email', async (req, res) => {
  try {
    const { to } = req.body;
    
    if (!to) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email address is required' 
      });
    }

    const emailResult = await sendEmail(to, 'testEmail', {});
    
    if (emailResult.success) {
      res.json({ 
        success: true, 
        message: 'Test email sent successfully!',
        messageId: emailResult.messageId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send test email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/send-email', async (req, res) => {
  try {
    const { to, subject, message, userName } = req.body;
    
    if (!to || !subject || !message || !userName) {
      return res.status(400).json({ 
        success: false, 
        message: 'To, subject, message, and userName are required' 
      });
    }

    const emailResult = await sendEmail(to, 'customMessage', { subject, message, userName });
    
    if (emailResult.success) {
      res.json({ 
        success: true, 
        message: 'Custom email sent successfully!',
        messageId: emailResult.messageId
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send email',
        error: emailResult.error
      });
    }
  } catch (error) {
    console.error('Error sending custom email:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
