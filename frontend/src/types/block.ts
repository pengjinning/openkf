import { Node } from 'reactflow'

export enum BlockType {
  TEXT = 'text',
  INPUT = 'input',
  CHOICE = 'choice',
  CONDITION = 'condition',
  API = 'api'
}

export interface BlockData {
  label?: string
  content?: string
  [key: string]: any
}

export interface Block extends Omit<Node, 'data'> {
  type: BlockType
  data: BlockData
}

export interface ApiBlockData extends BlockData {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: string
  resultVariable?: string
  timeout?: number
}

export interface InputBlockData extends BlockData {
  question?: string
  inputType?: 'text' | 'number' | 'email' | 'url' | 'tel'
  variableName?: string
  placeholder?: string
  required?: boolean
  validation?: {
    type?: string
    regex?: string
    min?: number
    max?: number
  }
}

export interface WebhookBlockData extends BlockData {
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: string
  responseVariable?: string
  timeout?: number
}

export interface ConditionBlockData extends BlockData {
  conditions: Array<{
    id: string
    variableName: string
    operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan' | 'regex'
    value: string
  }>
  logicalOperator: 'and' | 'or'
}

export interface ScriptBlockData extends BlockData {
  code: string
  language: 'javascript' | 'python'
  async?: boolean
  resultVariable?: string
} 