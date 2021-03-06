// Routes /api/vehicle-types
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listVehicleTypes,
  getVehicleType,
  newVehicleType,
  modifyVehicleType,
  deleteVehicleType,
} = require('../controllers/vehicle-types.controller');

router.use(validateJWT);

const moduleName = 'VehicleType';

router.get('/', hasPermission(`${moduleName}_List`), listVehicleTypes);

router.get('/:id', hasPermission(`${moduleName}_Get`), getVehicleType);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newVehicleType
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyVehicleType
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteVehicleType);

module.exports = router;
