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

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([]);
  }
  const cartId = req.session.cartId;
  const sql = `
  SELECT "c"."cartItemId",
         "c"."price",
         "p"."productId",
         "p"."imageUrl",
         "p"."name",
         "p"."description"
  FROM "cartItems" as "c"
  JOIN "products" as "p" using ("productId")
  WHERE "c"."cartId" = $1
  `;
  const values = [cartId];
  db.query(sql, values)
    .then(result => {
      return res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/cart/:productId', (req, res, next) => {
  const { cartId } = req.session;
  const productId = parseInt(req.params.productId);
  if (!Number.isInteger(productId) || productId <= 0) {
    res.status(400).json('Product id must be a positive integer');
  }
  const sql = `
    SELECT "price"
    FROM "products"
    WHERE "productId" = $1
    `;
  const values = [productId];
  db.query(sql, values)
    .then(priceResult => {
      if (!priceResult.rows.length) {
        throw new ClientError('The requested information does not exist.', 400);
      }
      if (cartId) {
        const [{ price }] = priceResult.rows;
        return {
          cartId: cartId,
          price: price
        };
      }
      const sql = `
      INSERT INTO "carts" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"
      `;
      return db.query(sql)
        .then(insertResult => {
          const [{ cartId }] = insertResult.rows;
          const [{ price }] = priceResult.rows;
          return {
            cartId: cartId,
            price: price
          };
        });
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const sql = `
      INSERT INTO "cartItems" ("cartId", "productId", "price")
      VALUES ($1, $2, $3)
      returning "cartItemId"
    `;
      const values = [result.cartId, productId, result.price];
      return db.query(sql, values);
    })
    .then(insertCartResult => {
      const [{ cartItemId }] = insertCartResult.rows;
      const sql = `
    SELECT "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."imageUrl",
           "p"."name",
           "p"."description"
    FROM "cartItems" as "c"
    JOIN "products" as "p" using ("productId")
    WHERE "c"."cartItemId" = $1
    `;
      const values = [cartItemId];
      return db.query(sql, values)
        .then(result => {
          const cartItem = result.rows[0];
          return res.status(201).json(cartItem);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!cartId) {
    return res.status(400).json({ error: 'no cart id found.' });
  }
  const { name, creditCard, address } = req.body;
  const errors = {};
  if (!name) {
    errors.name = 'missing or invalid name.';
  }
  if (!creditCard) {
    errors.creditCard = 'missing or invalid credit card number.';
  }
  if (!address) {
    errors.address = 'missing or invalid shipping address.';
  }
  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }

  const sql = `
  INSERT INTO "orders" ("name", "creditCard", "address", "cartId")
  VALUES ($1, $2, $3, $4)
  RETURNING "orderId", "createdAt", "name", "creditCard", "address"
  `;
  const values = [name, creditCard, address, cartId];

  db.query(sql, values)
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.use(authorizationMiddleware);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
