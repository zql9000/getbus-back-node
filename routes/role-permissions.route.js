// Routes /api/role-permissions
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listRolePermissions,
  getRolePermission,
  newRolePermission,
  modifyRolePermission,
  deleteRolePermission,
} = require('../controllers/role-permissions.controller');

router.use(validateJWT);

const moduleName = 'RolePermission';

router.get('/', hasPermission(`${moduleName}List`), listRolePermissions);

router.get('/:id', hasPermission(`${moduleName}Get`), getRolePermission);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('roleId', 'Role is required').not().isEmpty(),
    check('permissionId', 'Permission is required').not().isEmpty(),
    validateParams,
  ],
  newRolePermission
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('roleId', 'Role is required').not().isEmpty(),
    check('permissionId', 'Permission is required').not().isEmpty(),
    validateParams,
  ],
  modifyRolePermission
);

router.delete(
  '/:id',
  hasPermission(`${moduleName}Delete`),
  deleteRolePermission
);

module.exports = router;
