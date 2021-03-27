const { response } = require('express');
const User = require('../models/User');

const listUsers = async (req, res = response) => {
  try {
    const users = await User.find().populate('idPerson');

    return res.json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const getUser = async (req, res = response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('idPerson');

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newUser = async (req, res = response) => {
  try {
    const existingUser = await User.find({ username: req.body.username });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: 'A user with this username already exists',
      });
    }

    const user = new User(req.body);
    const insertedUser = await user.save();

    return res.status(201).json({
      ok: true,
      user: insertedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyUser = async (req, res = response) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.find({
      username: req.body.username,
      _id: { $not: { userId } },
    });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: 'A user with this username already exists',
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }

    const newUser = { ...req.body };

    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    return res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteUser = async (req, res = response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    return res.json({
      ok: true,
      user: deletedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

module.exports = {
  listUsers,
  getUser,
  newUser,
  modifyUser,
  deleteUser,
};
