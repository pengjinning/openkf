import axios from 'axios'
import { Template } from '@/types/template'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getPublicTemplates = async (): Promise<Template[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/templates/public`)
  return data
}

export const getTemplate = async (id: string): Promise<Template> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/templates/${id}`)
  return data
}

export const createTemplate = async (template: Partial<Template>): Promise<Template> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/templates`, template)
  return data
}

export const updateTemplate = async (id: string, template: Partial<Template>): Promise<Template> => {
  const { data } = await axios.put(`${API_BASE_URL}/api/templates/${id}`, template)
  return data
}

export const deleteTemplate = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/api/templates/${id}`)
}

export const duplicateTemplate = async (id: string): Promise<Template> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/templates/${id}/duplicate`)
  return data
}

export const importTemplate = async (file: File): Promise<Template> => {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await axios.post(`${API_BASE_URL}/api/templates/import`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return data
}

export const exportTemplate = async (id: string): Promise<Blob> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/templates/${id}/export`, {
    responseType: 'blob'
  })
  return data
} 