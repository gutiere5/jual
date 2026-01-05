export interface Item {
  id: number;
  clover_id: string | null;
  sku: string;
  name: string;
  uom: string;
  category_id: number | null;
  vendor_id: number | null;
  low_stock_threshold: number;
}

export interface Error {
  statusText?: string;
  message: string;
  errorCode: number;
  stack?: string;
}
