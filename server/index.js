/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const pg = require('pg');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleware = require('./authorization-middleware');
const app = express();
app.use(staticMiddleware);

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
    "supplierId",
    "name",
    "description",
    "price",
    "imageUrl"
  from "products"
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productID" must be a positive integer'
    });
  }
  const sql = `
  SELECT *
  FROM "products"
  WHERE "productId" = $1
  `;
  const values = [productId];
  db.query(sql, values)
    .then(result => {
      const productDetails = result.rows[0];
      if (productDetails) {
        res.status(400).json(productDetails);
      } else {
        next(new ClientError('No products exist with the supplied product id', 404));
      }
    })
    .catch(err => next(err));
});

app.post('/api/signup', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required fields');
  } else {
    argon2
      .hash(password)
      .then(hashedPassword => {
        const sql = `
    insert into "users" ("email", "hashedPassword")
    values ($1, $2)
    reuturning "userId", "email", "createdAt"
    `;
        const params = [email, hashedPassword];
        db.query(sql, params)
          .then(result => {
            res.status(201).json(response.rows[0]);
          })
          .catch(err => next(err));
      })
      .catch(err => next(err));
  }
});

app.post('/api/login', (req, res, next) => {
  const sql = `
  select "email", "hashedPassword"
  from "users"
  where "email" = ($1) and "hashedPassword" = ($2)`;
  const { email, password } = req.body;
  const params = [email, password];
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required');
  }
  db.query(sql, params)
    .then(result => {
      const user = result.rows;
      if (!user.length) {
        res.status(404).json({
          error: 'Incorrect user and/or password.'
        });
      } else {
        res.status(200).json({
          message: 'You are logged in!'
        });
      }
    }).catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An error ocurred' });
    });
});

app.use(authorizationMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
