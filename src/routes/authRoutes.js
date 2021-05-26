const express = require('express');
const router = express.Router();

// Import book controllers
const AuthController = require('../controllers/authControllers');

router.post('/signup', AuthController.registerNewUser);

module.exports = router;