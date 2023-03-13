const express = require('express');
const { userController } = require('../controllers');
const errorHandler = require('../middlewares/userErrorHandler');
const validateJWT = require('../middlewares/validateJWT');

require('express-async-errors');

const router = express.Router();

router.post(
  '/',
  userController.createUser,
);

router.get(
  '/',
  validateJWT,
  userController.getUsers,
);

router.get(
  '/:id',
  validateJWT,
  userController.getUserById,
);

router.delete(
  '/me',
  validateJWT,
  userController.deleteUser,
);

router.use(errorHandler.createUser);
router.use(errorHandler.findUserById);

module.exports = router;
