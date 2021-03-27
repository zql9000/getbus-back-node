// Routes /api/seat-types
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listSeatTypes,
  getSeatType,
  newSeatType,
  modifySeatType,
  deleteSeatType,
} = require('../controllers/seat-types.controller');

router.use(validateJWT);

const moduleName = 'SeatType';

router.get('/', hasPermission(`${moduleName}List`), listSeatTypes);

router.get('/:id', hasPermission(`${moduleName}Get`), getSeatType);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newSeatType
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifySeatType
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteSeatType);

module.exports = router;
