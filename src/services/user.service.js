require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const schema = require('./validations/validationsInputValues');

const secret = process.env.JWT_SECRET;

const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

const createUser = async ({ displayName, email, password, image }) => {
    schema.validateNewUser({ displayName, email, password });

    const user = await User.findOne({ where: { email } });
    if (user) {
        throw new Error('User already registered');
    }
    await User.create({ displayName, email, password, image });

    const token = jwt.sign({ data: { email } }, secret, jwtConfig);

    return token;
};

const getUsers = async () => {
    const users = await User.findAll();
    const filteredUsers = users
    .map(({ id, displayName, email, image }) => ({ id, displayName, email, image }));
    return filteredUsers;
};

const getByUserId = async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new Error('User does not exist');
    const { id, displayName, email, image } = user;
    const filteredUsers = { id, displayName, email, image };
    return filteredUsers;
};

const deleteUserById = async (id) => {
    await User.destroy(
        { where: { id } },
      );
};

module.exports = {
  createUser,
  getUsers,
  getByUserId,
  deleteUserById,
};
