import { Product } from "@/lib/types/definitions"
import { useCart } from "@/contexts/cart.context"

export function useAddToCart(product: Product) {
  const { addItem, items } = useCart()

  const isInCart = items.some(
    (item) => item.productId === product.id
  )

  const add = (quantity: number) => {
    addItem(product.id, quantity)
  }

  return {
    add,
    isInCart,
  }
}
