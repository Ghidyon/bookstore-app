const express = require('express');
const router = express.Router();

// Import book controllers
const AuthController = require('../controllers/authControllers');

// Register a new user
router.post('/signup', AuthController.registerNewUser);

// Login a user
router.post('/login', AuthController.loginUser);

module.exports = router;