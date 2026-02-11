"use client"

import { signOutAction } from "@/lib/actions/auth.actions"
import { Button } from "../ui/button"
import { PowerIcon } from "lucide-react"


export function SignOutButton() {
  return (
    <form action={signOutAction}>
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
  )
}
