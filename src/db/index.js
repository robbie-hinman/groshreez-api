const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
const User = require('./models/User')(sequelize);
const List = require('./models/List')(sequelize);
const ListMember = require('./models/ListMember')(sequelize);
const Item = require('./models/Item')(sequelize);
const ItemType = require('./models/ItemType')(sequelize);
const ListItem = require('./models/ListItem')(sequelize);
const Store = require('./models/Store')(sequelize);

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
        user.addList(list, { through: { role: 'creator' } });
      });
    });
  });
};
User.belongsToMany(List, { through: ListMember });
List.belongsToMany(User, { through: ListMember });

Item.belongsToMany(List, { through: ListItem });
List.belongsToMany(Item, { through: ListItem });

Item.belongsTo(ItemType);
List.belongsTo(Store);

initialize();

module.exports = { User, List };
