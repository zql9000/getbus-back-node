const { response } = require('express');
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
      message: 'Ask the administrator for information about this error',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const newPermission = async (req, res = response) => {
  try {
    const existingPermission = await Permission.find({ name: req.body.name });

    if (existingPermission) {
      return res.status(409).json({
        ok: false,
        message: 'A permission with this name already exists',
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
      message: 'Ask the administrator for information about this error',
    });
  }
};

const modifyPermission = async (req, res = response) => {
  try {
    const permissionId = req.params.id;
    const existingPermission = await Permission.find({
      name: req.body.name,
      _id: { $not: { permissionId } },
    });

    if (existingPermission) {
      return res.status(409).json({
        ok: false,
        message: 'A permission with this name already exists',
      });
    }

    const permission = await Permission.findById(permissionId);

    if (!permission) {
      return res.status(404).json({
        ok: false,
        message: 'Permission not found',
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

    return res.json({
      ok: true,
      permission: updatedPermission,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      message: 'Ask the administrator for information about this error',
    });
  }
};

const deletePermission = async (req, res = response) => {
  try {
    const permissionId = req.params.id;
    const permission = await Permission.findById(permissionId);

    if (!permission) {
      return res.status(404).json({
        ok: false,
        message: 'Permission not found',
      });
    }

    const deletedPermission = await Permission.findByIdAndDelete(permissionId);

    return res.json({
      ok: true,
      permission: deletedPermission,
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
  listPermissions,
  getPermission,
  newPermission,
  modifyPermission,
  deletePermission,
};
