// Routes /api/transport-companies
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listTransportCompanies,
  getTransportCompany,
  newTransportCompany,
  modifyTransportCompany,
  deleteTransportCompany,
} = require('../controllers/transport-companies.controller');

router.use(validateJWT);

const moduleName = 'TransportCompany';

router.get('/', hasPermission(`${moduleName}List`), listTransportCompanies);

router.get('/:id', hasPermission(`${moduleName}Get`), getTransportCompany);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newTransportCompany
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyTransportCompany
);

router.delete(
  '/:id',
  hasPermission(`${moduleName}Delete`),
  deleteTransportCompany
);

module.exports = router;
