"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown } from "lucide-react"
import Link from "next/link"

const categories = [
  {
    title: "Electrónicos",
    icon: "📱",
    subcategories: [
      { name: "Smartphones", slug: "smartphones", count: 45 },
      { name: "Laptops", slug: "laptops", count: 32 },
      { name: "Tablets", slug: "tablets", count: 18 },
      { name: "Auriculares", slug: "auriculares", count: 67 },
      { name: "Cámaras", slug: "camaras", count: 23 },
    ],
  },
  {
    title: "Ropa & Moda",
    icon: "👕",
    subcategories: [
      { name: "Camisetas", slug: "camisetas", count: 89 },
      { name: "Pantalones", slug: "pantalones", count: 56 },
      { name: "Chaquetas", slug: "chaquetas", count: 34 },
      { name: "Calzado", slug: "calzado", count: 78 },
      { name: "Accesorios", slug: "accesorios", count: 123 },
    ],
  },
  {
    title: "Deportes",
    icon: "⚽",
    subcategories: [
      { name: "Zapatillas", slug: "zapatillas", count: 67 },
      { name: "Ropa Deportiva", slug: "ropa-deportiva", count: 45 },
      { name: "Equipamiento", slug: "equipamiento", count: 89 },
      { name: "Suplementos", slug: "suplementos", count: 34 },
      { name: "Outdoor", slug: "outdoor", count: 56 },
    ],
  },
  {
    title: "Hogar",
    icon: "🏠",
    subcategories: [
      { name: "Muebles", slug: "muebles", count: 78 },
      { name: "Decoración", slug: "decoracion", count: 123 },
      { name: "Cocina", slug: "cocina", count: 67 },
      { name: "Iluminación", slug: "iluminacion", count: 45 },
      { name: "Jardín", slug: "jardin", count: 34 },
    ],
  },
  {
    title: "Belleza",
    icon: "💄",
    subcategories: [
      { name: "Maquillaje", slug: "maquillaje", count: 89 },
      { name: "Cuidado de la piel", slug: "cuidado-piel", count: 67 },
      { name: "Perfumes", slug: "perfumes", count: 45 },
      { name: "Cabello", slug: "cabello", count: 56 },
    ],
  },
]

export default function CategorySidebar() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleCategory = (categoryTitle: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryTitle) ? prev.filter((title) => title !== categoryTitle) : [...prev, categoryTitle],
    )
  }

  return (
    <div className="w-64 bg-white shadow-md rounded-lg p-4 h-fit sticky top-24">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b">Categorías</h2>

      <div className="space-y-2">
        {categories.map((category, index) => (
          <div key={index} className="border-b border-gray-100 last:border-b-0 pb-2 last:pb-0">
            <button
              onClick={() => toggleCategory(category.title)}
              className="flex items-center justify-between w-full py-2 px-3 text-left hover:bg-gray-50 rounded-md transition-colors duration-200"
            >
              <div className="flex items-center">
                <span className="text-lg mr-3">{category.icon}</span>
                <span className="font-medium text-gray-800">{category.title}</span>
              </div>
              {expandedCategories.includes(category.title) ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>

            {expandedCategories.includes(category.title) && (
              <div className="ml-6 mt-2 space-y-1">
                {category.subcategories.map((subcategory, subIndex) => (
                  <Link
                    key={subIndex}
                    href={`/categoria/${subcategory.slug}`}
                    className="flex items-center justify-between py-1 px-3 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                  >
                    <span>{subcategory.name}</span>
                    <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                      {subcategory.count}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Filtros adicionales */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Filtros rápidos</h3>
        <div className="space-y-2">
          <Link
            href="/ofertas"
            className="block py-2 px-3 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
          >
            🔥 Ofertas especiales
          </Link>
          <Link
            href="/nuevos"
            className="block py-2 px-3 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-md transition-colors duration-200"
          >
            ✨ Productos nuevos
          </Link>
          <Link
            href="/mas-vendidos"
            className="block py-2 px-3 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
          >
            ⭐ Más vendidos
          </Link>
        </div>
      </div>
    </div>
  )
}
