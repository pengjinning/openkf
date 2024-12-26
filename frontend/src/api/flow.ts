import { Flow } from '@/types/flow'
import { axios } from './axios'

export const flowApi = {
  getFlow: async (flowId: string): Promise<Flow> => {
    const { data } = await axios.get(`/api/flows/${flowId}`)
    return data
  },

  createFlow: async (flow: Partial<Flow>): Promise<Flow> => {
    const { data } = await axios.post('/api/flows', flow)
    return data
  },

  updateFlow: async (flowId: string, updates: Partial<Flow>): Promise<Flow> => {
    const { data } = await axios.patch(`/api/flows/${flowId}`, updates)
    return data
  },

  deleteFlow: async (flowId: string): Promise<void> => {
    await axios.delete(`/api/flows/${flowId}`)
  },
}
