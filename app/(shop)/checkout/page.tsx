

import { getShippingMethodsAll } from "@/lib/data/shipping.data";
import CheckoutClient from "../../../components/checkout/checkout-client";


export default async function CheckoutPage() {
  const shippingPrices = await getShippingMethodsAll()

  return (
    <CheckoutClient shippingPrices={shippingPrices} />
  )
}
