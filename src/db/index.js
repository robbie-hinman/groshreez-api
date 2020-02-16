const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
const User = require('./models/User')(sequelize);
const List = require('./models/List')(sequelize);
// const ListMember = require('./models/ListMember')(sequelize);

const initialize = () => {
  sequelize.sync({ force: true }).then(() => {
    User.create({
      firstName: 'Bob',
      lastName: 'Booper',
    }).then(user => {
      List.create({
        listName: 'First List',
        storeName: 'first list store',
        fullfilledDate: Date.now(),
        totalCost: 234.56,
      }).then(list => {
        user.addList(list);
      });
    });
  });
};
User.hasMany(List);
initialize();

module.exports = { User, List };
