interface OrderSummaryProps {
  subtotal: number
  shipping: number
}

export function OrderSummary({ subtotal, shipping }: OrderSummaryProps) {
  const total = subtotal + shipping

  return (
    <div className="space-y-4 border-t pt-6">
      <div className="flex justify-between text-sm">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm">
        <span>Envío</span>
        <span>{shipping === 0 ? "GRATIS" : `$${shipping.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between border-t pt-4 text-base font-bold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  )
}
