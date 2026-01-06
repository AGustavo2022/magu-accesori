
export type CreateOrderState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: any;
  order?: any;
};
