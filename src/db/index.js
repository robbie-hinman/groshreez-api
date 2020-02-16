const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_CONNECTION_STRING);
const User = require('./models/User')(sequelize);

const initialize = () => {
  sequelize.sync({ force: true }).then(() => {
    // Now the `users` table in the database corresponds to the model definition
    User.create({
      firstName: 'Figgy',
      lastName: 'DePoopins',
    });
  });
};
initialize();
module.exports = { User };
