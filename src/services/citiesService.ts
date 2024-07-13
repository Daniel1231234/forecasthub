import { ISuggestion } from "@/types"
import axios from "axios"
import { nanoid } from "nanoid"

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
          name: item.name.toLowerCase(),
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

export const getCitySuggestions = async (
  value: string
): Promise<ISuggestion[]> => {
  const geoUsername = import.meta.env.VITE_GEONAMES_USERNAME

  const response = await axios.get(
    `http://secure.geonames.org/searchJSON?name_startsWith=${value}&maxRows=10&username=${geoUsername}`
  )

  return response.data.geonames.map((city: any) => ({
    id: nanoid(),
    name: city.name,
    country: city.countryName,
  }))
}
