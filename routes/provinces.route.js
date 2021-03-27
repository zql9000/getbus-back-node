// Routes /api/provinces
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listProvinces,
  getProvince,
  newProvince,
  modifyProvince,
  deleteProvince,
} = require('../controllers/provinces.controller');

router.use(validateJWT);

const moduleName = 'Province';

router.get('/', hasPermission(`${moduleName}List`), listProvinces);

router.get('/:id', hasPermission(`${moduleName}Get`), getProvince);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newProvince
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyProvince
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteProvince);

module.exports = router;
