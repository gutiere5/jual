import type { Item } from '../types';
import apiClient from '../api/client';

export const itemService = {
  createById: async () => {
    const response = await apiClient.post<Item>('items');
    console.log(response.config);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.request);

    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get<Item[]>('items');

    console.log(response.config);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.request);

    return response.data;
  },

  getById: async (id: number) => {
    const response = await apiClient.get<Item>(`items/${id}`);

    return response.data;
  },

  updateItem: async (updatedItem: Item): Promise<Item> => {
    const response = await apiClient.put<Item>(`items/${updatedItem.id}`, updatedItem);

    return response.data;
  },

  deleteItem: async (id: number) => {
    const response = await apiClient.delete<Item>(`items./${id}`);

    return response.data;
  },
};
