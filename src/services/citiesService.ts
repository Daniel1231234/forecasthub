import { ISuggestion } from "@/types"
import axios from "axios"

export const fetchCities = async (query: string): Promise<ISuggestion[]> => {
  if (!query) return []
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY
  const BASE_URL = "https://api.openweathermap.org/data/2.5"

  const url = `${BASE_URL}/find?q=${query}&type=like&cnt=10&appid=${apiKey}`
  try {
    const response = await axios.get(url)

    if (response.data && response.data.list.length > 0) {
      return response.data.list.map((item: any) => {
        return {
          id: item.id,
          name: item.name,
          country: item.sys.country,
        }
      })
    }

    return []
  } catch (error) {
    console.error("Error fetching cities:", error)
    return []
  }
}
