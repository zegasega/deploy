module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'categories',
    timestamps: false,
    underscored: true,
  });

  Category.associate = (models) => {
    Category.hasMany(models.Post, { foreignKey: 'category_id', as: 'posts' });
  };

  return Category;
};
