module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      // attributes
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      size: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
      style: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
    },
  );

  Item.associate = models => {
    //
    Item.belongsToMany(models.User, {
      through: 'member',
      foreignKey: 'listId',
    });

    Item.belongsTo(models.User, { foreignKey: 'owner' });

    Item.belongsToMany(models.List, {
      through: 'ListItem',
      foreignKey: 'itemId',
    });
  };

  return Item;
};
