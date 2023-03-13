const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');

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
  categories: post.categories,
}));

const getPostById = async (postId) => {
  const post = await BlogPost.findByPk(postId, {
      include: [
          { model: User, as: 'user' },
          { model: Category, as: 'categories', through: { attributes: [] } },
      ],
  });
  if (!post) throw new Error('Post does not exist');
  const [postFiltered] = filterPosts([post]);
  return postFiltered;
};

module.exports = {
  getPostById,
};