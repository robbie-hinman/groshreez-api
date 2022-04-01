const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Item = sequelize.define(
    'item',
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      brand: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
      size: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
    },
    {
      // options
    },
  );

  return Item;
};
