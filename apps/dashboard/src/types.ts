export interface Item {
  id: number;
  name: string;
  uom: UnitOfMeasure;
  category_type: String;
  quatity_remainning: number;
  low_stock_threshold: number;
}

export interface Error {
  statusText?: string;
  message: string;
  errorCode: number;
  stack?: string;
}

const TransactionType = {
  PURCHASE: 'Purchase',
  SALE: 'Sale',
  RETURN: 'Return',
  WASTE: 'Waste',
  ADJUSTMENT: 'Adjustment',
} as const;

const UnitOfMeasure = {
  EA: 'EA',
  LB: 'LB',
  OZ: 'OZ',
  KG: 'KG',
  G: 'G',
  L: 'L',
  ML: 'ML',
} as const;

export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export type UnitOfMeasure = (typeof UnitOfMeasure)[keyof typeof UnitOfMeasure];
