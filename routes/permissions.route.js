// Routes /api/permissions
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listPermissions,
  getPermission,
  newPermission,
  modifyPermission,
  deletePermission,
} = require('../controllers/permissions.controller');

router.use(validateJWT);

const moduleName = 'Permission';

router.get('/', hasPermission(`${moduleName}List`), listPermissions);

router.get('/:id', hasPermission(`${moduleName}Get`), getPermission);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newPermission
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyPermission
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deletePermission);

module.exports = router;
