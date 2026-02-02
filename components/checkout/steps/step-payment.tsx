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
    </>
  )
}
