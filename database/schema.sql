set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

SET default_tablespace = '';
SET default_with_oids = false;

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."cart" (
    "cartId" serial NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "carts_pk" PRIMARY KEY ("cartId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."cartItems" (
    "cartItemId" serial NOT NULL,
    "cartId" integer NOT NULL,
    "productId" integer NOT NULL,
    "supplierId" integer NOT NULL,
    "price" integer NOT NULL,
    CONSTRAINT "cartItems_pk" PRIMARY KEY ("cartItemId")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "public"."products" (
    "productId" serial NOT NULL,
    "supplierId" integer NOT NULL,
    "name" text NOT NULL,
    "description" TEXT NOT NULL,
    "price" integer NOT NULL,
    "imageUrl" text NOT NULL,
    CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "addresses" (
    "shippingAddress" serial NOT NULL,
    "userId" integer NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    CONSTRAINT "addresses_pk" PRIMARY KEY ("shippingAddress")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."orderitems" (
    "orderitemId" serial NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    CONSTRAINT "orderitems_pk" PRIMARY KEY ("orderitemId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "suppliers" (
    "supplierId" serial NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "suppliers_pk" PRIMARY KEY ("supplierId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."orders" (
    "orderId" serial NOT NULL,
    "name" TEXT NOT NULL,
    "creditCard" text NOT NULL,
    "userId" integer NOT NULL,
    "shippingAddress" integer NOT NULL,
    "cartId" integer NOT NULL,
    "createdAt" TIMESTAMP NOT NULL default now(),
    CONSTRAINT "orders_pk" PRIMARY KEY ("orderId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "deals" (
    "dealId" serial NOT NULL,
    "topSeller" BOOLEAN NOT NULL,
    "topRated" BOOLEAN NOT NULL,
    "trending" BOOLEAN NOT NULL,
    "newestArrival" BOOLEAN NOT NULL,
    "productId" integer NOT NULL,
    CONSTRAINT "deals_pk" PRIMARY KEY ("dealId")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("shippingAddress") REFERENCES "addresses"("shippingAddress");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk2" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");
ALTER TABLE "deals" ADD CONSTRAINT "deals_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "cartItems" ADD CONSTRAINT "cartItems_fk1" FOREIGN KEY ("cartId") REFERENCES "cart"("cartId");

ALTER SEQUENCE "public"."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";
ALTER SEQUENCE "public"."products_productId_seq" OWNED BY "public"."products"."productId";
ALTER TABLE ONLY "public"."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);
ALTER TABLE ONLY "public"."cart" ALTER COLUMN "cartId" SET DEFAULT nextval('public."cart_cartId_seq"'::regclass);
ALTER TABLE ONLY "public"."orders" ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);
ALTER TABLE ONLY "public"."products" ALTER COLUMN "productId" SET DEFAULT nextval('public."products_productId_seq"'::regclass);
SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 26, true);
SELECT pg_catalog.setval('public."cart_cartId_seq"', 27, true);
SELECT pg_catalog.setval('public."orders_orderId_seq"', 1, false);
SELECT pg_catalog.setval('public."products_productId_seq"', 1, false);
