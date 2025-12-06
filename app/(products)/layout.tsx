
import CategorySidebar from "@/components/products/category-sidebar";
import { SkeletonProductsGrid } from "@/components/skeletons";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

<ResizablePanelGroup direction="horizontal">

  <ResizablePanel defaultSize={18}>
    <CategorySidebar />
  </ResizablePanel>

  <ResizablePanel defaultSize={82}>
    <div>
      <Suspense fallback={<SkeletonProductsGrid />}>
        {children}
      </Suspense>
    </div>
  </ResizablePanel>

</ResizablePanelGroup>
  );
}