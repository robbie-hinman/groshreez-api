module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      // attributes
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipcode: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
    },
  );

  User.associate = models => {
    //
    User.belongsToMany(models.List, {
      through: 'member',
      foreignKey: 'userId',
    });
  };

  return User;
};
