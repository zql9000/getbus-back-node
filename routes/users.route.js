// Routes /api/users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listUsers,
  getUser,
  newUser,
  modifyUser,
  deleteUser,
} = require('../controllers/users.controller');

router.use(validateJWT);

const moduleName = 'User';

router.get('/', hasPermission(`${moduleName}List`), listUsers);

router.get('/:id', hasPermission(`${moduleName}Get`), getUser);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check('documentTypeId', 'DocumentTypeId is required').not().isEmpty(),
    check('documentNumber', 'DocumentNumber is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('roleId', 'RoleId is required').not().isEmpty(),
    validateParams,
  ],
  newUser
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    check('documentTypeId', 'DocumentTypeId is required').not().isEmpty(),
    check('documentNumber', 'DocumentNumber is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('roleId', 'RoleId is required').not().isEmpty(),
    validateParams,
  ],
  modifyUser
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteUser);

module.exports = router;
