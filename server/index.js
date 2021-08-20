/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('dotenv/config');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const app = express();
const jsonMiddleware = express.json();
app.use(staticMiddleware);

app.post('/api/login', (req, res, next) => {
  const sql = `
  select "email", "password"
  from "users"
  where "email" = ($1) and "password" = ($2)`;
  const { email, password } = req.body;
  const params = [email, password];
  if (!email || !password) {
    throw new ClientError(400, 'email and password are required');
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
