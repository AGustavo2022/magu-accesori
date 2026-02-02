"use client"

import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

type CheckoutFooterProps = {
  step: number
  subtotal?: number
  onBack: () => void
  onNext: () => void
  onSubmit?: () => void
}

export function CheckoutFooter({
  step,
  subtotal = 0,
  onBack,
  onNext,
  onSubmit,
}: CheckoutFooterProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-lg">
      <div className="mx-auto max-w-3xl px-4 py-4">

        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Subtotal</p>
              <p className="text-lg font-bold">
                {formatPrice(subtotal)}
              </p>
            </div>

            <Button className="w-1/2" onClick={onNext}>
              Continuar
            </Button>
          </div>
        )}

        {/* STEP 2 y 3 */}
        {(step === 2 || step === 3) && (
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onBack}
            >
              Volver
            </Button>

            <Button
              className="flex-1"
              onClick={onNext}
            >
              {step === 2 && "Continuar al Pago"}
              {step === 3 && "Ver Resumen"}
            </Button>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && onSubmit && (
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onBack}
            >
              Volver
            </Button>

            <Button
              className="flex-1"
              disabled={isPending}
              onClick={() => {
                startTransition(() => {
                  onSubmit()
                })
              }}
            >
              {isPending ? "Creando pedido..." : "Crear Pedido"}
            </Button>
            </div>
        )}

      </div>
    </div>
  )
}
