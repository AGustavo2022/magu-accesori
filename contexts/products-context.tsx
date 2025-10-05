"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  stock: number
  category: string
  createdAt: Date
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id" | "createdAt">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProduct: (id: string) => Product | undefined
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

// Sample initial products
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Mochila Premium para Laptop",
    description:
      "Mochila resistente al agua con compartimento acolchado para laptop de hasta 15.6 pulgadas. Incluye múltiples bolsillos organizadores y correas ajustables.",
    price: 89.99,
    image_url: "",
    stock: 25,
    category: "Accesorios",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "Auriculares Inalámbricos Pro",
    description: "Auriculares con cancelación de ruido activa, batería de 30 horas y sonido de alta fidelidad.",
    price: 149.99,
    image_url: "/wireless-headphones.png",
    stock: 15,
    category: "Audio",
    createdAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    name: "Funda Protectora Ultra",
    description: "Funda resistente a caídas con protección militar y soporte magnético integrado.",
    price: 24.99,
    image_url: "/stylish-smartphone-case.png",
    stock: 50,
    category: "Accesorios",
    createdAt: new Date("2024-01-25"),
  },
]

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const addProduct = (productData: Omit<Product, "id" | "createdAt">) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, ...updates } : product)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const getProduct = (id: string) => {
    return products.find((product) => product.id === id)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
