"use client"

import React from "react"
import { CheckCircle2, ArchiveX, Ban } from "lucide-react"

/* -----------------------------
   TYPES
----------------------------- */

export interface FilterOptionItem {
  id: "active" | "out-of-stock" | "inactive"
  title: string
  description: string
  icon: React.ElementType
}

/* -----------------------------
   OPTIONS
----------------------------- */

export const filterOptions: FilterOptionItem[] = [
  {
    id: "active",
    title: "Productos Activos",
    description: "Productos activos del inventario.",
    icon: CheckCircle2,
  },
  {
    id: "out-of-stock",
    title: "Sin Stock",
    description: "Productos activos sin stock disponible.",
    icon: ArchiveX,
  },
  {
    id: "inactive",
    title: "Productos Inactivos",
    description: "Productos deshabilitados del inventario.",
    icon: Ban,
  },
]

/* -----------------------------
   CARD COMPONENT
----------------------------- */

export function FilterOptionCard({
  item,
  selected,
  onSelect,
}: {
  item: FilterOptionItem
  selected: boolean
  onSelect: () => void
}) {
  const Icon = item.icon

  return (
    <div
      onClick={onSelect}
      className={`flex items-start gap-4 rounded-xl border p-5 cursor-pointer transition-all duration-300 shadow-sm
        ${
          selected
            ? "border-blue-600 ring-2 ring-blue-500 bg-blue-50/60 dark:bg-blue-900/40"
            : "border-gray-300 hover:border-blue-400 dark:border-gray-700 dark:hover:border-blue-600"
        }`}
    >
      <Icon
        className={`h-6 w-6 mt-1 ${
          selected
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-500"
        }`}
      />

      <div className="flex-1 space-y-1">
        <p className="text-lg font-semibold">{item.title}</p>
        <p className="text-sm text-muted-foreground">
          {item.description}
        </p>
      </div>

      <div className="mt-1">
        <div
          className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
            selected ? "border-blue-600" : "border-gray-400"
          }`}
        >
          {selected && (
            <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          )}
        </div>
      </div>
    </div>
  )
}
