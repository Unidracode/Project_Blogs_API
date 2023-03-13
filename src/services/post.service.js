const { Op } = require('sequelize');
const { BlogPost } = require('../models');
const { User } = require('../models');

const createPost = async ({ id, title, content }) => {
  const post = await BlogPost.create({ title, content, userId: id });

  return { id: post.id, 
      title: post.title,
      content: post.content,
      userId: post.userId,
      updated: post.updated.val,
      published: post.published.val };
};

const filterPosts = (posts) => posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        userId: post.userId,
        published: post.published,
        updated: post.updated,
        user: {
          id: post.user.id,
          displayName: post.user.displayName,
          email: post.user.email,
          image: post.user.image,
        },
      }));

const getPosts = async () => {
    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user' },
        ],
    });
    const postsFiltered = filterPosts(posts);
    return postsFiltered;
};

const getPostById = async (postId) => {
    const post = await BlogPost.findByPk(postId, {
        include: [
            { model: User, as: 'user' },
        ],
    });
    if (!post) throw new Error('Post does not exist');
    const [postFiltered] = filterPosts([post]);
    return postFiltered;
};

const updatePostById = async ({ id, title, content }) => {
    await BlogPost.update(
        { title, content },
        { where: { id } },
      );
    const updatedPost = await getPostById(id);
    return updatedPost;
};

const deletePostById = async (id) => {
    await BlogPost.destroy(
        { where: { id } },
      );
};

const getSearchedPostsByTitle = async (q) => {
    const postsByTitle = await BlogPost.findAll({
        include: [
            { model: User, as: 'user' },
          ],
          where: {
            title: {
              [Op.like]: `%${q}%`,
            },
          },
    });
    const postsByTitleFiltered = filterPosts(postsByTitle);
    return postsByTitleFiltered;
};

const getSearchedPostsByContent = async (q) => {
    const postsByContent = await BlogPost.findAll({
        include: [
            { model: User, as: 'user' },
          ],
          where: {
            content: {
              [Op.like]: `%${q}%`,
            },
          },
    });
    const postsByContentFiltered = filterPosts(postsByContent);
    return postsByContentFiltered;
};

const getSearchedPosts = async (q) => {
    if (!q) return getPosts();
    const postsByTitle = await getSearchedPostsByTitle(q);
    if (postsByTitle.length > 0) return postsByTitle;
    const postsByContent = await getSearchedPostsByContent(q);
    if (postsByContent) return postsByContent;
    return [];
};

module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePostById,
    deletePostById,
    getSearchedPosts,
};
