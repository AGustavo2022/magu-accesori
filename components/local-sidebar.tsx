"use client"

import { ChevronRight, ChevronLeft, Boxes, FolderInput, Folders, ListCollapse, LayoutPanelTop} from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import { useSidebar } from "@/contexts/sidebar-context"
import { LayoutGrid } from "lucide-react"

function CategoriesButton({
  label,
  leftIcon,
  rightIcon,
  onClick,
}: {
  label?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick: () => void
}) {
  return (
    <Button
      variant="ghost"
      className="w-full h-16 flex items-center justify-start text-base"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {leftIcon}
        {label && <span>{label}</span>}
      </div>

      {rightIcon}
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
      {/* BOTÓN CERRADO */}
      {!isOpen && (
        <div className="px-4 py-3">
          <CategoriesButton
            leftIcon={<LayoutGrid size={32} />}
            rightIcon={<ChevronRight size={32} />}
            onClick={open}
          />
        </div>
      )}

      {/* SIDEBAR */}
      <div
        className={clsx(
          "absolute inset-0 z-20 bg-background transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="px-4 py-3">
          <CategoriesButton
            label="Categorías"
            rightIcon={<ChevronLeft className="h-5 w-5" />}
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
