const { User } = require('../models');
const { BlogPost } = require('../models');
const { Category } = require('../models');
const { PostCategory } = require('../models');

const createPost = async ({ id, title, content, categoryIds }) => {
  const categories = await Category.findAll({
      where: {
        id: categoryIds,
      },
    });
  if (categories.length !== categoryIds.length) {
      throw new Error('one or more "categoryIds" not found');
  }

  const post = await BlogPost.create({ title, content, userId: id });

  const postsCategories = categoryIds.map((categoryId) => ({ postId: post.id, categoryId }));
  await PostCategory.bulkCreate(postsCategories);

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
  createPost,
  getPostById,
};