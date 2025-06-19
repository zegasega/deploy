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
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'posts',
    timestamps: false, // timestamps: true dersen createdAt & updatedAt otomatik eklenir
    underscored: true,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
      onDelete: 'CASCADE',
    });

    Post.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
      onDelete: 'SET NULL', // İstersen cascade de yapabilirsin
    });

    Post.hasMany(models.Comment, {
      foreignKey: 'post_id',
      as: 'comments',
      onDelete: 'CASCADE',
      hooks: true,
    });

    Post.belongsToMany(models.Tag, {
      through: models.PostTag,
      foreignKey: 'post_id',
      otherKey: 'tag_id',
      as: 'tags',
    });
  };

  return Post;
};
