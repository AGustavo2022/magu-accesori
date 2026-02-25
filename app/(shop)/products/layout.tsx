
import { ReactNode } from "react"
import { getCategoryAll } from "@/lib/data/categories.data"
import CategorySidebar from "@/components/products/category-sidebar"
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import LocalSidebar from "./_components/products-sidebar-client"
import { SidebarProvider } from "@/contexts/sidebar-context"

export const dynamic = "force-dynamic"

interface ProductsLayoutProps {
  children: ReactNode
}

export default async function ProductsLayout({
  children,
}: ProductsLayoutProps) {

  const categories = await getCategoryAll()

return (
  <SidebarProvider>
    <div className="mx-auto max-w-7xl px-4">
      <ResizablePanelGroup direction="horizontal" className="min-h-screen">

        <ResizablePanel
          defaultSize={18}
        //   minSize={14}
        //   maxSize={25}
          className="relative bg-white "
        >
          <LocalSidebar>
            <CategorySidebar categories={categories} />
          </LocalSidebar>
        </ResizablePanel>

        <ResizablePanel defaultSize={82}>
          {children}
        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  </SidebarProvider>
)
}