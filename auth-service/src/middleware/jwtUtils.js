const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'dev-secret';
const expiresIn = process.env.JWT_EXPIRES || '1h';

function generateToken(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, secret);
}

module.exports = { generateToken, verifyToken };
