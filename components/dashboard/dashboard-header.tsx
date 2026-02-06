

import { Plus } from "lucide-react"
import { NavLink } from "../navLink"
import { FileChartColumn } from "lucide-react"
import { signOut } from "@/auth"
import { Button } from "../ui/button"
import { PowerIcon } from "lucide-react"

export function DashboardHeader() {

  return (


    <div className="space-y-6">

      <div className="flex items-center justify-end">

        <div className="flex items-start gap-3">

          <NavLink 
              href="/dashboard" 
              label="Ir a Dashboard" 
              icon="dashboard"
            />

          <NavLink 
              href="/dashboard/add"
              label="Agregar Producto" 
              icon= "add"
            />

          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <Button
              type="submit"
              variant="outline"
              className="w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 hover:bg-gray-100"
            >
              <PowerIcon className="w-6" />
              <span className="text-xs leading-tight">
                Sign<br />Out
              </span>
            </Button>
          </form>
          
        </div >
      </div>
    </div>
  )
}
