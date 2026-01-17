"use client"

import { Button } from "@/components/ui/button"
import PaymentPage from "@/components/checkout/payment-options"

interface StepPaymentProps {
  paymentMethod: any
  onSelect: (p: any) => void
  onBack: () => void
  onNext: () => void
}

export function StepPayment({
  paymentMethod,
  onSelect,
  onBack,
  onNext,
}: StepPaymentProps) {
  return (
    <>
      <h1 className="mb-6 text-2xl font-bold uppercase text-center">
        Método de Pago
      </h1>

      <PaymentPage
        selectedId={paymentMethod.id}
        onSelect={onSelect}
      />

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1" onClick={onBack}>
          Volver
        </Button>
        <Button className="flex-1" onClick={onNext}>
          Resumen
        </Button>
      </div>
    </>
  )
}
