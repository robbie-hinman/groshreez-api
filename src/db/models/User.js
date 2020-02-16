const Sequelize = require('sequelize');

module.exports = sequelize => {
  const User = sequelize.define(
    'user',
    {
      // attributes
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        // allowNull defaults to true
      },
    },
    {
      // options
    },
  );
  return User;
};
