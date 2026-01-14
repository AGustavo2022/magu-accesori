import { Product } from "@/lib/types/definitions"

export interface CartItem {
  productId: string
  title: string
  image_url: string
  stock: number
  price: number
  discount?: number
  quantity: number
}

export interface ResolvedCartItem {
  productId: string
  title: string
  image_url: string
  price: number
  stock: number
  discount?: number
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

export type AddItemPayload = {
  productId: string
  title: string
  image_url: string
  stock: number
  price: number
  discount?: number
  quantity: number
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }
