"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const steps = [
  { id: 1, name: "CARRITO" },
  { id: 2, name: "ENTREGA" },
  { id: 3, name: "PAGO" },
  { id: 4, name: "RESUMEN" },
]

interface CheckoutProgressProps {
  currentStep: number
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  return (
    <div className="w-full border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    currentStep > step.id
                      ? "border-foreground bg-foreground text-background"
                      : currentStep === step.id
                        ? "border-foreground bg-background text-foreground"
                        : "border-muted bg-background text-muted-foreground",
                  )}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <span
                  className={cn(
                    "hidden text-xs font-bold uppercase tracking-wider sm:block",
                    currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {step.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "mx-4 h-0.5 flex-1 transition-colors",
                    currentStep > step.id ? "bg-foreground" : "bg-muted",
                  )}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
