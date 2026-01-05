import type { Item, Error } from '../types';

let mockItems: Item[] = [
  {
    id: 2,
    clover_id: null,
    sku: '5465ad16adsfa',
    name: 'Milk',
    uom: 'each',
    category_id: null,
    vendor_id: null,
    low_stock_threshold: 10,
  },
  {
    id: 3,
    clover_id: null,
    sku: '5465aadfaadsfa',
    name: 'Apple',
    uom: 'each',
    category_id: null,
    vendor_id: null,
    low_stock_threshold: 10,
  },
  {
    id: 4,
    clover_id: null,
    sku: '546asdf3bhmadfaadsfa',
    name: 'Orange',
    uom: 'each',
    category_id: null,
    vendor_id: null,
    low_stock_threshold: 10,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const itemService = {
  getAll: async (): Promise<Item[]> => {
    await delay(500); // Simulate network delay
    return [...mockItems];
  },

  getById: async (id: number): Promise<Item | null> => {
    await delay(300); // Simulate network delay
    const item = mockItems.find((item) => item.id === id);
    if (!item) {
      const error: Error = {
        statusText: 'Item not found',
        message: `No item found with id ${id}`,
        errorCode: 404,
      };
      throw error;
    }
    return item;
  },

  update: async (updatedItem: Item): Promise<Item> => {
    await delay(400);
    mockItems = mockItems.map((item) => (item.id === updatedItem.id ? updatedItem : item));
    return updatedItem;
  },
};
