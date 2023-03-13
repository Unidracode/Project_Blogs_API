require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

module.exports = async (email, password) => {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
        throw new Error('Invalid fields');
    }

    const token = jwt.sign({ data: { email } }, secret, jwtConfig);

    return token;
};
