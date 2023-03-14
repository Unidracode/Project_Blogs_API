module.exports = async (req, _res, next) => {
  const { title, content } = req.body;

  if (!title || !content) {
      throw new Error('Some required fields are missing');
  }
  next();
};
