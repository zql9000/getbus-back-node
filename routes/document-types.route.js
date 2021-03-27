// Routes /api/document-types
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { hasPermission } = require('../middlewares/hasPermission');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const {
  listDocumentTypes,
  getDocumentType,
  newDocumentType,
  modifyDocumentType,
  deleteDocumentType,
} = require('../controllers/document-types.controller');

router.use(validateJWT);

const moduleName = 'DocumentType';

router.get('/', hasPermission(`${moduleName}List`), listDocumentTypes);

router.get('/:id', hasPermission(`${moduleName}Get`), getDocumentType);

router.post(
  '/',
  [
    hasPermission(`${moduleName}New`),
    check('name', 'Name is required').not().isEmpty(),
    check('shortName', 'ShortName is required').not().isEmpty(),
    validateParams,
  ],
  newDocumentType
);

router.put(
  '/:id',
  [
    hasPermission(`${moduleName}Modify`),
    check('name', 'Name is required').not().isEmpty(),
    check('shortName', 'ShortName is required').not().isEmpty(),
    validateParams,
  ],
  modifyDocumentType
);

router.delete('/:id', hasPermission(`${moduleName}Delete`), deleteDocumentType);

module.exports = router;
