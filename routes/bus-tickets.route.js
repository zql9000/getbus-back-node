// Routes /api/bus-tickets
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listBusTickets,
  getBusTicket,
  newBusTicket,
  modifyBusTicket,
  deleteBusTicket,
} = require('../controllers/bus-tickets.controller');

router.use(validateJWT);

const moduleName = 'BusTicket';

router.get('/', hasPermission(`${moduleName}List`), listBusTickets);

router.get('/:id', hasPermission(`${moduleName}Get`), getBusTicket);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('passengerId', 'PassengerId is required').not().isEmpty(),
    check('invoiceId', 'InvoiceId is required').not().isEmpty(),
    validateParams,
  ],
  newBusTicket
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('passengerId', 'PassengerId is required').not().isEmpty(),
    check('invoiceId', 'InvoiceId is required').not().isEmpty(),
    validateParams,
  ],
  modifyBusTicket
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteBusTicket);

module.exports = router;
