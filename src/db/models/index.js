const Sequelize = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const models = {
  User: sequelize.import('./User'),
  List: sequelize.import('./List'),
  ListItem: sequelize.import('./ListItem'),
  ListItemNote: sequelize.import('./ListItemNote'),
  Item: sequelize.import('./Item'),
  // later...
  // ItemType: sequelize.import('./ItemType'),
};

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;
module.exports = models;
