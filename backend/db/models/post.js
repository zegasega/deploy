module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'posts',
    timestamps: false,
    underscored: true,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });
    Post.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });

    // Burada comment ilişkisini ekliyoruz:
    Post.hasMany(models.Comment, {
      foreignKey: 'post_id',
      as: 'comments',
      onDelete: 'CASCADE',  // Silme işlemi cascade olacak
      hooks: true,          // Cascade için hooklar aktif
    });
  };

  return Post;
};
