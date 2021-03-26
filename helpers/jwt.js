const jwt = require('jsonwebtoken');

const generateToken = (idUser, idRole) => {
  const payload = { idUser, idRole };
  return jwt.sign(payload, process.env.SECRET_JWT_SEED, { expiresIn: '2h' });
};

module.exports = { generateToken };
