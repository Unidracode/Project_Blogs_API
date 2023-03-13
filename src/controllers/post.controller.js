const { postService } = require('../services');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id } = req.user;
    const post = await postService.createPost({ id, title, content, categoryIds });
    res.status(201).json(post);
  };

const getPosts = async (_req, res) => {
    const posts = await postService.getPosts();
    res.status(200).json(posts);
};

const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await postService.getPostById(id);
    res.status(200).json(post);
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
};
