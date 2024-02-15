/* import axios, { AxiosResponse } from 'axios'

type DateAndNames = (
  nap: string
) => Promise<AxiosResponse<any> | 'nincs adat'>

const date = 

export const dateAndNames: DateAndNames = async nap => {
  try {
    const response = await axios.get(
      `https://api.nevnapok.eu/nap/${nap}`
    )

    if (response.data) {
      return response
    } else {
      return 'nincs adat'
    }
  } catch (error) {
    console.error('Hiba történt az API hívás során:', error)
    return 'nincs adat'
  }
} */
