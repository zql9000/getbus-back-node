// Routes /api/roles
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listRoles,
  getRole,
  newRole,
  modifyRole,
  deleteRole,
} = require('../controllers/roles.controller');

router.use(validateJWT);

const moduleName = 'Role';

router.get('/', hasPermission(`${moduleName}_List`), listRoles);

router.get('/:id', hasPermission(`${moduleName}_Get`), getRole);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newRole
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyRole
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteRole);

module.exports = router;
