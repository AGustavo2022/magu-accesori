
import LocalSidebar from "@/components/local-sidebar"
import CategorySidebar from "@/components/category-sidebar"
import ProductsPanelClient from "./products-panel-client"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ProductsPanelClient
        sidebar={
          <LocalSidebar>
            <CategorySidebar />
          </LocalSidebar>
        }
      >
        {children}
      </ProductsPanelClient>
  )
}
