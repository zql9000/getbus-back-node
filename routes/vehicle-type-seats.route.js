// Routes /api/vehicle-type-seats
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listVehicleTypeSeats,
  getVehicleTypeSeat,
  newVehicleTypeSeat,
  modifyVehicleTypeSeat,
  deleteVehicleTypeSeat,
} = require('../controllers/vehicle-type-seats.controller');

router.use(validateJWT);

const moduleName = 'VehicleTypeSeat';

router.get('/', hasPermission(`${moduleName}_List`), listVehicleTypeSeats);

router.get('/:id', hasPermission(`${moduleName}_Get`), getVehicleTypeSeat);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('vehicleTypeId', 'VehicleTypeId is required').not().isEmpty(),
    check('seatId', 'SeatId is required').not().isEmpty(),
    check('floor', 'Floor is required').not().isEmpty(),
    check('locationX', 'LocationX is required').not().isEmpty(),
    check('locationY', 'LocationY is required').not().isEmpty(),
    validateParams,
  ],
  newVehicleTypeSeat
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('vehicleTypeId', 'VehicleTypeId is required').not().isEmpty(),
    check('seatId', 'SeatId is required').not().isEmpty(),
    check('floor', 'Floor is required').not().isEmpty(),
    check('locationX', 'LocationX is required').not().isEmpty(),
    check('locationY', 'LocationY is required').not().isEmpty(),
    validateParams,
  ],
  modifyVehicleTypeSeat
);

router.delete(
  '/:id',
  hasPermission(`${moduleName}_Delete`),
  deleteVehicleTypeSeat
);

module.exports = router;
