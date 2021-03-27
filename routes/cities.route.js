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

router.get('/', hasPermission(`${moduleName}List`), listCities);

router.get('/:id', hasPermission(`${moduleName}Get`), getCity);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  newCity
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    validateParams,
  ],
  modifyCity
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteCity);

module.exports = router;
