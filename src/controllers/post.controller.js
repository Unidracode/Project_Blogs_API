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

const updatePostById = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await postService.updatePostById({ id, title, content });
    res.status(200).json(updatedPost);
};

const deletePostById = async (req, res) => {
    const { id } = req.params;
    await postService.deletePostById(id);
    res.status(204).end();
};

const getSearchedPosts = async (req, res) => {
    const { q } = req.query;
    const searchedPosts = await postService.getSearchedPosts(q);
    res.status(200).json(searchedPosts);
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById,
    getSearchedPosts,
};
