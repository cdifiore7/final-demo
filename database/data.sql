
insert into "users" (
  "userId",
  "email",
  "hashedPassword",
  "createdAt")
values (
  1,
  'bob@gmail.com',
  'password123',
  '2021-03-22 00:00:01'
);
insert into "suppliers" (
  "supplierId",
  "name",
  "description"
) values (
  1,
  'ABD',
  'A gaming powerhouse at an affordable price!'
);
insert into "products" (
  "productId",
  "supplierId",
  "name",
  "description",
  "price",
  "imageUrl"
  ) values (
  1,
  1,
  'ABD-i5 Gaming PC',
  'A gaming powerhouse at an affordable price!',
  699.99,
  '/images/ABD-i5.png'
);
