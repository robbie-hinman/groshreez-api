const Sequelize = require('sequelize');

module.exports = sequelize => {
  const Store = sequelize.define(
    'store',
    {
      // attributes
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zip: {
        type: Sequelize.INTEGER,
        // allowNull defaults to true
      },
    },
    {
      // options
    },
  );

  return Store;
};
