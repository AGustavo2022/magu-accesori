

import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import React from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* HEADER */}
      <header className=" bg-background  py-2 border-b">
        <DashboardHeader />
      </header>

      {/* CONTENIDO */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}
