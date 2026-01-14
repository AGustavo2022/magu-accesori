"use client"

import { Product } from "@/lib/types/definitions"
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

function calculateTotal(items: CartItem[]): number {
  const total = items.reduce((sum, item) => {
    const price = item.product.price
    const discount = item.product.discount ?? 0
    const discountedPrice = price * (1 - discount / 100)
    return sum + discountedPrice * item.quantity
  }, 0)

  return Math.round(total * 100) / 100
}


function calculateCartState(items: CartItem[]) {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = calculateTotal(items)

  return { items, itemCount, total }
}


// 1. MODIFICACIÓN: La acción ADD_ITEM ahora acepta la cantidad seleccionada.
type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } } // <-- CAMBIO
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

// 2. MODIFICACIÓN: La firma de addItem ahora requiere la cantidad.
interface CartContextType extends CartState {
  addItem: (product: Product, quantity: number) => void // <-- CAMBIO
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload // Desestructuramos el product y la quantity
      const existingItem = state.items.find((item) => item.product.id === product.id)

      let newItems: CartItem[]
      if (existingItem) {
        newItems = state.items.map((item) => {
          if (item.product.id === product.id) {
            // 4. MODIFICACIÓN: Suma la nueva cantidad al stock existente, 
            // respetando el límite máximo del stock.
            const newQuantity = item.quantity + quantity;
            return { ...item, quantity: Math.min(newQuantity, product.stock) };
          }
          return item;
        });
      } else {
        // Si no existe, lo agrega con la cantidad inicial (ya validada en QuantitySelector)
        newItems = [...state.items, { product: product, quantity: Math.min(quantity, product.stock) }]
      }

      // const total = newItems.reduce((sum, item) => sum + (item.product.price - item.product.price * (item.product.discount/100) ) * item.quantity, 0)
      const total = calculateTotal(newItems)
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0)

      return calculateCartState(newItems)
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter(
        (item) => item.product.id !== action.payload
      )

      return calculateCartState(newItems)
    }

    case "UPDATE_QUANTITY": {
      const newItems = state.items
        .map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.product.stock)) }
            : item
        )
        .filter((item) => item.quantity > 0)

      return calculateCartState(newItems)
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 }

    case "LOAD_CART": {
      const safeItems = action.payload.filter(
        (item) => item.quantity > 0 && item.product?.id
      )

      return calculateCartState(safeItems)
    }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
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

  // 3. MODIFICACIÓN: Ahora acepta 'quantity' y lo pasa al dispatch
  const addItem = (product: Product, quantity: number) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: productId })
  }

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