const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newRole = async (req, res = response) => {
  try {
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyRole = async (req, res = response) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        ok: false,
        message: 'Role not found',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteRole = async (req, res = response) => {
  try {
    const roleId = req.params.id;
    const role = await Role.findById(roleId);

    if (!role) {
      return res.status(404).json({
        ok: false,
        message: 'Role not found',
      });
    }

    const deletedRole = await Role.findByIdAndDelete(roleId);

    return res.json({
      ok: true,
      role: deletedRole,
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
  listRoles,
  getRole,
  newRole,
  modifyRole,
  deleteRole,
};
