import CategorySidebar from "@/components/category-sidebar";
import Category from "@/components/products/category";


export const experimental_ppr = true;
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {/* Sidebar izquierda con categorías */}
        <aside className="hidden lg:block">
          <CategorySidebar />
        </aside>
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
    </div>
  );
}