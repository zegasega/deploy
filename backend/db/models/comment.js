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
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    parent_comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'comments',
    timestamps: false,
    underscored: true,
  });

  Comment.associate = (models) => {
    // Her yorum bir posta aittir
    Comment.belongsTo(models.Post, {
      foreignKey: 'post_id',
      as: 'post',
      onDelete: 'CASCADE',
      hooks: true,
    });

    // Her yorum bir kullanıcıya aittir
    Comment.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'author',
      onDelete: 'CASCADE',
      hooks: true,
    });

    // Nested comment (bir yorumun alt yorumu olabilir)
    Comment.belongsTo(models.Comment, {
      foreignKey: 'parent_comment_id',
      as: 'parent',
      onDelete: 'CASCADE',
      hooks: true,
    });

    // Yorumun alt yorumları (replies)
    Comment.hasMany(models.Comment, {
      foreignKey: 'parent_comment_id',
      as: 'replies',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return Comment;
};
