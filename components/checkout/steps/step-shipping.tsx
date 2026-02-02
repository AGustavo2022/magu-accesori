"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  shippingData: any
  deliveryMethod: "delivery" | "pickup"
  clientErrors: Record<string, string[]>
  state: any
  shippingPriceMap: {
    delivery: number
    pickup: number
  }
  onDeliveryChange: (method: "delivery" | "pickup") => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function StepShipping({
  shippingData,
  deliveryMethod,
  clientErrors,
  state,
  shippingPriceMap,
  onDeliveryChange,
  onChange,
}: Props) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold uppercase text-center">
        Información de Entrega
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => onDeliveryChange("delivery")}
          className={`rounded-lg border p-4 text-left transition
            ${deliveryMethod === "delivery"
              ? "border-primary bg-primary/5"
              : "border-muted"}`}
        >
          <p className="font-medium">Envío</p>
          <p className="text-sm text-muted-foreground">
            Llega a tu domicilio · ${shippingPriceMap.delivery}
          </p>
        </button>

        <button
          type="button"
          onClick={() => onDeliveryChange("pickup")}
          className={`rounded-lg border p-4 text-left transition
            ${deliveryMethod === "pickup"
              ? "border-primary bg-primary/5"
              : "border-muted"}`}
        >
          <p className="font-medium">Retiro</p>
          <p className="text-sm text-muted-foreground">
            Retirá por el local · ${shippingPriceMap.pickup}
          </p>
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label>Nombre</Label>
            <Input
              name="firstName"
              value={shippingData.firstName}
              onChange={onChange}
              placeholder="Ingresá tu nombre"
            />
            {(clientErrors["shipping.firstName"] ||
              state.errors?.["shipping.firstName"]) && (
              <p className="text-sm text-red-500">
                {clientErrors["shipping.firstName"]?.[0] ??
                  state.errors?.["shipping.firstName"]?.[0]}
              </p>
            )}
          </div>

          <div>
            <Label>Apellido</Label>
            <Input
              name="lastName"
              value={shippingData.lastName}
              onChange={onChange}
              placeholder="Ingresá tu apellido"
            />
            {(clientErrors["shipping.lastName"] ||
              state.errors?.["shipping.lastName"]) && (
              <p className="text-sm text-red-500">
                {clientErrors["shipping.lastName"]?.[0] ??
                  state.errors?.["shipping.lastName"]?.[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label>Email</Label>
          <Input
            name="email"
            value={shippingData.email}
            onChange={onChange}
            placeholder="Ingresá tu correo electrónico"
          />
          {(clientErrors["shipping.email"] ||
            state.errors?.["shipping.email"]) && (
            <p className="text-sm text-red-500">
              {clientErrors["shipping.email"]?.[0] ??
                state.errors?.["shipping.email"]?.[0]}
            </p>
          )}
        </div>

        <div>
          <Label>Teléfono</Label>
          <Input
            name="phone"
            value={shippingData.phone}
            onChange={onChange}
            placeholder="Ingresá tu teléfono (ej: 11 2345 6789)"
          />
          {(clientErrors["shipping.phone"] ||
            state.errors?.["shipping.phone"]) && (
            <p className="text-sm text-red-500">
              {clientErrors["shipping.phone"]?.[0] ??
                state.errors?.["shipping.phone"]?.[0]}
            </p>
          )}
        </div>

        {deliveryMethod === "delivery" && (
          <>
            <div>
              <Label>Dirección</Label>
              <Input
                name="address"
                value={shippingData.address}
                onChange={onChange}
                placeholder="Ingresá tu dirección (calle y número)"
              />
              {(clientErrors["shipping.address"] ||
                state.errors?.["shipping.address"]) && (
                <p className="text-sm text-red-500">
                  {clientErrors["shipping.address"]?.[0] ??
                    state.errors?.["shipping.address"]?.[0]}
                </p>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <Label>Ciudad</Label>
                <Input value={shippingData.city} disabled />
              </div>

              <div>
                <Label>Provincia</Label>
                <Input value={shippingData.province} disabled />
              </div>

              <div>
                <Label>Código Postal</Label>
                <Input value={shippingData.postal} disabled />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
