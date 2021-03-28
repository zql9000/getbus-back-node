// Routes /api/cities
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listCities,
  getCity,
  newCity,
  modifyCity,
  deleteCity,
} = require('../controllers/cities.controller');

router.use(validateJWT);

const moduleName = 'City';

router.get('/', hasPermission(`${moduleName}_List`), listCities);

router.get('/:id', hasPermission(`${moduleName}_Get`), getCity);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('name', 'Name is required').not().isEmpty(),
    check('provinceId', 'ProvinceId is required').not().isEmpty(),
    validateParams,
  ],
  newCity
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('name', 'Name is required').not().isEmpty(),
    check('provinceId', 'ProvinceId is required').not().isEmpty(),
    validateParams,
  ],
  modifyCity
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteCity);

module.exports = router;
