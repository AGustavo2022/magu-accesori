
export type CreateOrderState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  values?: any;
  order?: any;
  items?: any
};

export type OrderConfirmationProps = {
  order: Order
  items: OrderItem[]
}

export type ShippingData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  postal: string
}

export type OrderStatus = "pending" | "confirmed" | "cancelled"

export type Order = {
  id: string
  order_number: string
  user_id: string
  status: OrderStatus
  payment_method: string
  subtotal: number
  shipping_cost: number
  total: number
  shipping_data: any
  created_at: string
  updated_at: string
}
export type OrderItem = {
  id: string
  title: string
  quantity: number
  price: string
}

export type OrdersTableProps = {
  orders: Order[];
  totalOrder: number
}