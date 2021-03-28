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

router.get('/', hasPermission(`${moduleName}_List`), listProvinces);

router.get('/:id', hasPermission(`${moduleName}_Get`), getProvince);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newProvince
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyProvince
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteProvince);

module.exports = router;
