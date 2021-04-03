const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Person = require('../models/Person');
const User = require('../models/User');

const listUsers = async (req, res = response) => {
  try {
    const users = await User.find().populate('personId');

    return res.json({
      ok: true,
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getUser = async (req, res = response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('personId');

    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newUser = async (req, res = response) => {
  try {
    const existingUser = await User.find({ username: req.body.username });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgUserExists,
      });
    }

    const person = new Person(req.body);
    const insertedPerson = await person.save();
    req.body.personId = insertedPerson._id;

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
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyUser = async (req, res = response) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.find({
      username: req.body.username,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgUserExists,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgUserNotFound,
      });
    }

    const newUser = { ...req.body };

    await Person.findByIdAndUpdate(user.personId, newUser);
    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    }).populate('personId');

    return res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
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
        message: responseMessages.msgUserNotFound,
      });
    }

    const deletedPerson = await Person.findByIdAndDelete(user.personId);
    const deletedUser = await User.findByIdAndDelete(userId);

    return res.json({
      ok: true,
      user: { ...deletedUser, person: deletedPerson },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
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
