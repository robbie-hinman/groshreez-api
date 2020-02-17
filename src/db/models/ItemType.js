const Sequelize = require('sequelize');

module.exports = sequelize => {
  const ItemType = sequelize.define(
    'itemType',
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      // options
    },
  );

  return ItemType;
};
