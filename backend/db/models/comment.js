module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'posts', key: 'id' },
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: { model: 'comments', key: 'id' },
    },
  }, {
    tableName: 'comments',
    timestamps: false,
    underscored: true,
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    Comment.belongsTo(models.User, { foreignKey: 'user_id', as: 'author' });

    // Nested comments (self-association)
    Comment.hasMany(models.Comment, {
      foreignKey: 'parent_comment_id',
      as: 'replies'
    });
    Comment.belongsTo(models.Comment, {
      foreignKey: 'parent_comment_id',
      as: 'parentComment'
    });
  };

  return Comment;
};
