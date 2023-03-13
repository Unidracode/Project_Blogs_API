module.exports = async (err, _req, res, _next) => {
  switch (err.message) {
      case 'Some required fields are missing':
        res.status(400).send({ message: 'Some required fields are missing' });
        break;
      case 'Invalid fields':
        res.status(400).send({ message: 'Invalid fields' });
        break;
      default:
        res.status(500).send('Internal Server Error');
    }
};
