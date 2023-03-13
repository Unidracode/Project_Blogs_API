const express = require('express');
const { loginController } = require('../controllers');
const validateLoginFields = require('../middlewares/validateLoginFields');
const errorHandler = require('../middlewares/loginErrorHandler');

require('express-async-errors');

const router = express.Router();

router.post(
  '/',
  validateLoginFields,
  loginController,
);

router.use(errorHandler);

module.exports = router;