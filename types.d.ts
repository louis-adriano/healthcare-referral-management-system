declare namespace google {
    namespace maps {
      namespace places {
        class AutocompleteService {
          getPlacePredictions(
            request: AutocompletionRequest,
            callback: (results: AutocompletePrediction[], status: PlacesServiceStatus) => void,
          ): void
        }
  
        interface AutocompletePrediction {
          description: string
          place_id: string
          structured_formatting: {
            main_text: string
            secondary_text: string
          }
        }
  
        interface AutocompletionRequest {
          input: string
          componentRestrictions?: { country: string }
          types?: string[]
        }
  
        enum PlacesServiceStatus {
          OK,
          ZERO_RESULTS,
          OVER_QUERY_LIMIT,
          REQUEST_DENIED,
          INVALID_REQUEST,
        }
      }
    }
  }
  
  