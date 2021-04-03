const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
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
      message: responseMessages.msgAskAdmin,
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
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newRolePermission = async (req, res = response) => {
  try {
    const existingRolePermission = await RolePermission.findOne({
      role: req.body.role,
      permission: req.body.permission,
    });

    if (existingRolePermission) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgRolePermissionExists,
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
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyRolePermission = async (req, res = response) => {
  try {
    const rolePermissionId = req.params.id;
    const existingRolePermission = await RolePermission.findOne({
      role: req.body.role,
      permission: req.body.permission,
      _id: { $ne: rolePermissionId },
    });

    if (existingRolePermission) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgRolePermissionExists,
      });
    }

    const rolePermission = await RolePermission.findById(rolePermissionId);

    if (!rolePermission) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgRolePermissionNotFound,
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
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deleteRolePermission = async (req, res = response) => {
  try {
    const rolePermissionId = req.params.id;
    const deletedRolePermission = await RolePermission.findByIdAndDelete(
      rolePermissionId
    );

    if (!deletedRolePermission) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgRolePermissionNotFound,
      });
    }

    return res.json({
      ok: true,
      rolePermission: deletedRolePermission,
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
  listRolePermissions,
  getRolePermission,
  newRolePermission,
  modifyRolePermission,
  deleteRolePermission,
};
