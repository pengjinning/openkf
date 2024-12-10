import axios from 'axios'
import { Bot } from '@/types/bot'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getBots = async (): Promise<Bot[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots`)
  return data
}

export const createBot = async (bot: Partial<Bot>): Promise<Bot> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/bots`, bot)
  return data
}

export const updateBot = async (id: string, bot: Partial<Bot>): Promise<Bot> => {
  const { data } = await axios.put(`${API_BASE_URL}/api/bots/${id}`, bot)
  return data
}

export const deleteBot = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/api/bots/${id}`)
}

export const getBot = async (id: string): Promise<Bot> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${id}`)
  return data
}

export const getWorkspaceBots = async (workspaceId: string): Promise<Bot[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/workspace/${workspaceId}`)
  return data
}

export const publishBot = async (id: string, publishedTypebotId: string): Promise<Bot> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/bots/${id}/publish`, null, {
    params: { publishedTypebotId }
  })
  return data
}

interface BotStats {
  views: number
  starts: number
  completions: number
}

export const getBotStats = async (id: string): Promise<BotStats> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${id}/stats`)
  return data
}

export const trackBotView = async (id: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/bots/${id}/track/view`)
}

export const trackBotStart = async (id: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/bots/${id}/track/start`)
}

export const trackBotCompletion = async (id: string): Promise<void> => {
  await axios.post(`${API_BASE_URL}/api/bots/${id}/track/complete`)
}

interface BotStatsDetails extends BotStats {
  dailyStats: {
    date: string
    views: number
    starts: number
    completions: number
  }[]
}

export const getBotStatsDetails = async (id: string): Promise<BotStatsDetails> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${id}/stats/details`)
  return data
}

export const getBotCompletionRate = async (id: string): Promise<number> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/bots/${id}/stats/completion-rate`)
  return data
} 