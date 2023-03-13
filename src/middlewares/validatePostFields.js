module.exports = async (req, _res, next) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
      throw new Error('Some required fields are missing');
  }
  next();
};
