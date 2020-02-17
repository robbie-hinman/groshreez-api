const Sequelize = require('sequelize');

module.exports = sequelize => {
  const ListItem = sequelize.define(
    'listItem',
    {
      // attributes
      price: {
        type: Sequelize.DECIMAL(10, 2),
      },
      count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // allowNull defaults to true
      },
      inCart: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      notes: {
        type: Sequelize.STRING,
      },
    },
    {
      // options
    },
  );

  return ListItem;
};
