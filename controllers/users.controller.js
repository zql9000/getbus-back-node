const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const DocumentType = require('../models/DocumentType');
const Person = require('../models/Person');
const Role = require('../models/Role');
const User = require('../models/User');

const listUsers = async (req, res = response) => {
  try {
    const users = await User.find()
      .populate('personId')
      .populate('roleId')
      .populate({ path: 'personId', populate: { path: 'documentTypeId' } });

    return res.json({
      ok: true,
      users: users.map((user) => ({
        id: user.id,
        username: user.username,
        personId: user.personId._id,
        name: user.personId.name,
        lastName: user.personId.lastName,
        roleId: user.roleId._id,
        roleName: user.roleId.name,
        documentTypeId: user.personId.documentTypeId._id,
        documentTypeShortName: user.personId.documentTypeId.shortName,
        documentNumber: user.personId.documentNumber,
        birthdate: user.personId.birthdate,
      })),
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
    const user = await User.findById(userId)
      .populate('personId')
      .populate('roleId')
      .populate({ path: 'personId', populate: { path: 'documentTypeId' } });

    return res.json({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        personId: user.personId._id,
        name: user.personId.name,
        lastName: user.personId.lastName,
        roleId: user.roleId._id,
        roleName: user.roleId.name,
        documentTypeId: user.personId.documentTypeId._id,
        documentTypeShortName: user.personId.documentTypeId.shortName,
        documentNumber: user.personId.documentNumber,
        birthdate: user.personId.birthdate,
      },
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
    const existingUser = await User.findOne({ username: req.body.username });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgUserExists,
      });
    }

    const existingRole = await Role.findById(req.body.roleId);

    if (!existingRole) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgRoleNotFound,
      });
    }

    const existingDocumentType = await DocumentType.findById(
      req.body.documentTypeId
    );

    if (!existingDocumentType) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgDocumentTypeNotFound,
      });
    }

    const person = new Person(req.body);
    const insertedPerson = await person.save();
    req.body.personId = insertedPerson._id;

    const user = new User(req.body);
    const insertedUser = await user.save();

    return res.status(201).json({
      ok: true,
      user: {
        id: insertedUser.id,
        username: insertedUser.username,
        personId: insertedPerson._id,
        name: insertedPerson.name,
        lastName: insertedPerson.lastName,
        roleId: existingRole._id,
        roleName: existingRole.name,
        documentTypeId: existingDocumentType._id,
        documentTypeShortName: existingDocumentType.shortName,
        documentNumber: insertedPerson.documentNumber,
        birthdate: insertedPerson.birthdate,
      },
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
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgUserNotFound,
      });
    }

    const existingUser = await User.findOne({
      username: req.body.username,
      _id: { $ne: userId },
    });

    if (existingUser) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgUserExists,
      });
    }

    const existingRole = await Role.findById(req.body.roleId);

    if (!existingRole) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgRoleNotFound,
      });
    }

    const existingDocumentType = await DocumentType.findById(
      req.body.documentTypeId
    );

    if (!existingDocumentType) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgDocumentTypeNotFound,
      });
    }

    const newUser = { ...req.body };
    if (!newUser.password || newUser.password?.length === 0) {
      newUser.password = user.password;
    }
    const updatedPerson = await Person.findByIdAndUpdate(
      user.personId,
      newUser,
      {
        new: true,
      }
    );
    const updatedUser = await User.findByIdAndUpdate(userId, newUser, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgUserNotFound,
      });
    }

    return res.json({
      ok: true,
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        personId: updatedPerson._id,
        name: updatedPerson.name,
        lastName: updatedPerson.lastName,
        roleId: existingRole._id,
        roleName: existingRole.name,
        documentTypeId: existingDocumentType._id,
        documentTypeShortName: existingDocumentType.shortName,
        documentNumber: updatedPerson.documentNumber,
        birthdate: updatedPerson.birthdate,
      },
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
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgUserNotFound,
      });
    }

    const deletedPerson = await Person.findByIdAndDelete(deletedUser.personId);

    return res.json({
      ok: true,
      user: deletedUser,
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
