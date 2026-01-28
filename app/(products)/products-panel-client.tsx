"use client"

import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Suspense } from "react"
import { SkeletonProductsGrid } from "@/components/skeletons"

export default function ProductsPanelClient({
  sidebar,
  children,
}: {
  sidebar: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <ResizablePanelGroup direction="horizontal">

      {/* SIDEBAR */}
      <ResizablePanel
        defaultSize={18}
        minSize={12}
        maxSize={22}
        className="relative overflow-hidden"
      >
        {sidebar}
      </ResizablePanel>

      {/* PRODUCTOS */}
      <ResizablePanel defaultSize={82}>
        <Suspense fallback={<SkeletonProductsGrid />}>
          {children}
        </Suspense>
      </ResizablePanel>

    </ResizablePanelGroup>
  )
}
