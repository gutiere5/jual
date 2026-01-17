-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('PURCHASE', 'SALE', 'RETURN', 'WASTE', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "WasteReason" AS ENUM ('EXPIRED', 'DAMAGED', 'THEFT', 'MISTAKE', 'OTHER');

-- CreateEnum
CREATE TYPE "UnitOfMeasure" AS ENUM ('EA', 'LB', 'OZ', 'KG', 'G', 'L', 'ML');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('PRODUCE', 'DAIRY', 'BEVERAGES', 'MEAT', 'SEAFOOD', 'BAKERY', 'DRY_GOODS', 'CANNED_GOODS', 'FROZEN', 'SPICES', 'HOUSEHOLD', 'PREPARED', 'OTHER');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "clover_id" VARCHAR(50),
    "sku" VARCHAR(100) NOT NULL,
    "name" VARCHAR(255),
    "uom" "UnitOfMeasure",
    "price" MONEY,
    "vendor_id" INTEGER,
    "low_stock_threshold" INTEGER DEFAULT 10,
    "category" "Category" NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock_batch" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER,
    "quantity_received" DECIMAL(12,3) NOT NULL,
    "quantity_remaining" DECIMAL(12,3) NOT NULL,
    "expiration_date" DATE,
    "received_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "cost_at_purchase" DECIMAL(12,2),

    CONSTRAINT "stock_batch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER,
    "batch_id" INTEGER,
    "clover_order_id" VARCHAR(100),
    "type" "TransactionType" NOT NULL,
    "quantity" DECIMAL(12,3),
    "transaction_date" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "id" SERIAL NOT NULL,
    "clover_id" VARCHAR(50),
    "name" VARCHAR(255),

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waste" (
    "id" SERIAL NOT NULL,
    "item_id" INTEGER,
    "batch_id" INTEGER,
    "quantity" DECIMAL(12,3) NOT NULL,
    "reason" "WasteReason" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waste_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_password_key" ON "user"("password");

-- CreateIndex
CREATE UNIQUE INDEX "item_clover_id_key" ON "item"("clover_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_sku_key" ON "item"("sku");

-- CreateIndex
CREATE INDEX "item_index_clover_id" ON "item"("clover_id");

-- CreateIndex
CREATE INDEX "transaction_index_clover_order_id" ON "transaction"("clover_order_id");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_clover_id_key" ON "vendor"("clover_id");

-- CreateIndex
CREATE INDEX "vendor_index_clover_id" ON "vendor"("clover_id");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stock_batch" ADD CONSTRAINT "stock_batch_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "stock_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "waste" ADD CONSTRAINT "waste_batch_id_fkey" FOREIGN KEY ("batch_id") REFERENCES "stock_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "waste" ADD CONSTRAINT "waste_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
