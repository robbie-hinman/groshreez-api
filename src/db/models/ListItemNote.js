module.exports = (sequelize, DataTypes) => {
  const ListItemNote = sequelize.define(
    'listItemNote',
    {
      // attributes
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // options
    },
  );

  ListItemNote.associate = models => {
    //
    ListItemNote.belongsTo(models.User, { foreignKey: 'userId' });
    ListItemNote.belongsTo(models.ListItem, {
      foreignKey: 'listItemId',
    });
  };

  return ListItemNote;
};
