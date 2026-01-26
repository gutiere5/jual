import { Item } from "@repo/types/item.schema";
import apiClient from "../api/client";
import { z } from "zod";

export const itemService = {
  getAll: async () => {
    try {
      // const response = await apiClient.get<{ items: unknown[] }>("item");
      // console.log(response.data);
      // const parsed = z.array(Item).safeParse(response.data.items);

      const response = mockItems;
      const parsed = z.array(Item).safeParse(response);

      if (!parsed.success) {
        const errorDetails = z.prettifyError(parsed.error);
        throw new Error(`Schema validation failed:\n${errorDetails}`);
      }

      return parsed.data;
    } catch (error: unknown) {
      throw new Error("Failed to fetch items from the service", {
        cause: error,
      });
    }
  },

  getById: async (id: number) => {
    try {
      const response = await apiClient.get<{ item: unknown }>(`item/${id}`);
      const parsed = Item.safeParse(response.data.item);
      if (!parsed.success) {
        throw new Error(
          `Item ${id} data is corrupted or invalid: \n${z.prettifyError(parsed.error)}`,
        );
      }

      return parsed.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get item by ID";
      throw new Error(
        `${errorMessage} (during getting all Item from database)`,
      );
    }
  },
};

const mockItems = [
  {
    id: 101,
    clover_id: "CLV-992834",
    sku: "BAKE-001",
    name: "Sourdough Bread Loaf",
    description: "Freshly baked artisanal sourdough bread.",
    ingredients: "Flour, Water, Salt, Wild Yeast",
    uom: "EA",
    price: 8.5,
    vendor_id: 5,
    low_stock_threshold: 10,
    category: "MEAT",
    image_url: "https://picsum.photos/500",
    stock_batch: [
      {
        quantity_received: 20,
        quantity_remaining: 12,
        expiration_date: "2024-05-25T00:00:00Z",
        received_at: "2024-05-20T08:00:00Z",
        cost_of_purchase: "4.00",
      },
    ],
    transaction: [
      {
        type: "SALE",
        quantity: 1,
        transaction_date: "2024-05-21T14:30:00Z",
      },
    ],
    waste: [],
  },
  {
    id: 205,
    clover_id: "CLV-112233",
    sku: "MEAT-RIBEYE-05",
    name: "Ribeye Steak - Prime",
    description: "Hand-cut 12oz Prime Ribeye",
    uom: "LB",
    price: 24.99,
    vendor_id: 12,
    low_stock_threshold: 15,
    category: "MEAT",
    meat_choices: ["CHORIZO", "TRIPA", "PASTOR"],
    stock_batch: [
      {
        quantity_received: 50,
        quantity_remaining: 5,
        expiration_date: "2024-05-18T23:59:59Z",
        received_at: "2024-05-10T06:00:00Z",
        cost_of_purchase: "12.50",
      },
      {
        quantity_received: 40,
        quantity_remaining: 38,
        expiration_date: "2024-06-01T23:59:59Z",
        received_at: "2024-05-19T09:00:00Z",
        cost_of_purchase: "13.00",
      },
    ],
    transaction: [
      { type: "SALE", quantity: 2, transaction_date: "2024-05-19T18:00:00Z" },
      { type: "RETURN", quantity: 1, transaction_date: "2024-05-19T19:30:00Z" },
    ],
    waste: [
      {
        quantity: 2,
        reason: "Expired stock from previous batch",
        created_at: "2024-05-19T08:00:00Z",
      },
    ],
  },
  {
    name: "Organic Whole Milk",
    category: "MEAT",
    uom: "L",
    price: 5.99,
    stock_batch: [
      {
        quantity_received: 50,
        quantity_remaining: 45,
        expiration_date: "2024-06-01",
      },
    ],
    transaction: [],
    waste: [],
  },
  {
    name: "Hass Avocado",
    category: "MEAT",
    uom: "EA",
    price: 1.5,
    stock_batch: [
      {
        quantity_received: 150,
        quantity_remaining: 120,
        expiration_date: "2024-05-28",
      },
    ],
    transaction: [
      {
        type: "SALE",
        quantity: 30,
        transaction_date: new Date().toISOString(),
      },
    ],
    waste: [
      { quantity: 5, reason: "Bruised", created_at: new Date().toISOString() },
    ],
  },
];
