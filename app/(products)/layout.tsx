
import CategorySidebar from "@/components/category-sidebar";
import { RevenueChartSkeleton } from "@/components/skeletons";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <ResizablePanelGroup
      direction="horizontal"
    >
      <ResizablePanel defaultSize={20}>
        <div className="flex h-screen   p-6">
          <span className="font-semibold">
            <CategorySidebar/>

          </span>
        </div>
      </ResizablePanel>

      <ResizablePanel defaultSize={80}>

        <ResizablePanel>
          <div >
            <Suspense fallback={<RevenueChartSkeleton />}>
            <span className="font-semibold">{children}</span>
            </Suspense>
          </div>
        </ResizablePanel>

      </ResizablePanel>
    </ResizablePanelGroup>
  );
}