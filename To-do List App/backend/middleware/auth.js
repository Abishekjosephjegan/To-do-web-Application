const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret_key_here';

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch {
    res.status(400).json({ message: 'Invalid token' });
  }
};