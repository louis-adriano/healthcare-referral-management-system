import { useState, useCallback } from "react"

export function usePredictiveAddress() {
  const [address, setAddress] = useState("")
  const [predictions, setPredictions] = useState<string[]>([])

  const handleAddressChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setAddress(value)

    // Simulate API call for address predictions
    if (value.length > 3) {
      setPredictions([`${value}, New York, NY`, `${value}, Los Angeles, CA`, `${value}, Chicago, IL`])
    } else {
      setPredictions([])
    }
  }, [])

  const handlePredictionSelect = useCallback((prediction: string) => {
    setAddress(prediction)
    setPredictions([])
  }, [])

  return { address, predictions, handleAddressChange, handlePredictionSelect }
}

