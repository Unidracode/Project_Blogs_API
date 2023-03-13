const { userService } = require('../services');

const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    const token = await userService.createUser({ displayName, email, password, image });
    res.status(201).json({ token });
  };

const getUsers = async (req, res) => {
    const users = await userService.getUsers();
    if (!users) throw new Error('Internal Server Error');
    res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userService.getByUserId(id);
    res.status(200).json(user);
};

const deleteUser = async (req, res) => {
    const { id } = req.user;
    await userService.deleteUserById(id);
    res.status(204).end();
};

module.exports = {
    createUser,
    getUsers,
    getUserById,
    deleteUser,
};
