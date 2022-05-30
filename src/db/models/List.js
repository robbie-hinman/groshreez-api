/**
 *
 * */
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define(
    'list',
    {
      // attributes
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // options
    },
  );

  List.associate = models => {
    //
    List.belongsToMany(models.User, {
      through: 'member',
      foreignKey: 'listId',
    });

    List.belongsTo(models.User, { foreignKey: 'owner' });

    List.belongsToMany(models.Item, {
      through: 'ListItem',
      foreignKey: 'listId',
    });
  };

  return List;
};
