// Routes /api/users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { optionalPassword } = require('../helpers/optionalPassword');
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

router.get('/', hasPermission(`${moduleName}_List`), listUsers);

router.get('/:id', hasPermission(`${moduleName}_Get`), getUser);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
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
    hasPermission(`${moduleName}_Modify`),
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 8 characters').custom(
      optionalPassword
    ),
    check('documentTypeId', 'DocumentTypeId is required').not().isEmpty(),
    check('documentNumber', 'DocumentNumber is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    check('roleId', 'RoleId is required').not().isEmpty(),
    validateParams,
  ],
  modifyUser
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteUser);

module.exports = router;
