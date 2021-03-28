// Routes /api/passengers
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listPassengers,
  getPassenger,
  newPassenger,
  modifyPassenger,
  deletePassenger,
} = require('../controllers/passengers.controller');

router.use(validateJWT);

const moduleName = 'Passenger';

router.get('/', hasPermission(`${moduleName}_List`), listPassengers);

router.get('/:id', hasPermission(`${moduleName}_Get`), getPassenger);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('documentTypeId', 'DocumentTypeId is required').not().isEmpty(),
    check('documentNumber', 'DocumentNumber is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    validateParams,
  ],
  newPassenger
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('documentTypeId', 'DocumentTypeId is required').not().isEmpty(),
    check('documentNumber', 'DocumentNumber is required').not().isEmpty(),
    check('name', 'Name is required').not().isEmpty(),
    check('lastName', 'LastName is required').not().isEmpty(),
    validateParams,
  ],
  modifyPassenger
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deletePassenger);

module.exports = router;
