// Routes /api/invoices
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const { isDate } = require('../helpers/isDate');
const {
  listInvoices,
  getInvoice,
  newInvoice,
  modifyInvoice,
  deleteInvoice,
} = require('../controllers/invoices.controller');

router.use(validateJWT);

const moduleName = 'Invoice';

router.get('/', hasPermission(`${moduleName}List`), listInvoices);

router.get('/:id', hasPermission(`${moduleName}Get`), getInvoice);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('number', 'Number is required').not().isEmpty(),
    check('date', 'Date is required').custom(isDate),
    check('unitPrice', 'UnitPrice is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    validateParams,
  ],
  newInvoice
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('number', 'Number is required').not().isEmpty(),
    check('date', 'Date is required').custom(isDate),
    check('unitPrice', 'UnitPrice is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    validateParams,
  ],
  modifyInvoice
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteInvoice);

module.exports = router;
