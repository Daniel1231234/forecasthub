export const getCitiesFromStorage = (): string[] => {
  const storedCities = localStorage.getItem("cities")
  return storedCities ? JSON.parse(storedCities) : ["Tel Aviv"]
}

export const saveCitiesToStorage = (cities: string[]) => {
  localStorage.setItem("cities", JSON.stringify(cities))
}
