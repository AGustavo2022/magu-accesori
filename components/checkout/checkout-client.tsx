"use client"

import React, { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { useRouter } from "next/navigation"

import { CheckoutProgress } from "@/components/checkout/checkout-progress"
import { StepCart } from "@/components/checkout/steps/step-cart"
import { StepPayment } from "@/components/checkout/steps/step-payment"
import { StepSummary } from "@/components/checkout/steps/step-summary"
import { StepShipping } from "./steps/step-shipping"
import { CheckoutFooter } from "./checkout-footer"

import { createOrder } from "@/lib/actions/order.actions"
import { shippingSchema } from "@/lib/schemas/order.schema"
import { CreateOrderState, ShippingData } from "@/lib/types/order.types"

import { useCart } from "@/contexts/cart.context"
import { resolveCart } from "@/contexts/cart.selectors"

/* ---------------- TYPES ---------------- */

type DeliveryMethod = "delivery" | "pickup"

type ShippingMethod = {
  code: DeliveryMethod
  name: string
  price: number
}

type ShippingPrices = {
  delivery: number
  pickup: number
}

const initialState: CreateOrderState = {
  success: false,
  errors: {},
}

/* ---------------- COMPONENT ---------------- */

export default function CheckoutClient({
  shippingPrices,
}: {
  shippingPrices: ShippingMethod[]
}) {
  const router = useRouter()
  const { items } = useCart()
  const { items: resolvedItems, totalProductsCart, itemCount } = resolveCart(items)

  
  const [currentStep, setCurrentStep] = useState(1)
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery")

  const [paymentMethod, setPaymentMethod] = useState({
      id: "Transferencia",
      title: "Transferencia Bancaria (CBU/Alias)",
    })

  const [shippingData, setShippingData] = useState<ShippingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Rio Grande",
    province: "Tierra del Fuego",
    postal: "9420",
  })

  const [state, formAction] = useFormState(createOrder, initialState)
  const [clientErrors, setClientErrors] =
    useState<Record<string, string[]>>({})

  /* ---------------- REDIRECT ---------------- */

  useEffect(() => {
    if (state.success && state.order) {
      router.replace(`/order/${state.order.order_number}`)
    }
  }, [state, router])

  useEffect(() => {
  setShippingData(prev => ({
    ...prev,
    address:
      deliveryMethod === "pickup"
        ? "Retiro del local"
        : prev.address,
  }))
}, [deliveryMethod])
  /* ---------------- SHIPPING CHANGE ---------------- */

  const handleDeliveryChange = (method: "delivery" | "pickup") => {
  setDeliveryMethod(method)

  if (method === "pickup") {
    setShippingData(prev => ({
      ...prev,
      address: "",
    }))
  }

  if (method === "delivery") {
    setShippingData(prev => ({
      ...prev,
      address: "",
    }))
  }
}

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target

    setShippingData(prev => ({
      ...prev,
      [name]: value,
    }))

    setClientErrors(prev => {
      const copy = { ...prev }
      delete copy[`shipping.${name}`]
      return copy
    })
  }

  /* ---------------- SHIPPING PRICES ---------------- */

  const shippingPriceMap: ShippingPrices = shippingPrices.reduce(
    (acc: ShippingPrices, method: ShippingMethod) => {
      acc[method.code] = method.price
      return acc
    },
    { delivery: 0, pickup: 0 }
  )

  const shippingCost =
    deliveryMethod === "delivery"
      ? shippingPriceMap.delivery
      : shippingPriceMap.pickup

  /* ---------------- STEP 2 VALIDATION ---------------- */

  const handleStep2Next = () => {
    const result = shippingSchema.safeParse(shippingData)

    if (!result.success) {
      const errors: Record<string, string[]> = {}

      result.error.issues.forEach(issue => {
        const key = `shipping.${issue.path.join(".")}`
        if (!errors[key]) errors[key] = []
        errors[key].push(issue.message)
      })

      setClientErrors(errors)
      return
    }

    setClientErrors({})
    setCurrentStep(3)
  }

  /* ---------------- FOOTER NAV ---------------- */

  const handleNext = () => {
    if (currentStep === 1) setCurrentStep(2)
    if (currentStep === 2) handleStep2Next()
    if (currentStep === 3) setCurrentStep(4)
  }

  const handleBack = () => {
    if (currentStep === 2) setCurrentStep(1)
    if (currentStep === 3) setCurrentStep(2)
    if (currentStep === 4) setCurrentStep(3)
  }

  /* ---------------- RENDER ---------------- */
  return (
    <div className="min-h-screen bg-background pb-32">
      <CheckoutProgress currentStep={currentStep} />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-8">

          {/* STEP 1 */}
          {currentStep === 1 && (
            <StepCart
              items={resolvedItems}
              total={totalProductsCart}
              onNext={handleNext}
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <StepShipping
              shippingData={shippingData}
              deliveryMethod={deliveryMethod}
              clientErrors={clientErrors}
              state={state}
              shippingPriceMap={shippingPriceMap}
              onDeliveryChange={handleDeliveryChange}
              onChange={handleShippingChange}
            />
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <StepPayment
              paymentMethod={paymentMethod}
              onSelect={setPaymentMethod}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <form action={formAction} className="space-y-6">

              <StepSummary
                items={resolvedItems}
                itemCount={itemCount}
                shippingData={shippingData}
                paymentMethod={paymentMethod}
                subtotal={totalProductsCart}
                shippingCost={shippingCost}
                total={totalProductsCart + Number(shippingCost)}
                onBack={handleBack}
              />

              {/* ITEMS */}
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(
                  items.map(i => ({
                    productId: i.productId,
                    quantity: i.quantity,
                  }))
                )}
              />

              {/* PAYMENT */}
              <input
                type="hidden"
                name="paymentMethod"
                value={paymentMethod.id}
              />

              {/* SHIPPING METHOD */}
              <input
                type="hidden"
                name="shipping_method"
                value={deliveryMethod}
              />

              {/* SHIPPING DATA */}
              <input type="hidden" name="shipping_firstName" value={shippingData.firstName} />
              <input type="hidden" name="shipping_lastName" value={shippingData.lastName} />
              <input type="hidden" name="shipping_email" value={shippingData.email} />
              <input type="hidden" name="shipping_phone" value={shippingData.phone} />
              <input type="hidden" name="shipping_address" value={shippingData.address} />
              <input type="hidden" name="shipping_city" value={shippingData.city} />
              <input type="hidden" name="shipping_province" value={shippingData.province} />
              <input type="hidden" name="shipping_postal" value={shippingData.postal} />
            </form>
          )}

        </div>
      </div>

      <CheckoutFooter
        step={currentStep}
        subtotal={totalProductsCart}
        onBack={handleBack}
        onNext={handleNext}
        onSubmit={() => {
          const form = document.querySelector("form")
          form?.requestSubmit()
        }}
      />
    </div>
  )
}
