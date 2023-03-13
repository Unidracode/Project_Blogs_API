module.exports = async (req, _res, next) => {
  const { name } = req.body;

  if (!name) {
      throw new Error('"name" is required');
  }
  next();
};
