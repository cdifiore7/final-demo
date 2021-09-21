require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const authorizationMiddleware = require('./authorization-middleware');
const jwt = require('jsonwebtoken');

const app = express();
app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

app.post('/api/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  }
  argon2
    .hash(password)
    .then(password => {
      const sql = `
    insert into "users" ("email", "password")
    values ($1, $2)
    reuturning "email", "userId", "createdAt"
    `;
      const params = [email, password];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/login', (req, res, next) => {
  const sql = `
  select "userId", "email", "password"
  from "users"
  where "email" = ($1) and "password = ($2)`;
  const { email, password } = req.body;
  const params = [email, password];
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required');
  }
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, password } = user;
      return argon2
        .verify(password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            email: email,
            userId: userId
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          const payloadtoken = {
            token: token,
            user: payload
          };
          res.json(payloadtoken);
        });
    })
    .catch(err => next(err));
});
app.get('api/users', (req, res, next) => {
  const { userId } = req.user;

  const sql = `
  select "userId,
  "email"
  from "users"
  where "userId" = ($1)`;
  const param = [userId];
  db.query(sql, param)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(authorizationMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
