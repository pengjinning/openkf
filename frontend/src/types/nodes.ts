export enum NodeType {
  TEXT = 'text',
  INPUT = 'input',
  BUTTON = 'button',
  WEBHOOK = 'webhook',
  API = 'api',
  CONDITION = 'condition',
  SCRIPT = 'script',
  INTEGRATION = 'integration',
  LOGIC = 'logic'
}

export interface NodeData {
  // 基础节点数据
  id: string
  label?: string
  description?: string

  // 文本节点
  content?: string
  delay?: number

  // 输入节点
  question?: string
  inputType?: 'text' | 'number' | 'email' | 'phone' | 'url'
  placeholder?: string
  validation?: {
    required?: boolean
    pattern?: string
    minLength?: number
    maxLength?: number
  }

  // 按钮节点
  buttons?: {
    id: string
    label: string
    value: string
  }[]

  // API节点
  url?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  headers?: Record<string, string>
  body?: string
  responseMapping?: Record<string, string>

  // 条件节点
  conditions?: {
    id: string
    variable: string
    operator: string
    value: string
  }[]
  logicalOperator?: 'and' | 'or'

  // 脚本节点
  code?: string
  language?: 'javascript' | 'python'

  // 集成节点
  integration?: {
    type: string
    provider: string
    action: string
    config: Record<string, any>
  }

  // 逻辑节点
  logicType?: 'condition' | 'switch'
  switchVariable?: string
  cases?: {
    value: string
    label?: string
  }[]

  // 注释节点
  label?: string
  content?: string
  color?: string
}

export interface InputBlockData {
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

export interface Block extends Node {
  type: string
  data: InputBlockData | any
}