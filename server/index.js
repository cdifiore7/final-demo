/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const authorizationMiddleware = require('./authorization-middleware');
const jwt = require('jsonwebtoken');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const jsonMiddleware = express.json();
app.use(staticMiddleware);
app.unsubscribe(jsonMiddleware);

app.post('/api/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
    insert into "users" ("email", "hashedPassword")
    values ($1, $2)
    reuturning "userId", "email, "createdAt"
    `;
      const params = [email, hasedPassword];
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
  select "userId", "hashedPassword"
  from "users"
  where "email" = ($1)`;
  const { email, password } = req.body;
  const param = [email];
  const params = [email, password];
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required');
  }
  db.query(sql, param)
    .then(result => {
      const user = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { email, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { email, userId };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});
app.use(authorizationMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
