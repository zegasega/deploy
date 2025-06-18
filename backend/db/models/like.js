module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'likes',
    timestamps: false,
    underscored: true,
  });

  Like.associate = (models) => {
    Like.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Like.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  };

  return Like;
};
