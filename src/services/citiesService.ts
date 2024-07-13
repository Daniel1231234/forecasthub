import { ISuggestion } from "@/types"
import axios from "axios"
import { nanoid } from "nanoid"

export const getCitySuggestions = async (
  value: string
): Promise<ISuggestion[]> => {
  const geoUsername = import.meta.env.VITE_GEONAMES_USERNAME
  const BASE_URL = "https://secure.geonames.org/"

  const response = await axios.get(
    `${BASE_URL}searchJSON?name_startsWith=${value}&maxRows=10&username=${geoUsername}`
  )

  return response.data.geonames.map((city: any) => ({
    id: nanoid(),
    name: city.name,
    country: city.countryName,
  }))
}
