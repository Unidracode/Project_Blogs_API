const express = require('express');
const { postController } = require('../controllers');
const validatePostFields = require('../middlewares/validatePostFields');
const errorHandler = require('../middlewares/postErrorHandler');
const validateJWT = require('../middlewares/validateJWT');
const validateUserPost = require('../middlewares/validateUserPost');

require('express-async-errors');

const router = express.Router();

router.get(
  '/search',
  validateJWT,
  postController.getSearchedPosts,
);

router.post(
  '/',
  validateJWT,
  validatePostFields,
  postController.createPost,
);

router.get(
  '/',
  validateJWT,
  postController.getPosts,
);

router.get(
  '/:id',
  validateJWT,
  postController.getPostById,
);

router.put(
  '/:id',
  validateJWT,
  validateUserPost,
  postController.updatePostById,
);

router.delete(
  '/:id',
  validateJWT,
  validateUserPost,
  postController.deletePostById,
);

router.use(errorHandler.createPost);
router.use(errorHandler.findPostById);

module.exports = router;