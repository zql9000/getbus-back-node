const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Role = require('../models/Role');

const listRoles = async (req, res = response) => {
  try {
    const roles = await Role.find();

    return res.json({
      ok: true,
      roles,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getRole = async (req, res = response) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    return res.json({
      ok: true,
      role,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newRole = async (req, res = response) => {
  try {
    const existingRole = await Role.findOne({ name: req.body.name });

    if (existingRole) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgRoleExists,
      });
    }

    const role = new Role(req.body);
    const insertedRole = await role.save();

    return res.status(201).json({
      ok: true,
      role: insertedRole,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyRole = async (req, res = response) => {
  try {
    const roleId = req.params.id;
    const existingRole = await Role.findOne({
      name: req.body.name,
      _id: { $ne: roleId },
    });

    if (existingRole) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgRoleExists,
      });
    }

    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgRoleNotFound,
      });
    }

    const newRole = { ...req.body };

    const updatedRole = await Role.findByIdAndUpdate(roleId, newRole, {
      new: true,
    });

    return res.json({
      ok: true,
      role: updatedRole,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteRole = async (req, res = response) => {
  try {
    const roleId = req.params.id;
    const deletedRole = await Role.findByIdAndDelete(roleId);

    if (!deletedRole) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgRoleNotFound,
      });
    }

    return res.json({
      ok: true,
      role: deletedRole,
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
  listRoles,
  getRole,
  newRole,
  modifyRole,
  deleteRole,
};
