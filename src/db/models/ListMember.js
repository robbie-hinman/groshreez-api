const Sequelize = require('sequelize');

module.exports = sequelize => {
  const ListMember = sequelize.define(
    'listMember',
    {
      // attributes
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      // options
    },
  );

  return ListMember;
};
