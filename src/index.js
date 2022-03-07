require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const app = express();
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
const models = require('./db');
const auth = require('./auth');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./graphql');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// middleware test
var myLogger = function (req, res, next) {
  console.log('LOGGED');
  req.foo = '12345abc';
  next();
};

app.use(myLogger);
app.use(auth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

app.get('/', (req, res) => {
  // const sessionInfo = JSON.stringify(req.session);
  res.send(`hello world ${req.foo}`);
});

app.get('/users', (req, res, err) => {
  models.User.findAll().then((users) => {
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
