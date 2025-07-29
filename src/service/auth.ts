import axios from "axios"
import { API_BASE_URL } from "@/lib/config"

export const registerUser = async (data: { username: string; email: string; full_name: string; password: string}) => {
  const response = await axios.post(`${API_BASE_URL}/auth/register`, data)
  return response.data
}

export const loginUser = async (data: { username: string; password: string}) => {
  const form = new URLSearchParams()
  form.append("username", data.username)
  form.append("password", data.password)
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/token`, form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    return response.data
  } catch (error) {
    console.log("Login error:", error);
  }
}

export const getUserInfo = async (token: string) => {
  const response = await axios.get(`${API_BASE_URL}/auth/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return response.data
}