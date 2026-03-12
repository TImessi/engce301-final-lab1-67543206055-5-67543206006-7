const jwt = require('jsonwebtoken');
function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
}
module.exports = { verifyToken };