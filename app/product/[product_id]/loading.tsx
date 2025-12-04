import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-80">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
    </div>
  )
}