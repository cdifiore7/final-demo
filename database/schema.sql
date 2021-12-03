set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "users" (
    "userId" serial NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL default now(),
    CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "public"."products" (
    "productId" serial NOT NULL,
    "supplierId" integer NOT NULL,
    "name" text NOT NULL,
    "description" TEXT NOT NULL,
    "price" text NOT NULL,
    "imageUrl" text NOT NULL,
    CONSTRAINT "products_pk" PRIMARY KEY ("productId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "addresses" (
    "addressId" serial NOT NULL,
    "userId" integer NOT NULL,
    "address" TEXT NOT NULL,
    "address2" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    CONSTRAINT "addresses_pk" PRIMARY KEY ("addressId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "orderitems" (
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
CREATE TABLE "orders" (
    "orderId" serial NOT NULL,
    "userId" integer NOT NULL,
    "addressId" integer NOT NULL,
    "status" TEXT NOT NULL,
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
ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("supplierId");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_fk0" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId");
ALTER TABLE "orderitems" ADD CONSTRAINT "orderitems_fk1" FOREIGN KEY ("productId") REFERENCES "products"("productId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("addressId") REFERENCES "addresses"("addressId");
ALTER TABLE "deals" ADD CONSTRAINT "deals_fk0" FOREIGN KEY ("productId") REFERENCES "products"("productId");
