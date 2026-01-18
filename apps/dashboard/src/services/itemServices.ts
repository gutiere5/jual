import { Item } from '@repo/types/item.schema';
import apiClient from '../api/client';
import { z } from 'zod';

export const itemService = {
  createById: async () => {
    const response = await apiClient.post<Item>('item');

    return response.data;
  },

  getAll: async () => {
    try {
      const response = await apiClient.get<{ items: unknown[] }>('item');
      const parsed = z.array(Item).safeParse(response.data.items);

      if (!parsed.success) {
        throw new Error(
          `Data from server does not match Item schema:\n${z.prettifyError(parsed.error)}`,
        );
      }

      return parsed.data;
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to get all items';
      throw new Error(`${errorMessage} (during getting all items from database)`);
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
      const errorMessage = error instanceof Error ? error.message : 'Failed to get item by ID';
      throw new Error(`${errorMessage} (during getting all Item from database)`);
    }
  },

  updateItem: async (updatedItem: Partial<Item> & { id: number }): Promise<Item> => {
    await apiClient.put<unknown>(`item/${updatedItem.id}`, updatedItem);
    return itemService.getById(updatedItem.id);
  },

  deleteItem: async (id: number) => {
    const response = await apiClient.delete<Item>(`items./${id}`);
    return response.data;
  },
};
