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
  const checkCartId = `
SELECT "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."imageUrl",
       "p"."name",
       "p"."description"
  FROM "cartItems" AS "c"
  JOIN "products" AS "p" USING ("productId")
 WHERE "c"."cartId" = $1
  `;
  const value = [req.session.cartId];

  db.query(checkCartId, value)
    .then(result => {
      const data = result.rows;
      res.json(data);
    })
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const { productId } = req.body;

  if (!Number(productId)) {
    return next(new ClientError(`${productId} is not a valid Product ID`, 400));
  }

  const checkPrice = `
  SELECT "price"
  FROM   "products"
  WHERE  "productId" = $1
`;

  const value = [productId];

  db.query(checkPrice, value)
    .then(result => {
      if (!result.rows[0]) {
        throw new ClientError(`productId ${productId} does not exist`, 400);
      } else if ('cartId' in req.session) {

        return {
          price: result.rows[0].price,
          cartId: req.session.cartId
        };
      }
      const addCartId = `
          INSERT INTO "carts" ("cartId", "createdAt")
          VALUES (default, default)
          RETURNING "cartId"
        `;
      return db.query(addCartId).then(cartId => ({
        price: result.rows[0].price,
        cartId: cartId.rows[0].cartId
      }));
    })
    .then(data => {
      req.session.cartId = data.cartId;
      const price = data.price;
      const addItemToCart = `
        INSERT INTO "cartItems" ("cartId", "productId", "price")
        VALUES ($1, $2, $3)
        RETURNING "cartItemId"
      `;
      const values = [data.cartId, productId, price];
      return db.query(addItemToCart, values).then(cartItemId => cartItemId.rows[0]);
    })
    .then(cartItemId => {

      const selectAllCartItems = `
  SELECT "c"."cartItemId",
      "c"."price",
      "p"."productId",
      "p"."imageUrl",
      "p"."name",
      "p"."description"
   FROM "cartItems" AS "c"
   JOIN "products" AS "p" using ("productId")
  WHERE "c"."cartItemId" = $1
      `;
      const value = [cartItemId.cartItemId];
      return db.query(selectAllCartItems, value)
        .then(data => {
          res.status(201).json(data.rows);
        });
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  const cartId = req.session.cartId;
  if (!cartId) {
    return res.status(400).json({ error: 'no cart id found.' });
  }
  const { name, creditCard, shippingAddress } = req.body;
  const errors = {};
  if (!name) {
    errors.name = 'missing or invalid name.';
  }
  if (!creditCard) {
    errors.creditCard = 'missing or invalid credit card number.';
  }
  if (!addressId) {
    errors.addressId = 'missing or invalid shipping address.';
  }
  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }

  const sql = `
  INSERT INTO "orders" ("name", "creditCard", "addressId", "cartId")
  VALUES (default, $1, $2, $3, $4, default)
  RETURNING *
  `;
  const values = [req.session.cartId, name, creditCard, addressId, cartId];

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
