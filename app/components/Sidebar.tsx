"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const links = [
    { href: "/", icon: Home, label: "Dashboard" },
    { href: "/referrals", icon: FileText, label: "Referrals" },
  ]

  return (
    <aside className="bg-gray-900 w-64 min-h-screen flex flex-col">
      <div className="flex-1 py-6">
        <nav className="space-y-1 px-2">
          {links.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md",
                pathname === href ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}

