const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
const { sendEmail } = require('../services/emailService');
const { generateToken, verifyToken } = require('../services/jwtService');
const { setOTP, getOTP } = require('../services/redisService');
const Kryptonian = require('../models/Kryptonian');

const register = async (req, res) => {
    const { email } = req.body;
    const existingKryptonian = await Kryptonian.findOne({ email });

    if (existingKryptonian) {
        return res.status(400).json({ message: 'Email already registered' });
    }

    const kryptonian = new Kryptonian({ email });
    await kryptonian.save();

    const token = generateToken({ email }, '1h');
    const confirmUrl = `http://${req.headers.host}/api/v1/confirm/${token}`;

    await sendEmail(email, 'Confirm your email', `Click here to confirm your email: ${confirmUrl}`);

    res.status(201).json({ message: 'Registration successful. Please confirm your email.' });
};

const confirmEmail = async (req, res) => {
    const { token } = req.params;
    try {
        const { email } = verifyToken(token);
        const kryptonian = await Kryptonian.findOne({ email });

        if (!kryptonian) {
            return res.status(404).json({ message: 'User not found' });
        }

        kryptonian.confirmed = true;
        await kryptonian.save();

        res.status(200).json({ message: 'You have confirmed your account. Thanks!' });
    } catch (error) {
        res.status(400).json({ message: 'The confirmation link is invalid or has expired.' });
    }
};

const login = async (req, res) => {
    const { email } = req.body;
    const kryptonian = await Kryptonian.findOne({ email, confirmed: true });

    if (!kryptonian) {
        return res.status(400).json({ message: 'Invalid email or email not confirmed' });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await setOTP(`otp:${email}`, otp);

    await sendEmail(email, 'Your OTP Code', `Your OTP code is ${otp}`);

    res.status(200).json({ message: 'OTP sent to your email' });
};

const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    const storedOtp = await getOTP(`otp:${email}`);

    if (storedOtp && storedOtp === otp) {
        const token = generateToken({ email });
        res.status(200).json({ token });
    } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
};

const generateApiKey = async (req, res) => {
    const { email } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    try {
        const { email: verifiedEmail } = verifyToken(token);
        if (verifiedEmail !== email) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const kryptonian = await Kryptonian.findOne({ email });

        if (!kryptonian) {
            return res.status(404).json({ message: 'User not found' });
        }

        const apiKey = uuidv4();
        kryptonian.apiKey = apiKey;
        await kryptonian.save();

        res.status(201).json({ apiKey });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { register, confirmEmail, login, verifyOtp, generateApiKey };

