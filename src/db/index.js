const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});
const User = require('./models/User')(sequelize);
const List = require('./models/List')(sequelize);
const ListMember = require('./models/ListMember')(sequelize);
const Item = require('./models/Item')(sequelize);
const ItemType = require('./models/ItemType')(sequelize);
const ListItem = require('./models/ListItem')(sequelize);
const Store = require('./models/Store')(sequelize);

// const initialize = () => {
//   sequelize.sync({ force: true }).then(() => {
//     User.create({
//       firstName: 'Bob',
//       lastName: 'Booper',
//     }).then((user) => {
//       List.create(
//         {
//           listName: 'First List',
//           storeName: 'first list store',
//           fullfilledDate: Date.now(),
//           totalCost: 234.56,
//           store: { name: 'Vons' },
//         },
//         {
//           include: [Store],
//         },
//       ).then((list) => {
//         user.addList(list, { through: { role: 'creator' } });

//         Item.create(
//           {
//             name: 'paper tissues',
//             brand: 'kleenex',
//             itemType: { name: 'paper products' },
//           },
//           { include: [ItemType] },
//         ).then((item) => {
//           list.addItem(item, {
//             through: {
//               count: 1,
//               inCart: false,
//               notes: 'dont forget this one',
//             },
//           });
//         });
//         // Store.create({ name: 'Vons' }).then(store =>
//         //   list.addStore(store),
//         // );
//       });
//     });
//   });
// };

const migrate = async () => {
  await sequelize.sync({ alter: true, force: true });
};

User.belongsToMany(List, { through: ListMember });
List.belongsToMany(User, { through: ListMember });
User.hasMany(List);
List.belongsTo(User, {
  foreignKey: 'creatorId',
});

Item.belongsToMany(List, { through: ListItem });
List.belongsToMany(Item, { through: ListItem });

Item.belongsTo(ItemType);
List.belongsTo(Store);

// migrate();

// initialize();

module.exports = { User, List };
