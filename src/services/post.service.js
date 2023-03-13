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

module.exports = {
  createPost,
};
