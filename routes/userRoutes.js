const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', userController.getUserById);

// POST create new user (with profile picture upload)
router.post('/', upload.single('profile_picture'), userController.createUser);

// PUT update user (with optional profile picture upload)
router.put('/:id', upload.single('profile_picture'), userController.updateUser);

// DELETE user
router.delete('/:id', userController.deleteUser);

module.exports = router;
