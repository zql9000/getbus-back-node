// Routes /api/vehicles
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listVehicles,
  getVehicle,
  newVehicle,
  modifyVehicle,
  deleteVehicle,
} = require('../controllers/vehicles.controller');

router.use(validateJWT);

const moduleName = 'Vehicle';

router.get('/', hasPermission(`${moduleName}_List`), listVehicles);

router.get('/:id', hasPermission(`${moduleName}_Get`), getVehicle);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('internNumber', 'InternNumber is required').not().isEmpty(),
    check('transportCompanyId', 'TransportCompanyId is required')
      .not()
      .isEmpty(),
    check('vechicleTypeId', 'VechicleTypeId is required').not().isEmpty(),
    validateParams,
  ],
  newVehicle
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('internNumber', 'InternNumber is required').not().isEmpty(),
    check('transportCompanyId', 'TransportCompanyId is required')
      .not()
      .isEmpty(),
    check('vechicleTypeId', 'VechicleTypeId is required').not().isEmpty(),
    validateParams,
  ],
  modifyVehicle
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteVehicle);

module.exports = router;
