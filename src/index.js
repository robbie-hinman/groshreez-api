const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const sequelize = new Sequelize(
  'postgres://robbieh@localhost:5432/sequelize-proj1'
);
const port = process.env.PORT || 3000;

const Model = Sequelize.Model;
class User extends Model {}
User.init(
  {
    // attributes
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
      // allowNull defaults to true
    }
  },
  {
    sequelize,
    modelName: 'user'
    // options
  }
);

// Note: using `force: true` will drop the table if it already exists
User.sync({ force: true }).then(() => {
  // Now the `users` table in the database corresponds to the model definition
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/users', (req, res, err) => {
  User.findAll().then(users => {
    res.send(JSON.stringify(users));
  });
});

app.get('/users-aw', (req, res, err) => {
  const users = await User.findAll()
  
    res.send(JSON.stringify(users));
  
});

// check if the connection string works.
// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

app.listen(port, () =>
  console.log(`Express web app available at localhost: ${port}`)
);
