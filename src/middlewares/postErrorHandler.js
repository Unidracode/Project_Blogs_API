const createPost = async (err, _req, res, next) => {
  switch (err.message) {
    case 'Some required fields are missing':
      res.status(400)
      .send({ message: 'Some required fields are missing' });
      break;
    case 'one or more "categoryIds" not found':
      res.status(400)
      .send({ message: 'one or more "categoryIds" not found' });
      break;

    default:
      next(err);
  }
};

  module.exports = {
    createPost,
};