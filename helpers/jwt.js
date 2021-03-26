const jwt = require('jsonwebtoken');

const generateToken = (userId, roleId) => {
  const payload = { userId, roleId };
  return jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' });
};

module.exports = { generateToken };
