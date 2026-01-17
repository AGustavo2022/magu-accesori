"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ShippingData } from "@/lib/types/order.types"

interface StepShippingProps {
  deliveryMethod: "delivery" | "pickup"
  shippingData: ShippingData
  errors: Record<string, string[]>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBack: () => void
  onNext: () => void
  setDeliveryMethod: (v: "delivery" | "pickup") => void
}

export function StepShipping({
  deliveryMethod,
  shippingData,
  errors,
  onChange,
  onBack,
  onNext,
  setDeliveryMethod,
}: StepShippingProps) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold uppercase text-center">
        Información de Entrega
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setDeliveryMethod("delivery")}
          className={`rounded-lg border p-4 ${
            deliveryMethod === "delivery"
              ? "border-primary bg-primary/5"
              : "border-muted"
          }`}
        >
          <p className="font-medium">Envío</p>
          <p className="text-sm text-muted-foreground">Llega a tu domicilio</p>
        </button>

        <button
          type="button"
          onClick={() => setDeliveryMethod("pickup")}
          className={`rounded-lg border p-4 ${
            deliveryMethod === "pickup"
              ? "border-primary bg-primary/5"
              : "border-muted"
          }`}
        >
          <p className="font-medium">Retiro</p>
          <p className="text-sm text-muted-foreground">Retirá por el local</p>
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Nombre</Label>
          <Input name="firstName" value={shippingData.firstName} onChange={onChange} />
          {errors["shipping.firstName"] && (
            <p className="text-sm text-red-500">{errors["shipping.firstName"][0]}</p>
          )}
        </div>

        <div>
          <Label>Apellido</Label>
          <Input name="lastName" value={shippingData.lastName} onChange={onChange} />
        </div>

        {deliveryMethod === "delivery" && (
          <div>
            <Label>Dirección</Label>
            <Input name="address" value={shippingData.address} onChange={onChange} />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Volver
        </Button>
        <Button className="flex-1" onClick={onNext}>
          Continuar al Pago
        </Button>
      </div>
    </>
  )
}
