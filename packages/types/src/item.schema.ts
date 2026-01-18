import { z } from "zod";

export const TransactionType = [
  "PURCHASE",
  "SALE",
  "RETURN",
  "WASTE",
  "ADJUSTMENT",
] as const;
export const UnitOfMeasure = ["EA", "LB", "OZ", "KG", "G", "L", "ML"] as const;
export const Category = [
  "PRODUCE",
  "DAIRY",
  "BEVERAGES",
  "MEAT",
  "SEAFOOD",
  "BAKERY",
  "DRY GOODS",
  "CANNED GOODS",
  "FROZEN",
  "SPICES",
  "HOUSEHOLD",
  "PREPARED",
  "OTHER",
] as const;

export const StockBatch = z.object({
  quantity_received: z.coerce.number().min(0),
  quantity_remaining: z.coerce.number().min(0),
  expiration_date: z.iso.datetime().or(z.string()).optional().default("N/A"),
  received_at: z.iso.datetime().or(z.string()).nullable().optional(),
  cost_of_purchase: z.string().nullable().optional(),
});

export const Transaction = z.object({
  type: z.enum(TransactionType),
  quantity: z.coerce.number(),
  transaction_date: z.iso.datetime().or(z.string()),
});

export const Waste = z.object({
  quantity: z.coerce.number(),
  reason: z.string().min(1, "Reason is required"),
  created_at: z.iso.datetime().or(z.string()),
});

export const Item = z
  .object({
    id: z.coerce.number().optional(),
    clover_id: z.string().nullable().optional(),
    sku: z.string().nullable().optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional(),
    ingredients: z.string().optional(),
    uom: z.enum(UnitOfMeasure).optional(),
    price: z.coerce.number().min(0).optional(),
    vendor_id: z.number().nullable().optional(),
    low_stock_threshold: z.coerce.number().optional(),
    category: z.enum(Category),
    image_url: z.string().optional(),

    stock_batch: z.array(StockBatch).optional().default([]),
    transaction: z.array(Transaction).optional().default([]),
    waste: z.array(Waste).optional().default([]),
  })
  .transform((item) => {
    const totalFromBatches = item.stock_batch.reduce(
      (sum, batch) => sum + batch.quantity_remaining,
      0,
    );
    return {
      ...item,
      quantity_remaining: totalFromBatches,
    };
  });

export type Item = z.infer<typeof Item>;
export type StockBatch = z.infer<typeof StockBatch>;
export type Transaction = z.infer<typeof Transaction>;
export type Waste = z.infer<typeof Waste>;
