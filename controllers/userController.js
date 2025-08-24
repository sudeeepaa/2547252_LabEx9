const db = require('../config/database');
const { sendEmail } = require('../config/email');

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users ORDER BY created_at DESC');
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Create new user
const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    // Validate required fields
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and phone are required' 
      });
    }

    // Check if email already exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered' 
      });
    }

    // Insert new user
    const [result] = await db.query(
      'INSERT INTO users (name, email, phone, profile_picture) VALUES (?, ?, ?, ?)',
      [name, email, phone, profilePicture]
    );

    const newUser = {
      id: result.insertId,
      name,
      email,
      phone,
      profile_picture: profilePicture,
      created_at: new Date()
    };

    // Send welcome email
    try {
      const emailResult = await sendEmail(email, 'registrationSuccess', { userName: name });
      if (emailResult.success) {
        console.log('✅ Welcome email sent successfully to:', email);
      } else {
        console.log('⚠️ Welcome email failed to send:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Failed to send welcome email:', emailError);
      // Don't fail the registration if email fails
    }

    res.status(201).json({ 
      success: true, 
      message: 'User registered successfully',
      data: newUser
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    // Check if user exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Check if email is being changed and if it already exists
    if (email && email !== existingUser[0].email) {
      const [emailCheck] = await db.query('SELECT id FROM users WHERE email = ? AND id != ?', [email, id]);
      if (emailCheck.length > 0) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
    }

    // Build update query
    let updateQuery = 'UPDATE users SET ';
    let updateValues = [];
    let updateFields = [];

    if (name) {
      updateFields.push('name = ?');
      updateValues.push(name);
    }
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }
    if (phone) {
      updateFields.push('phone = ?');
      updateValues.push(phone);
    }
    if (profilePicture) {
      updateFields.push('profile_picture = ?');
      updateValues.push(profilePicture);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ success: false, message: 'No fields to update' });
    }

    updateQuery += updateFields.join(', ') + ', updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    updateValues.push(id);

    await db.query(updateQuery, updateValues);

    // Get updated user
    const [updatedUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);

    // Send update confirmation email
    try {
      const emailResult = await sendEmail(updatedUser[0].email, 'userUpdate', { 
        userName: updatedUser[0].name 
      });
      if (emailResult.success) {
        console.log('✅ Update confirmation email sent successfully to:', updatedUser[0].email);
      } else {
        console.log('⚠️ Update confirmation email failed to send:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Failed to send update confirmation email:', emailError);
      // Don't fail the update if email fails
    }

    res.json({ 
      success: true, 
      message: 'User updated successfully',
      data: updatedUser[0]
    });

  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if user exists
    const [existingUser] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
    if (existingUser.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Send goodbye email before deletion
    try {
      const emailResult = await sendEmail(existingUser[0].email, 'userDeleted', { 
        userName: existingUser[0].name 
      });
      if (emailResult.success) {
        console.log('✅ Goodbye email sent successfully to:', existingUser[0].email);
      } else {
        console.log('⚠️ Goodbye email failed to send:', emailResult.error);
      }
    } catch (emailError) {
      console.error('❌ Failed to send goodbye email:', emailError);
      // Don't fail the deletion if email fails
    }

    // Delete user
    await db.query('DELETE FROM users WHERE id = ?', [id]);

    res.json({ success: true, message: 'User deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
