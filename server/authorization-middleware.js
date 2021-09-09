const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error'); // eslint-disable-line

function authorizationMiddleware(req, res, next) {

  const xAccessToken = req.headers['x-access-token'];
  if (!xAccessToken) {
    throw new ClientError(401, 'authentication required');
  }

  const payload = jwt.verify(xAccessToken, process.env.TOKEN_SECRET);
  req.user = payload;
  next();
}
module.exports = authorizationMiddleware;
