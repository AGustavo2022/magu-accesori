import { CartAction, CartState, CartItem } from "@/lib/types/cart.types"

export const initialCartState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
}

export function cartReducer(
  state: CartState,
  action: CartAction
): CartState {
  switch (action.type) {

    case "ADD_ITEM": {
      const item = action.payload // ✅ CartItem completo

      const existing = state.items.find(
        (i) => i.productId === item.productId
      )

      let items: CartItem[]

      if (existing) {
        items = state.items.map((i) =>
          i.productId === item.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      } else {
        items = [...state.items, item] // ✅ se guarda completo
      }

      return {
        ...state,
        items,
      }
    }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.productId === action.payload.productId
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0),
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.payload
        ),
      }

    case "CLEAR_CART":
      return initialCartState

    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
      }

    default:
      return state
  }
}
