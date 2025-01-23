"use client"

import Script from "next/script"
import { useEffect } from "react"

export function GoogleMapsScript() {
  useEffect(() => {
    console.log("GoogleMapsScript component mounted")
  }, [])

  return (
    <Script
      src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
      strategy="afterInteractive"
      onLoad={() => {
        console.log("Google Maps API script loaded")
        if (window.google && window.google.maps) {
          console.log("Google Maps object is available")
        } else {
          console.log("Google Maps object is not available")
        }
      }}
      onError={(e) => {
        console.error("Error loading Google Maps API script:", e)
      }}
    />
  )
}

