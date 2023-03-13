module.exports = async (err, _req, res, _next) => {
  switch (err.message) {
      case '"name" is required':
        res.status(400).send({ message: '"name" is required' });
        break;
      default:
        res.status(500).send('Internal Server Error');
    }
};
