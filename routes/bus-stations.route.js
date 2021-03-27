// Routes /api/bus-stations
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listBusStations,
  getBusStation,
  newBusStation,
  modifyBusStation,
  deleteBusStation,
} = require('../controllers/bus-stations.controller');

router.use(validateJWT);

const moduleName = 'BusStation';

router.get('/', hasPermission(`${moduleName}List`), listBusStations);

router.get('/:id', hasPermission(`${moduleName}Get`), getBusStation);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    check('cityId', 'CityId is required').not().isEmpty(),
    validateParams,
  ],
  newBusStation
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    check('cityId', 'CityId is required').not().isEmpty(),
    validateParams,
  ],
  modifyBusStation
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteBusStation);

module.exports = router;
