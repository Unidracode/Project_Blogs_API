const { getPostById } = require('../services/post.service');

module.exports = async (req, _res, next) => {
    const userId = req.user.id;
    const { id } = req.params;
    const toUpdatedPost = await getPostById(id);
    if (userId !== toUpdatedPost.user.id) {
        throw new Error('Unauthorized user');
    }
    next();
};
