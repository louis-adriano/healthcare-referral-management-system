import { useState, useEffect, useCallback } from "react"

export function usePredictiveAddress() {
  const [address, setAddress] = useState("")
  const [predictions, setPredictions] = useState<google.maps.places.AutocompletePrediction[]>([])
  const [autocompleteService, setAutocompleteService] = useState<google.maps.places.AutocompleteService | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadAutocompleteService = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          console.log("Google Maps API loaded, setting up AutocompleteService")
          setAutocompleteService(new window.google.maps.places.AutocompleteService())
        } else {
          console.log("Google Maps API not yet available, retrying in 1 second")
          setTimeout(loadAutocompleteService, 1000)
        }
      }
      loadAutocompleteService()
    }
  }, [])

  const handleAddressChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setAddress(value)
      console.log("Address changed:", value)

      if (value.length > 2 && autocompleteService) {
        console.log("Fetching predictions for:", value)
        autocompleteService.getPlacePredictions(
          {
            input: value,
            componentRestrictions: { country: "au" },
            types: ["address"],
          },
          (predictions, status) => {
            console.log("Prediction status:", status)
            if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
              console.log("Predictions received:", predictions)
              setPredictions(predictions)
            } else {
              console.log("No predictions or error:", status)
              setPredictions([])
            }
          },
        )
      } else {
        console.log("Not fetching predictions: value length <=2 or no autocompleteService")
        setPredictions([])
      }
    },
    [autocompleteService],
  )

  const handlePredictionSelect = useCallback((prediction: google.maps.places.AutocompletePrediction) => {
    console.log("Prediction selected:", prediction)
    setAddress(prediction.description)
    setPredictions([])
  }, [])

  return { address, predictions, handleAddressChange, handlePredictionSelect }
}

