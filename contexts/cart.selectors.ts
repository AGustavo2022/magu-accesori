import { CartItem, ResolvedCartItem } from "@/lib/types/cart.types"


export function resolveCart(cartItems: CartItem[]) {
  const items: ResolvedCartItem[] = cartItems.map((item) => {
    const unitPrice = item.discount
      ? item.price * (1 - item.discount / 100)
      : item.price

    return {
      productId: item.productId,
      title: item.title,
      image_url: item.image_url,
      price: item.price,
      stock: item.stock,
      discount: item.discount,
      quantity: item.quantity,
      unitPrice,                    // ✅ ahora sí
      subtotal: unitPrice * item.quantity,
    }
  })

  const total = items.reduce(
    (sum, item) => sum + item.subtotal,
    0
  )

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  )

  return {
    items,
    total,
    itemCount,
  }
}
