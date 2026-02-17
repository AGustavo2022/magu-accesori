"use client"

import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

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
          {children}
      </ResizablePanel>

    </ResizablePanelGroup>
  )
}
