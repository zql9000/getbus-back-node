const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/User');

const login = async (req, res = response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
      .populate('roleId', 'name')
      .populate('personId', ['name', 'lastName']);

    if (!user) {
      return res
        .status(400)
        .json({ ok: false, message: 'User or Password is incorrect' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ ok: false, message: 'User or Password is incorrect' });
    }

    const token = generateToken(user.id, user.roleId._id);

    return res.json({
      ok: true,
      userId: user._id,
      name: user.personId.name,
      lastName: user.personId.lastName,
      roleId: user.roleId._id,
      role: user.roleId.name,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const renewToken = async (req, res = response) => {
  const { userId, roleId } = req;

  const user = await User.findById(userId)
    .populate('personId')
    .populate('roleId');
  const token = generateToken(userId, roleId);

  return res.json({
    ok: true,
    userId: user._id,
    name: user.personId.name,
    lastName: user.personId.lastName,
    roleId: user.roleId._id,
    role: user.roleId.name,
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
