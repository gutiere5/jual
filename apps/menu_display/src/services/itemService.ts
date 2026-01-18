import { Item } from "@repo/types/item.schema";
import apiClient from "../api/client";
import { z } from "zod";

export const itemService = {
  getAll: async () => {
    try {
      const response = await apiClient.get<{ items: unknown[] }>("item");
      console.log(response.data);
      const parsed = z.array(Item).safeParse(response.data.items);

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
