module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    });

  return Category;
};