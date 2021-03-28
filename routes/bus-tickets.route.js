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

router.get('/', hasPermission(`${moduleName}_List`), listBusTickets);

router.get('/:id', hasPermission(`${moduleName}_Get`), getBusTicket);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('passengerId', 'PassengerId is required').not().isEmpty(),
    check('invoiceId', 'InvoiceId is required').not().isEmpty(),
    validateParams,
  ],
  newBusTicket
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('passengerId', 'PassengerId is required').not().isEmpty(),
    check('invoiceId', 'InvoiceId is required').not().isEmpty(),
    validateParams,
  ],
  modifyBusTicket
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteBusTicket);

module.exports = router;
