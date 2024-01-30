import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
})

const fetcher = async (url: string): Promise<any> =>
  axiosInstance.get(url).then((res) => res.data)

export default fetcher
