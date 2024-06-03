const jwt = require('jsonwebtoken');

const generateToken = (payload, expiresIn = '1h') => {
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};

module.exports = { generateToken, verifyToken };

