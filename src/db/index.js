const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
const User = require('./models/User')(sequelize);
const List = require('./models/List')(sequelize);
const ListMember = require('./models/ListMember')(sequelize);

const initialize = () => {
  sequelize.sync({ force: true }).then(() => {
    List.create({
      listName: 'First List',
      storeName: 'first list store',
      fullfilledDate: Date.now(),
      totalCost: 234.56,
      member: [
        {
          firstName: 'Tartarus',
          lastName: 'DePoopins',
          role: 'owner',
        },
      ],
    });
  });
};
initialize();

User.belongsToMany(List, { through: ListMember });
List.belongsToMany(User, {
  as: 'member',
  through: ListMember,
});
module.exports = { User, List };
