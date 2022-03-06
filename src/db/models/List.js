const Sequelize = require('sequelize');
/**
 *
 * Lists should have
 * a creator user id
 * a store (name, later use id)
 * a fullfilled date
 * a total price
 * a list name (if empty, FE will use set date)
 *
 * */
module.exports = (sequelize) => {
  const List = sequelize.define(
    'list',
    {
      // attributes
      listName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      storeName: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
      fullfilledDate: {
        type: Sequelize.DATE,
        // allowNull defaults to true
      },
      totalCost: {
        type: Sequelize.DECIMAL(10, 2),
        // allowNull defaults to true
      },
      creatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      // options
    },
  );

  return List;
};
