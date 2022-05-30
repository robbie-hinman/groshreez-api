module.exports = (sequelize, DataTypes) => {
  const ListItem = sequelize.define(
    'listItem',
    {
      // attributes
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // allowNull defaults to true
      },
      inCart: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      // options
    },
  );

  return ListItem;
};
