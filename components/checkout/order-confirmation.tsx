import React from 'react'

export default function OrderConfirmation({ order }: { order: any }) {
  if (!order) return <div>Orden no encontrada.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-foreground p-3 text-background"><svg className="w-6 h-6"/></div>
        <div>
          <h2 className="text-xl font-bold">¡Pedido creado con éxito!</h2>
          <p className="text-sm text-muted-foreground">Número de pedido: <strong>{order.id}</strong></p>
        </div>
      </div>

      <section>
        <h3 className="font-semibold">Cliente</h3>
        <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">{JSON.stringify(order.shippingData, null, 2)}</pre>
      </section>

      <section>
        <h3 className="font-semibold">Método de pago</h3>
        <p className="mt-2">{order.paymentMethod}</p>
      </section>

      <section>
        <h3 className="font-semibold">Items</h3>
        <pre className="bg-gray-100 p-3 rounded mt-2 text-sm">{JSON.stringify(order.items, null, 2)}</pre>
      </section>
    </div>
  )
}