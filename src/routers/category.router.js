const express = require('express');
const { categoryController } = require('../controllers');
const validateCategoriesFields = require('../middlewares/validateCategoriesFields');
const errorHandler = require('../middlewares/categoryErrorHandler');
const validateJWT = require('../middlewares/validateJWT');

require('express-async-errors');

const router = express.Router();

router.post(
  '/',
  validateJWT,
  validateCategoriesFields,
  categoryController.createCategory,
);

router.get(
  '/',
  validateJWT,
  categoryController.getCategories,
);

router.use(errorHandler);

module.exports = router;
