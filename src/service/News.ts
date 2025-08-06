import axios from "axios"
import { API_BASE_URL } from "@/lib/config"

export const GetNews = async () => {
  const response = await axios.get(`${API_BASE_URL}/news/get_news`)
  return response.data
}