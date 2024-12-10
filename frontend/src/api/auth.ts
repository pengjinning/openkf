import axios from 'axios'
import { LoginCredentials, RegisterCredentials, AuthResponse } from '@/types/auth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/auth/login`, credentials)
  return data
}

export const register = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/auth/register`, credentials)
  return data
}

export const logout = async (): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/auth/logout`)
}

// 设置全局认证token
export const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
} 