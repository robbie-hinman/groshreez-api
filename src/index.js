require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const models = require('./db');

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/users', (req, res, err) => {
  models.User.findAll().then(users => {
    res.send(JSON.stringify(users));
  });
});

app.get('/users-aw', async (req, res, err) => {
  const users = await models.User.findAll();
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
  console.log(`Express web app available at localhost: ${port}`),
);
