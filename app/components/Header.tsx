"use client"

import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NotificationsPopover } from "./NotificationsPopover"
import { LogoutButton } from "./LogoutButton"
import { useSession } from "next-auth/react"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white border-b">
      <div className="flex h-16 items-center px-6">
        <h1 className="text-2xl font-bold text-gray-800">Healthcare Referral Management System</h1>
        <div className="ml-auto flex items-center space-x-4">
          <NotificationsPopover />
          {session ? (
            <>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User profile</span>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <Button variant="ghost" size="sm" asChild>
              <a href="/login">Log in</a>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}

