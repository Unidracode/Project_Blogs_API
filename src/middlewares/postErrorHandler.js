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

const findPostById = async (err, _req, res, _next) => {
  switch (err.message) {
      case 'Post does not exist':
        res.status(404)
        .send({ message: 'Post does not exist' });
        break;
      case 'Unauthorized user':
        res.status(401)
        .send({ message: 'Unauthorized user' });
        break;
      default:
        res.status(500).send({ message: err.message });
    }
  };

module.exports = {
  createPost,
  findPostById,
};
