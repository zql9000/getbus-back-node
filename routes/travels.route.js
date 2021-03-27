// Routes /api/travels
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const { isDate } = require('../helpers/isDate');
const {
  listTravels,
  getTravel,
  newTravel,
  modifyTravel,
  deleteTravel,
} = require('../controllers/travels.controller');

router.use(validateJWT);

const moduleName = 'Travel';

router.get('/', hasPermission(`${moduleName}List`), listTravels);

router.get('/:id', hasPermission(`${moduleName}Get`), getTravel);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('date', 'Date is required').custom(isDate),
    check('vehicleId', 'VehicleId is required').not().isEmpty(),
    check('sectionIdOrigin', 'SectionIdOrigin is required').not().isEmpty(),
    check('busStationIdDestination', 'BusStationIdDestination is required')
      .not()
      .isEmpty(),
    check('capacity', 'Capacity is required').not().isEmpty(),
    check('numberedSeats', 'NumberedSeats is required').not().isEmpty(),
    validateParams,
  ],
  newTravel
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('date', 'Date is required').custom(isDate),
    check('vehicleId', 'VehicleId is required').not().isEmpty(),
    check('sectionIdOrigin', 'SectionIdOrigin is required').not().isEmpty(),
    check('busStationIdDestination', 'BusStationIdDestination is required')
      .not()
      .isEmpty(),
    check('capacity', 'Capacity is required').not().isEmpty(),
    check('numberedSeats', 'NumberedSeats is required').not().isEmpty(),
    validateParams,
  ],
  modifyTravel
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteTravel);

module.exports = router;
