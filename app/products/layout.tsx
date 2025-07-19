
import CategorySidebar from "@/components/category-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (

    <ResizablePanelGroup
      direction="horizontal"
    >
      <ResizableHandle />

      <ResizablePanel defaultSize={20}>
        <div className="flex h-screen   p-6">
          <span className="font-semibold">
            <CategorySidebar/>

          </span>
        </div>
      </ResizablePanel>

      <ResizableHandle />

      <ResizablePanel defaultSize={80}>

        <ResizablePanel>
          <div >
            <span className="font-semibold">{children}</span>
          </div>
        </ResizablePanel>

      </ResizablePanel>
    </ResizablePanelGroup>
  );
}