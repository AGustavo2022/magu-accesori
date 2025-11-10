"use client"

import { Product } from "@/lib/definitions" // Asegúrate que 'Product' tiene id: string
import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

// 1. CAMBIO: Los IDs en las acciones son string
type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string } // <-- string (UUID)
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } } // <-- string (UUID)
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

// 2. CAMBIO: Los parámetros en el contexto son string
interface CartContextType extends CartState {
  addItem: (product: Product) => void
  removeItem: (productId: string) => void // <-- string (UUID)
  updateQuantity: (productId: string, quantity: number) => void // <-- string (UUID)
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // El .id de product (action.payload) ahora es string
      const existingItem = state.items.find((item) => item.product.id === action.payload.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.product.id === action.payload.id
            // El stock en Product es un number, asumimos que está bien
            ? { ...item, quantity: Math.min(item.quantity + 1, item.product.stock) } 
            : item,
        )
      } else {
        newItems = [...state.items, { product: action.payload, quantity: 1 }]
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "REMOVE_ITEM": {
      // action.payload (el ID) es ahora string
      const newItems = state.items.filter((item) => item.product.id !== action.payload)
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "UPDATE_QUANTITY": {
      // action.payload.id es ahora string
      const newItems = state.items
        .map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.product.stock)) }
            : item,
        )
        .filter((item) => item.quantity > 0)

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return { items: newItems, total, itemCount }
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 }

    case "LOAD_CART": {
      const total = action.payload.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0)
      return { items: action.payload, total, itemCount }
    }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0, // Corregido: Si el carrito está vacío, itemCount debería ser 0.
  })

  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart")
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(state.items))
  }, [state.items])

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  // 3. CAMBIO: Acepta un string para el ID
  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId })
  }

  // 4. CAMBIO: Acepta un string para el ID
  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}