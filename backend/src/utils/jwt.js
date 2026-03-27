const jwt = require('jsonwebtoken');

exports.sign = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET||'123', { expiresIn: '7d' });

exports.verify = (token) =>
  jwt.verify(token, process.env.JWT_SECRET||'123');