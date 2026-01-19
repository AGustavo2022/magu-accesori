// "use client"

// import React, { useEffect, useState } from "react"
// import { useFormState } from "react-dom"
// import { CheckoutProgress } from "@/components/checkout/checkout-progress"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { createOrder } from "@/lib/actions/order.actions"
// import { shippingSchema } from "@/lib/schemas/order.schema"
// import { useRouter } from "next/navigation"
// import { CreateOrderState, ShippingData } from "@/lib/types/order.types"
// import { useCart } from "@/contexts/cart.context"
// import { resolveCart } from "@/contexts/cart.selectors"
// import { StepCart } from "@/components/checkout/steps/step-cart"
// import { StepPayment } from "@/components/checkout/steps/step-payment"
// import { StepSummary } from "@/components/checkout/steps/step-summary"

// const initialState: CreateOrderState = {
//   success: false,
//   errors: {},
// }

// type DeliveryMethod = "pickup" | "delivery"

// const SHIPPING_PRICE = 5000
// const PICKUP_PRICE = 0 // o el precio que quieras

// function calculateShippingCost(
//   deliveryMethod: DeliveryMethod
// ): number {
//   return deliveryMethod === "delivery"
//     ? SHIPPING_PRICE
//     : PICKUP_PRICE
// }

// export default function CheckoutPage() {
  
//   const router = useRouter()
//   const { items } = useCart()
//   const { items: resolvedItems, totalProductsCart, itemCount } = resolveCart(items)

//   const [currentStep, setCurrentStep] = useState(1)
//   const [deliveryMethod, setDeliveryMethod] =useState<DeliveryMethod>("delivery")

//   const [paymentMethod, setpaymentMethod] = useState({ id: "Transferencia", title: "Transferencia Bancaria (CBU/Alias)", })
//   const [shippingData, setShippingData] = useState<ShippingData>({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "Rio Grande",
//     province: "Tierra del Fuego",
//     postal: "9420",
//   })

//   const [state, formAction] = useFormState(createOrder, initialState)
//   const [clientErrors, setClientErrors] = useState<Record<string, string[]>>({})

//   useEffect(() => {
//     setShippingData(prev => {
//       if (deliveryMethod === "pickup") {
//         return {
//           ...prev,
//           address: "Retiro del local",
//         }
//       }
//       return {
//         ...prev,
//         address: "",
//       }
//     })
//   }, [deliveryMethod])

//   useEffect(() => {
//     if (state.success && state.order) {
//       router.replace(`/order/${state.order.order_number}`)
//     }
//   }, [state.success, state.order, router])


//   const handleShippingChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value } = e.target

//     setShippingData(prev => ({
//       ...prev,
//       [name]: value,
//     }))

//     setClientErrors(prev => {
//       const copy = { ...prev }
//       delete copy[`shipping.${name}`]
//       return copy
//     })
//   }

//   const shipping_cost = calculateShippingCost(deliveryMethod)
//   const total_cost = totalProductsCart + shipping_cost

//   // const validateShippingAndContinue = () => {
//   //   const result = shippingSchema.safeParse(shippingData)

//   //   if (!result.success) {
//   //     const errors: Record<string, string[]> = {}

//   //     result.error.issues.forEach(issue => {
//   //       const key = `shipping.${issue.path.join(".")}`
//   //       if (!errors[key]) errors[key] = []
//   //       errors[key].push(issue.message)
//   //     })

//   //     setClientErrors(errors)
//   //     return
//   //   }

//   //   setClientErrors({})
//   //   setCurrentStep(3)
//   // }

//   return (
//     <div className="min-h-screen bg-background">
//       <CheckoutProgress currentStep={currentStep} />

//       <div className="mx-auto max-w-7xl px-4 py-8">
//         {/* CONTENIDO CENTRADO */}
//         <div className="mx-auto max-w-3xl space-y-8">

//           {/* STEP 1 */}

//           {currentStep === 1 && (
//             <StepCart
//               items={resolvedItems}
//               total={totalProductsCart}
//               onNext={() => setCurrentStep(2)}
//             />
//           )}

//           {/* STEP 2 */}

//           {currentStep === 2 && (
//             <>

          
//               <h1 className="mb-6 text-2xl font-bold uppercase text-center">
//                 Información de Entrega
//               </h1>

//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   type="button"
//                   onClick={() => setDeliveryMethod("delivery")}
//                   className={`rounded-lg border p-4 text-left transition
//                       ${deliveryMethod === "delivery"
//                       ? "border-primary bg-primary/5"
//                       : "border-muted"}
//                         `}
//                 >
//                   <p className="font-medium">Envío</p>
//                   <p className="text-sm text-muted-foreground">
//                     Llega a tu domicilio
//                   </p>
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => setDeliveryMethod("pickup")}
//                   className={`rounded-lg border p-4 text-left transition
//                       ${deliveryMethod === "pickup"
//                       ? "border-primary bg-primary/5"
//                       : "border-muted"}
//                     `}
//                 >
//                   <p className="font-medium">Retiro</p>
//                   <p className="text-sm text-muted-foreground">
//                     Retirá por el local
//                   </p>
//                 </button>
//               </div>

//               <div className="space-y-6">
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div>
//                     <Label>Nombre</Label>
//                     <Input
//                       name="firstName"
//                       value={shippingData.firstName}
//                       onChange={handleShippingChange}
//                       placeholder="Ingresá tu nombre"
//                     />
//                     {(clientErrors["shipping.firstName"] ||
//                       state.errors?.["shipping.firstName"]) && (
//                         <p className="text-sm text-red-500">
//                           {clientErrors["shipping.firstName"]?.[0] ??
//                             state.errors?.["shipping.firstName"]?.[0]}
//                         </p>
//                       )}
//                   </div>

//                   <div>
//                     <Label>Apellido</Label>
//                     <Input
//                       name="lastName"
//                       value={shippingData.lastName}
//                       onChange={handleShippingChange}
//                       placeholder="Ingresá tu apellido"
//                     />
//                     {(clientErrors["shipping.lastName"] ||
//                       state.errors?.["shipping.lastName"]) && (
//                         <p className="text-sm text-red-500">
//                           {clientErrors["shipping.lastName"]?.[0] ??
//                             state.errors?.["shipping.lastName"]?.[0]}
//                         </p>
//                       )}
//                   </div>
//                 </div>

//                 <div>
//                   <Label>Email</Label>
//                   <Input
//                     name="email"
//                     value={shippingData.email}
//                     onChange={handleShippingChange}
//                     placeholder="Ingresá tu correo electrónico"
//                   />
//                   {(clientErrors["shipping.email"] ||
//                     state.errors?.["shipping.email"]) && (
//                       <p className="text-sm text-red-500">
//                         {clientErrors["shipping.email"]?.[0] ??
//                           state.errors?.["shipping.email"]?.[0]}
//                       </p>
//                     )}
//                 </div>

//                 <div>
//                   <Label>Teléfono</Label>
//                   <Input
//                     name="phone"
//                     value={shippingData.phone}
//                     onChange={handleShippingChange}
//                     placeholder="Ingresá tu teléfono (ej: 11 2345 6789)"
//                   />
//                   {(clientErrors["shipping.phone"] ||
//                     state.errors?.["shipping.phone"]) && (
//                       <p className="text-sm text-red-500">
//                         {clientErrors["shipping.phone"]?.[0] ??
//                           state.errors?.["shipping.phone"]?.[0]}
//                       </p>
//                     )}
//                 </div>

//                 {deliveryMethod === "delivery" && (
//                   <>
//                     <div>
//                       <Label>Dirección</Label>
//                       <Input
//                         name="address"
//                         value={shippingData.address}
//                         onChange={handleShippingChange}
//                         placeholder="Ingresá tu dirección (calle y número)"
//                       />
//                       {(clientErrors["shipping.address"] ||
//                         state.errors?.["shipping.address"]) && (
//                           <p className="text-sm text-red-500">
//                             {clientErrors["shipping.address"]?.[0] ??
//                               state.errors?.["shipping.address"]?.[0]}
//                           </p>
//                         )}
//                     </div>

//                     <div className="grid gap-4 sm:grid-cols-3">
//                       <div>
//                         <Label>Ciudad</Label>
//                         <Input value={shippingData.city} disabled />
//                       </div>

//                       <div>
//                         <Label>Provincia</Label>
//                         <Input value={shippingData.province} disabled />
//                       </div>

//                       <div>
//                         <Label>Código Postal</Label>
//                         <Input value={shippingData.postal} disabled />
//                       </div>
//                     </div>
//                   </>
//                 )}

//                 <div className="flex gap-4">
//                   <Button
//                     variant="outline"
//                     className="flex-1"
//                     onClick={() => setCurrentStep(1)}
//                   >
//                     Volver
//                   </Button>

//                   <Button
//                     className="flex-1"
//                     onClick={() => {
//                       const result = shippingSchema.safeParse(shippingData)

//                       if (!result.success) {
//                         const errors: Record<string, string[]> = {}

//                         result.error.issues.forEach(issue => {
//                           const key = `shipping.${issue.path.join(".")}`
//                           if (!errors[key]) errors[key] = []
//                           errors[key].push(issue.message)
//                         })

//                         setClientErrors(errors)
//                         return
//                       }

//                       setClientErrors({})
//                       setCurrentStep(3)
//                     }}
//                   >
//                     Continuar al Pago
//                   </Button>
//                 </div>
//               </div> 
//             </>
//           )}
//           {/* STEP 3 */}
//           {currentStep === 3 && (
//               <StepPayment
//                 paymentMethod={paymentMethod}
//                 onSelect={setpaymentMethod}
//                 onBack={() => setCurrentStep(2)}
//                 onNext={() => setCurrentStep(4)}
//               />
//           )}
//           {/* STEP 4 · RESUMEN */}
//           {currentStep === 4 && (
//             <>
//               <StepSummary
//                 items={resolvedItems}
//                 itemCount={itemCount}
//                 shippingData={shippingData}
//                 paymentMethod={paymentMethod}
//                 subtotal={totalProductsCart}
//                 shippingCost={shipping_cost}
//                 total={total_cost}
//                 onBack={() => setCurrentStep(3)}
//               />

//               <form action={formAction} className="space-y-6">

//                 {/* Hidden inputs */}
//                 <input
//                   type="hidden"
//                   name="items"
//                   value={JSON.stringify(
//                     items.map(i => ({
//                       productId: i.productId,
//                       quantity: i.quantity,
//                     }))
//                   )}
//                 />

//                 <input type="hidden" name="paymentMethod" value={paymentMethod.title} />

//                 <input type="hidden" name="shipping_firstName" value={shippingData.firstName} />
//                 <input type="hidden" name="shipping_lastName" value={shippingData.lastName} />
//                 <input type="hidden" name="shipping_email" value={shippingData.email} />
//                 <input type="hidden" name="shipping_phone" value={shippingData.phone} />
//                 <input type="hidden" name="shipping_address" value={shippingData.address} />
//                 <input type="hidden" name="shipping_city" value={shippingData.city} />
//                 <input type="hidden" name="shipping_province" value={shippingData.province} />
//                 <input type="hidden" name="shipping_postal" value={shippingData.postal} />

//                 <div className="mt-8 flex gap-4">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     className="flex-1"
//                     onClick={() => setCurrentStep(3)}
//                   >
//                     Volver
//                   </Button>

//                   <Button type="submit" className="flex-1">
//                     Crear Pedido
//                   </Button>
//                 </div>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
