import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import "./globals.css"
import { GoogleMapsScript } from "./components/GoogleMapsScript"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Patient Referral Form",
  description: "A form for patient referrals",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <GoogleMapsScript />
      </body>
    </html>
  )
}

