// Routes /api/seats
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listSeats,
  getSeat,
  newSeat,
  modifySeat,
  deleteSeat,
} = require('../controllers/seats.controller');

router.use(validateJWT);

const moduleName = 'Seat';

router.get('/', hasPermission(`${moduleName}_List`), listSeats);

router.get('/:id', hasPermission(`${moduleName}_Get`), getSeat);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('number', 'Number is required').not().isEmpty(),
    check('seatTypeId', 'SeatTypeId is required').not().isEmpty(),
    validateParams,
  ],
  newSeat
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('number', 'Number is required').not().isEmpty(),
    check('seatTypeId', 'SeatTypeId is required').not().isEmpty(),
    validateParams,
  ],
  modifySeat
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteSeat);

module.exports = router;
