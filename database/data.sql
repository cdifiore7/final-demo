insert into "users" ("userId", "email", "hashedPassword", "createdAt")
values (default, 'bob@gmail.com', 'password123', '2021-03-22 00:00:01');

insert into "suppliers" ("supplierId", "name")
values (1, 'ABD'), (2,'Dell'), (3, 'Corsair'), (4, 'EVGA'), (5, 'ASUS'), (6, 'OLOY'),
(7, 'iBUYPOWER'), (8, 'Activision-Blizzard'), (9, 'Nvidia');

insert into "carts" ("cartId", "createdAt")
values (101, '2021-03-22 00:00:01'),
(201,	'2021-03-22 00:00:02'),
(301,	'2021-03-22 00:00:03'),
(401,	'2021-03-22 00:00:04'),
(501,	'2021-03-22 00:00:05'),
(601,	'2021-03-22 00:00:06'),
(701,	'2021-03-22 00:00:07'),
(801,	'2021-03-22 00:00:08'),
(901,	'2021-03-22 00:00:09');

insert into "products" ("productId", "supplierId", "name", "description", "price", "imageUrl")
values (1, 1, 'ABD-i5 Gaming PC Desktop', 'A gaming powerhouse at an affordable price!', 69999, '/images/ABD-i5.png'),
(2, 2, 'Alienware-m15-R3 Gaming Laptop', 'A portable powerhouse at a mid range price!', 79999, '/images/Alienware-m15-R3.jpg'),
(3, 3, 'Corsair Vegeance DDR4 32gb Ram', 'Fast, high powered memory for the ideal workstation or gaming PC!', 12999, '/images/Corsair-32gb.jpg'),
(4, 4, 'EVGA 1000W 80 Plus Gold Power Supply', 'Enough power for even the enthusiest level.', 21999, '/images/EVGA-1000W-80plusgold.png'),
(5, 5, 'Asus 1080p 23.8 inch Full HD Gaming Monitor', 'Experience HD gaming at its finest!', 10999, '/images/asus-23.8-1080p.jpg'),
(6, 6, 'OLOY Blade Performance 32gb DDR4', 'High end DDR4 ram with blazing fast speeds!', 12999,'/images/OLOY-Blade-RG-32GB.jpg'),
(7, 7, 'Diablo 2-Resurrected', 'HD remake of the 2000 PC classic!', 3999, '/images/Diablo_2-resurrected.jpg'),
(8, 8, 'Nvidia RTX 2060 Superclocked GPU', 'The newest and greatest in graphical horsepower!', 69999, '/images/rtx-2060.jpg'),
(9, 9, 'Nvidia RTX 2080ti Superclocked GPU', 'The highest end of graphics power you can find!', 100099, '/images/rtx-2080-ti.jpg');


insert into "addresses" ("shippingAddress", "userId", "city", "state", "zipcode", "firstName", "lastName")
values ('111 Main Steet', 1, 'Irvine', 'CA', '10101', 'Bob', 'John' );
