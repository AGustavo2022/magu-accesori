"use client"

import React, { createContext, useContext, useEffect, useReducer } from "react"

import { AddItemPayload, CartItem, CartState } from "@/lib/types/cart.types"
import { cartReducer, initialCartState } from "./cart.reducer"

interface CartContextType extends CartState {
  addItem: (item: AddItemPayload) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  // 🔄 Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("shopping-cart")
    if (saved) {
      try {
        dispatch({
          type: "LOAD_CART",
          payload: JSON.parse(saved) as CartItem[],
        })
      } catch {
        localStorage.removeItem("shopping-cart")
      }
    }
  }, [])

  // 💾 Save to localStorage
  useEffect(() => {
    localStorage.setItem(
      "shopping-cart",
      JSON.stringify(state.items)
    )
  }, [state.items])

  const value: CartContextType = {
    ...state,

    addItem: (item) =>
      dispatch({
        type: "ADD_ITEM",
        payload:  item,
      }),

    removeItem: (productId) =>
      dispatch({
        type: "REMOVE_ITEM",
        payload: productId,
      }),

    updateQuantity: (productId, quantity) =>
      dispatch({
        type: "UPDATE_QUANTITY",
        payload: { productId, quantity },
      }),

    clearCart: () =>
      dispatch({ type: "CLEAR_CART" }),
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider")
  }
  return ctx
}
