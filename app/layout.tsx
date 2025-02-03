import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import Footer from "./components/Footer"
import { GoogleMapsScript } from "./components/GoogleMapsScript"
import { NotificationsProvider } from "./context/notifications-context"
import type React from "react"

const geist = Geist({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Healthcare Referral Management System",
  description: "A system for managing patient referrals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body className="flex h-screen flex-col">
        <NotificationsProvider>
          <div className="flex h-full">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main className="flex-1 overflow-y-auto bg-gray-200">{children}</main>
              <Footer />
            </div>
          </div>
        </NotificationsProvider>
        <GoogleMapsScript />
      </body>
    </html>
  )
}

