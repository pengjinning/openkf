import axios from 'axios'
import { AnalyticsData, BlockStats } from '@/types/analytics'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getBotAnalytics = async (botId: string, params?: {
  startDate?: string
  endDate?: string
}): Promise<AnalyticsData> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${botId}/analytics`, {
    params
  })
  return data
}

export const exportAnalytics = async (botId: string, params?: {
  startDate?: string
  endDate?: string
  format?: 'csv' | 'json'
}): Promise<Blob> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${botId}/analytics/export`, {
    params,
    responseType: 'blob'
  })
  return data
}

export const getBlockAnalytics = async (botId: string, blockId: string): Promise<BlockStats> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${botId}/blocks/${blockId}/analytics`)
  return data
} 