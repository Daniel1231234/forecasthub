import { useQuery } from "@tanstack/react-query"
import { getWeatherData } from "../services/weatherService"

export const useWeatherData = (city: string) => {
  return useQuery({
    queryKey: ["weatherData", city],
    queryFn: () => getWeatherData(city),
    refetchInterval: 60000 * 1,
    refetchOnWindowFocus: false,
  })
}
