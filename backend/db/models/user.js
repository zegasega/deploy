module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('user', 'admin', 'superadmin'),
      allowNull: false,
      defaultValue: 'user',
    },
    jwtTokenVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'user_id',
      as: 'posts',
      onDelete: 'CASCADE',
      hooks: true,
    });

    User.hasMany(models.Comment, {
      foreignKey: 'user_id',
      as: 'comments',
      onDelete: 'CASCADE',
      hooks: true,
    });
  };

  return User;
};
