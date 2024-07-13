import { ISuggestion } from "@/types"
import axios from "axios"
import { nanoid } from "nanoid"

export const getCitySuggestions = async (
  value: string
): Promise<ISuggestion[]> => {
  const geoUsername = import.meta.env.VITE_GEONAMES_USERNAME

  const response = await axios.get(
    `http://api.geonames.org/searchJSON?name_startsWith=${value}&maxRows=10&username=${geoUsername}`
  )

  return response.data.geonames.map((city: any) => ({
    id: nanoid(),
    name: city.name,
    country: city.countryName,
  }))
}
