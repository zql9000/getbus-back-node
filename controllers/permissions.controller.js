const { response } = require('express');
const { responseMessages } = require('../helpers/spanishMessages');
const Permission = require('../models/Permission');

const listPermissions = async (req, res = response) => {
  try {
    const permissions = await Permission.find();

    return res.json({
      ok: true,
      permissions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const getPermission = async (req, res = response) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findById(permissionId);

    return res.json({
      ok: true,
      permission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const newPermission = async (req, res = response) => {
  try {
    const existingPermission = await Permission.findOne({
      name: req.body.name,
    });

    if (existingPermission) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgPermissionExists,
      });
    }

    const permission = new Permission(req.body);
    const insertedPermission = await permission.save();

    return res.status(201).json({
      ok: true,
      permission: insertedPermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const modifyPermission = async (req, res = response) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findById(permissionId);

    if (!permission) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgPermissionNotFound,
      });
    }

    const existingPermission = await Permission.findOne({
      name: req.body.name,
      _id: { $ne: permissionId },
    });

    if (existingPermission) {
      return res.status(409).json({
        ok: false,
        message: responseMessages.msgPermissionExists,
      });
    }

    const newPermission = { ...req.body };
    const updatedPermission = await Permission.findByIdAndUpdate(
      permissionId,
      newPermission,
      {
        new: true,
      }
    );

    if (!updatedPermission) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgPermissionNotFound,
      });
    }

    return res.json({
      ok: true,
      permission: updatedPermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: responseMessages.msgAskAdmin,
    });
  }
};

const deletePermission = async (req, res = response) => {
  try {
    const permissionId = req.params.id;
    const deletedPermission = await Permission.findByIdAndDelete(permissionId);

    if (!deletedPermission) {
      return res.status(404).json({
        ok: false,
        message: responseMessages.msgPermissionNotFound,
      });
    }

    return res.json({
      ok: true,
      permission: deletedPermission,
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
  listPermissions,
  getPermission,
  newPermission,
  modifyPermission,
  deletePermission,
};
