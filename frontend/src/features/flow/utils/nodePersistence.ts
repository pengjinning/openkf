import { NodeData } from '@/types/nodes'

const STORAGE_KEY = 'flow_nodes_backup'

export const saveNodesBackup = (nodes: NodeData[]) => {
  try {
    const backup = {
      timestamp: Date.now(),
      nodes
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(backup))
  } catch (error) {
    console.error('Failed to save nodes backup:', error)
  }
}

export const loadNodesBackup = (): NodeData[] | null => {
  try {
    const backup = localStorage.getItem(STORAGE_KEY)
    if (!backup) return null

    const { nodes } = JSON.parse(backup)
    return nodes
  } catch (error) {
    console.error('Failed to load nodes backup:', error)
    return null
  }
}

export const clearNodesBackup = () => {
  localStorage.removeItem(STORAGE_KEY)
} 