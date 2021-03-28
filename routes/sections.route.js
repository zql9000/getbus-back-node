// Routes /api/sections
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listSections,
  getSection,
  newSection,
  modifySection,
  deleteSection,
} = require('../controllers/sections.controller');

router.use(validateJWT);

const moduleName = 'Section';

router.get('/', hasPermission(`${moduleName}_List`), listSections);

router.get('/:id', hasPermission(`${moduleName}_Get`), getSection);

router.post(
  '/',
  [
    hasPermission(`${moduleName}_New`),
    check('busStationId', 'BusStationId is required').not().isEmpty(),
    check('busStationIdNext', 'BusStationIdNext is required').not().isEmpty(),
    validateParams,
  ],
  newSection
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}_Modify`),
    check('busStationId', 'BusStationId is required').not().isEmpty(),
    check('busStationIdNext', 'BusStationIdNext is required').not().isEmpty(),
    validateParams,
  ],
  modifySection
);

router.delete('/:id', hasPermission(`${moduleName}_Delete`), deleteSection);

module.exports = router;
