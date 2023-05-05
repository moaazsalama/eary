const jwt = require('jsonwebtoken');
const TokenGenerator = require('../helpers/token_generator');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }
  TokenGenerator.verify(token, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = user.userId;
    next();
  }
  );
}

module.exports = authenticateToken;
