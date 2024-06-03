const express = require('express');
const router = express.Router();
const { register, confirmEmail, login, verifyOtp, generateApiKey } = require('../controllers/authController');

router.post('/register', register);
router.get('/confirm/:token', confirmEmail);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/generate-api-key', generateApiKey);

module.exports = router;

