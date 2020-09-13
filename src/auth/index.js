/**
 * The user auth/cookie logic middleware
 *
 **/

const auth = (req, res, next) => {
  console.log('cookies: ', JSON.stringify(req.cookies));
  res.cookie('name', 'holysmokers!');
  return next();
};

module.exports = auth;
