module.exports = async (req, _res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
      throw new Error('Some required fields are missing');
  }
  next();
};
