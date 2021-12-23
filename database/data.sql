
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
insert into "carts" (
  "cartId",
  "createdAt"
) values (
  1,
  '2021-12-1 00:00:01'
);

insert into "suppliers" (
  "supplierId",
  "name"
) values (
  1,
  'ABD'
), (
  2,
  'Dell'
), (
  3,
  'Corsair'
), (
  4,
  'EVGA'
), (
  5,
  'ASUS'
), (
  6,
  'OLOY'
),
(
  7,
  'iBUYPOWER'
),
(
  8,
  'Activision-Blizzard'
),
(
  9,
  'Nvidia'
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
  'ABD-i5 Gaming PC Desktop',
  'A gaming powerhouse at an affordable price!',
  '$699.99',
  '/images/ABD-i5.png'
), (
  2,
  2,
  'Alienware-m15-R3 Gaming Laptop',
  'A portable powerhouse at a mid range price!',
  '$899.99',
  '/images/Alienware-m15-R3.jpg'
), (
  3,
  3,
  'Corsair Vegeance DDR4 32gb Ram',
  'Fast, high powered memory for the ideal workstation or gaming PC!',
  '$129.99',
  '/images/Corsair-32gb.jpg'
), (
  4,
  4,
  'EVGA 1000W 80 Plus Gold Power Supply',
  'Enough power for even the enthusiest level.',
  '$219.99',
  '/images/EVGA-1000W-80plusgold.png'
), (
  5,
  5,
  'Asus 1080p 23.8 inch Full HD Gaming Monitor',
  'Experience HD gaming at its finest!',
  '$109.99',
  '/images/asus-23.8-1080p.jpg'
), (
  6,
  6,
  'OLOY Blade Performance 32gb DDR4',
  'High end DDR4 ram with blazing fast speeds!',
  '$129.99',
  '/images/OLOY-Blade-RG-32GB.jpg'
),
(
  8,
  7,
  'Diablo 2-Resurrected',
  'HD remake of the 2000 PC classic!',
  '$39.99',
  '/images/Diablo_2-resurrected.jpg'
),
(
  9,
  8,
  'Nvidia RTX 2060 Superclocked GPU',
  'The newest and greatest in graphical horsepower!',
  '$699.99',
  '/images/rtx-2060.jpg'
),
(
  10,
  8,
  'Nvidia RTX 2080ti Superclocked GPU',
  'The highest end of graphics power you can find!',
  '$1000.99',
  '/images/rtx-2080-ti.jpg'
);

insert into "cartItems" (
  "cartItemId",
  "cartId",
  "productId",
  "price"
) values (
  1,
  1,
  1,
  '$1000.99'
);
