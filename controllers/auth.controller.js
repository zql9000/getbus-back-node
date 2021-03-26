const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../helpers/jwt');
const User = require('../models/User');

const login = async (req, res = response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username })
      .populate('role', 'name')
      .populate('person', ['name', 'lastName']);

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

    const token = generateToken(user.id, user.role.id);

    return res.json({
      ok: true,
      userId: user._id,
      name: user.person.name,
      lastName: user.person.lastName,
      roleId: user.role._id,
      role: user.role.name,
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

const renewToken = (req, res = response) => {
  const { userId, roleId } = req;

  const token = generateToken(userId, roleId);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  login,
  renewToken,
};
