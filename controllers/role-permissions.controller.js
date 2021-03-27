const { response } = require('express');
const RolePermission = require('../models/RolePermission');

const listRolePermissions = async (req, res = response) => {
  try {
    const rolePermissions = await RolePermission.find();

    return res.json({
      ok: true,
      rolePermissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const getRolePermission = async (req, res = response) => {
  try {
    const rolePermissionId = req.params.id;
    const rolePermission = await RolePermission.findById(rolePermissionId);

    return res.json({
      ok: true,
      rolePermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newRolePermission = async (req, res = response) => {
  try {
    const existingRolePermission = await RolePermission.find({
      role: req.body.role,
      permission: req.body.permission,
    });

    if (existingRolePermission) {
      return res.status(409).json({
        ok: false,
        message:
          'A role-permission with this role and permission already exists',
      });
    }

    const rolePermission = new RolePermission(req.body);
    const insertedRolePermission = await rolePermission.save();

    return res.status(201).json({
      ok: true,
      rolePermission: insertedRolePermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyRolePermission = async (req, res = response) => {
  try {
    const rolePermissionId = req.params.id;
    const existingRolePermission = await RolePermission.find({
      role: req.body.role,
      permission: req.body.permission,
      _id: { $not: { rolePermissionId } },
    });

    if (existingRolePermission) {
      return res.status(409).json({
        ok: false,
        message:
          'A role-permission with this role and permission already exists',
      });
    }

    const rolePermission = await RolePermission.findById(rolePermissionId);

    if (!rolePermission) {
      return res.status(404).json({
        ok: false,
        message: 'RolePermission not found',
      });
    }

    const newRolePermission = { ...req.body };

    const updatedRolePermission = await RolePermission.findByIdAndUpdate(
      rolePermissionId,
      newRolePermission,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      rolePermission: updatedRolePermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deleteRolePermission = async (req, res = response) => {
  try {
    const rolePermissionId = req.params.id;
    const rolePermission = await RolePermission.findById(rolePermissionId);

    if (!rolePermission) {
      return res.status(404).json({
        ok: false,
        message: 'RolePermission not found',
      });
    }

    const deletedRolePermission = await RolePermission.findByIdAndDelete(
      rolePermissionId
    );

    return res.json({
      ok: true,
      rolePermission: deletedRolePermission,
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
  listRolePermissions,
  getRolePermission,
  newRolePermission,
  modifyRolePermission,
  deleteRolePermission,
};
