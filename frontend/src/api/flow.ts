import axios from 'axios'
import { Flow } from '@/types/flow'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const exportFlow = async (id: string): Promise<Blob> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/flows/${id}/export`, {
    responseType: 'blob'
  })
  return data
}

export const importFlow = async (file: File): Promise<Flow> => {
  const formData = new FormData()
  formData.append('file', file)
  const { data } = await axios.post(`${API_BASE_URL}/api/flows/import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}

export const duplicateFlow = async (id: string): Promise<Flow> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/flows/${id}/duplicate`)
  return data
}

export const getFlowVersions = async (id: string): Promise<Flow[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/flows/${id}/versions`)
  return data
}

export const restoreFlowVersion = async (id: string, versionId: string): Promise<Flow> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/flows/${id}/versions/${versionId}/restore`)
  return data
} 