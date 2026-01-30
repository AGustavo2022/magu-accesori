"use client"

import { ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { useSidebar } from "@/contexts/sidebar-context"


function CategoriesButton({
  icon,
  onClick,
}: {
  icon: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      variant="ghost"
      className="w-full flex items-center justify-between font-bold uppercase text-sm"
      onClick={onClick}
    >
      <span>Categorías</span>
      {icon}
    </Button>
  )
}

export default function LocalSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const { isOpen, open, close } = useSidebar()

  return (
    <>
      {!isOpen && (
        <div className="px-4 py-3">
          <CategoriesButton
            icon={<ChevronRight className="h-5 w-5" />}
            onClick={open}
          />
        </div>
      )}

      <div
        className={clsx(
          "absolute inset-0 z-20 bg-background transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 py-3">
          <CategoriesButton
            icon={<ChevronLeft className="h-5 w-5" />}
            onClick={close}
          />
        </div>

        <div className="p-4 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  )
}
