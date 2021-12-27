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
  const { email, password, passwordConfirm } = req.body;
  if (!email || !password || !passwordConfirm) {
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
        const params = [email, password, passwordConfirm];
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

app.get('/api/cart/', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const sql = `
  select "c"."cartItemId",
      "c"."price",
      "p"."supplierId",
      "p"."productId",
      "p"."imageUrl",
      "p"."name",
      "p"."description"
    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "c"."cartId" = $1`;
    const params = [req.session.cartId];
    db.query(sql, params)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => next(err));
  }
});

app.post('/api/cart/', (req, res, next) => {
  const productId = parseInt(req.body.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: 'ProductId must be a positive integer'
    });
  }
  const priceSql = `
    select "price"
      from "products"
      where "productId" = $1`;
  const priceParams = [productId];
  db.query(priceSql, priceParams)
    .then(priceResult => {
      if (priceResult.rows.length === 0) {
        next(new ClientError('Product does not exist', 400));
        return;
      }
      if (req.session.cartId) {
        const currentCartId = `
          select "cartId"
            from "cart"
            where "cartId" = $1;
        `;
        const params = [req.session.cartId];
        return db.query(currentCartId, params).then(cartResult => {
          const combined = {
            cartId: cartResult.rows[0].cartId,
            price: priceResult.rows[0].price
          };
          return combined;
        });
      } else {
        const newCartId = `
      insert into "cart" ("cartId", "createdAt")
      values (default, default)
      returning "cartId"`;
        return db.query(newCartId).then(cartResult => {
          const combined = {
            cartId: cartResult.rows[0].cartId,
            price: priceResult.rows[0].price
          };
          return combined;
        });
      }
    })
    .then(combined => {
      req.session.cartId = combined.cartId;
      const cartItemId = `
              insert into "cartItems" ("cartId", "supplierId", "productId", "price")
              values ($1, $2, $3, $4)
              returning "cartItemId"`;
      const params = [req.session.cartId, productId, combined.price];
      return db.query(cartItemId, params).then(cartItemId => {
        const cartItemInfo = `
            select "c"."cartItemId",
                  "c"."price",
                  "p"."supplierId",
                  "p"."productId",
                  "p"."imageUrl",
                  "p"."name",
                  "p"."description"
              from "cartItems" as "c"
              join "products" as "p" using ("productId")
            where "c"."cartItemId" = $1`;
        const params = [cartItemId.rows[0].cartItemId];
        return db.query(cartItemInfo, params).then(cartItemInfo => {
          res.status(201).json(cartItemInfo.rows[0]);
        });
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
    errors.shippingAddress = 'missing or invalid shipping address.';
  }
  if (Object.keys(errors).length) {
    return res.status(400).json(errors);
  }

  const sql = `
  INSERT INTO "orders" ("name", "creditCard", "shippingAddress", "cartId")
  VALUES ($1, $2, $3, $4)
  RETURNING "orderId", "createdAt", "name", "creditCard", "shippingAddress"
  `;
  const values = [name, creditCard, shippingAddress, cartId];

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
