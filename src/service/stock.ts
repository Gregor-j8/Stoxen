import axios from "axios"
import { API_BASE_URL } from "@/lib/config"

export const GetStock = async (ticker: string) => {
  const response = await axios.get(`${API_BASE_URL}/stock/${ticker}`)
  return response.data
}