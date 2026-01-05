import { PrismaClient, TransactionType, WasteReason, UnitOfMeasure } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../src/secrets";

const connectionString = `${DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...");

  // 1. Create Categories
  const produce = await prisma.category.upsert({
    where: { clover_id: "CAT_PRODUCE" },
    update: {},
    create: { clover_id: "CAT_PRODUCE", name: "Produce" },
  });

  const dairy = await prisma.category.upsert({
    where: { clover_id: "CAT_DAIRY" },
    update: {},
    create: { clover_id: "CAT_DAIRY", name: "Dairy" },
  });

  const bakery = await prisma.category.upsert({
    where: { clover_id: "CAT_BAKERY" },
    update: {},
    create: { clover_id: "CAT_BAKERY", name: "Bakery" },
  });

  const beverages = await prisma.category.upsert({
    where: { clover_id: "CAT_BEVERAGES" },
    update: {},
    create: { clover_id: "CAT_BEVERAGES", name: "Beverages" },
  });

  // 2. Create Vendors
  const farmA = await prisma.vendor.upsert({
    where: { clover_id: "VEN_001" },
    update: {},
    create: { clover_id: "VEN_001", name: "Local Farm A" },
  });

  const bakeryCorp = await prisma.vendor.upsert({
    where: { clover_id: "VEN_002" },
    update: {},
    create: { clover_id: "VEN_002", name: "Best Bakery Inc." },
  });

  const bevDist = await prisma.vendor.upsert({
    where: { clover_id: "VEN_003" },
    update: {},
    create: { clover_id: "VEN_003", name: "Drink Distributors" },
  });

  // 3. Create Items (Using Enums!)
  const apple = await prisma.item.upsert({
    where: { sku: "APPLE-001" },
    update: {},
    create: {
      sku: "APPLE-001",
      name: "Gala Apple",
      uom: UnitOfMeasure.EA,
      category_id: produce.id,
      vendor_id: farmA.id,
      low_stock_threshold: 50,
    },
  });

  const milk = await prisma.item.upsert({
    where: { sku: "MILK-001" },
    update: {},
    create: {
      sku: "MILK-001",
      name: "Organic Whole Milk",
      uom: UnitOfMeasure.L,
      category_id: dairy.id,
      vendor_id: farmA.id,
      low_stock_threshold: 10,
    },
  });

  const bread = await prisma.item.upsert({
    where: { sku: "BREAD-001" },
    update: {},
    create: {
      sku: "BREAD-001",
      name: "Sourdough Bread",
      uom: UnitOfMeasure.EA,
      category_id: bakery.id,
      vendor_id: bakeryCorp.id,
      low_stock_threshold: 15,
    },
  });

  const juice = await prisma.item.upsert({
    where: { sku: "JUICE-001" },
    update: {},
    create: {
      sku: "JUICE-001",
      name: "Orange Juice",
      uom: UnitOfMeasure.L,
      category_id: beverages.id,
      vendor_id: bevDist.id,
      low_stock_threshold: 20,
    },
  });

  const water = await prisma.item.upsert({
    where: { sku: "WATER-001" },
    update: {},
    create: {
      sku: "WATER-001",
      name: "Spring Water",
      uom: UnitOfMeasure.ML,
      category_id: beverages.id,
      vendor_id: bevDist.id,
      low_stock_threshold: 100,
    },
  });

  // 4. Create Batches (Inventory Layer)
  const appleBatch = await prisma.stock_batch.create({
    data: {
      item_id: apple.id,
      quantity_received: 100,
      quantity_remaining: 95,
      cost_at_purchase: 0.50,
      expiration_date: new Date("2026-03-01"),
    },
  });

  const breadBatch = await prisma.stock_batch.create({
    data: {
      item_id: bread.id,
      quantity_received: 50,
      quantity_remaining: 20,
      cost_at_purchase: 2.00,
      expiration_date: new Date("2026-01-10"), // Soon to expire
    },
  });

  const juiceBatch = await prisma.stock_batch.create({
    data: {
      item_id: juice.id,
      quantity_received: 200,
      quantity_remaining: 190,
      cost_at_purchase: 1.50,
      expiration_date: new Date("2026-06-01"),
    },
  });

  // 5. Create Transactions (Audit Layer)
  await prisma.transaction.createMany({
    data: [
      {
        item_id: apple.id,
        batch_id: appleBatch.id,
        type: TransactionType.PURCHASE,
        quantity: 100,
      },
      {
        item_id: apple.id,
        batch_id: appleBatch.id,
        type: TransactionType.SALE,
        quantity: 5,
      },
      {
        item_id: bread.id,
        batch_id: breadBatch.id,
        type: TransactionType.PURCHASE,
        quantity: 50,
      },
      {
        item_id: bread.id,
        batch_id: breadBatch.id,
        type: TransactionType.SALE,
        quantity: 30,
      },
       {
        item_id: juice.id,
        batch_id: juiceBatch.id,
        type: TransactionType.PURCHASE,
        quantity: 200,
      },
       {
        item_id: juice.id,
        batch_id: juiceBatch.id,
        type: TransactionType.SALE,
        quantity: 10,
      },
    ],
  });

  // 6. Create Waste Record
  await prisma.waste.createMany({
    data: [
      {
        item_id: milk.id,
        quantity: 1,
        reason: WasteReason.DAMAGED,
      },
      {
        item_id: bread.id,
        batch_id: breadBatch.id, // Linked to the batch
        quantity: 2,
        reason: WasteReason.EXPIRED,
      }
    ]
  });

  console.log("✅ Seeding completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
