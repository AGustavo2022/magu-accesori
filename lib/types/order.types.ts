
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

export type Order = {
  order_number: string
  total: string
  subtotal : number
  shipping_cost: string
  payment_method: string
  created_at: string
  shipping_data: ShippingData
}

export type OrderItem = {
  id: string
  title: string
  quantity: number
  price: string
}