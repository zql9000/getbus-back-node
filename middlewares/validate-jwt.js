const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Token must be sent in the x-token header',
    });
  }

  try {
    const { userId, roleId } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.userId = userId;
    req.roleId = roleId;
  } catch (error) {
    return res.status(401).json({ ok: false, message: 'Invalid token' });
  }

  next();
};

module.exports = { validateJWT };
