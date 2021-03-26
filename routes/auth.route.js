// Routes  /api/auth
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateParams } = require('../middlewares/validate-params');
const { login, renewToken } = require('../controllers/auth.controller');

router.post(
  '/',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({
      min: 8,
    }),
    validateParams,
  ],
  login
);

router.get('/renew', [validateJWT], renewToken);

module.exports = router;
