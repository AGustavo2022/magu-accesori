
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

{/* LocalSidebar Crear un sidebar colapsable local "use client" (solo para la sección donde se usa) */}
{/* ProductsPanelClient crear el layout horizontal redimensionable de la sección*/}