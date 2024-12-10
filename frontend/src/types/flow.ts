import { Node, Edge } from 'reactflow'

export interface Flow {
  id: string
  name: string
  description?: string
  blocks: Block[]
  edges: Edge[]
  createdAt: string
  updatedAt: string
  version?: number
  isPublished?: boolean
  settings?: FlowSettings
}

export interface Block extends Node {
  type: string
  data: {
    label?: string
    content?: string
    variable?: string
    [key: string]: any
  }
}

export interface FlowSettings {
  typingEmulation?: {
    enabled: boolean
    speed: number
    delay: number
  }
  security?: {
    recaptcha?: {
      enabled: boolean
      siteKey?: string
    }
  }
} 