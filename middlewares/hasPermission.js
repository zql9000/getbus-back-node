const { response } = require('express');
const Permission = require('../models/Permission');
const RolePermission = require('../models/RolePermission');

function hasPermission(permission) {
  return async function (req, res = response, next) {
    try {
      const permissionFound = await Permission.findOne({ name: permission });

      if (!permissionFound) {
        return res.status(403).json({
          ok: false,
          message: 'You do not have permission to execute this action',
        });
      }

      const rolePermissionFound = await RolePermission.findOne({
        roleId: req.roleId,
        permissionId: permissionFound._id,
      });

      if (!rolePermissionFound) {
        return res.status(403).json({
          ok: false,
          message: 'You do not have permission to execute this action',
        });
      }

      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({
        ok: false,
        message: 'You do not have permission to execute this action',
      });
    }
  };
}

module.exports = { hasPermission };
