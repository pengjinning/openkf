import type { Edge as ReactFlowEdge } from 'reactflow'

export interface Flow {
  id: string
  name: string
  description?: string
  groups: Group[]
  edges: FlowEdge[]
  variables: Variable[]
  settings?: FlowSettings
}

export interface Group {
  id: string
  title: string
  graphCoordinates: { x: number; y: number }
  blocks: Block[]
}

export interface Block {
  id: string
  type: BlockType
  content?: BlockContent
  options?: BlockOptions
}

export interface FlowEdge extends Omit<ReactFlowEdge, 'id'> {
  id: string
  from: { blockId: string }
  to: { blockId: string }
}

export interface Variable {
  id: string
  name: string
  value?: string
}

export interface FlowSettings {
  theme?: {
    chat?: {
      hostBubbles?: {
        backgroundColor?: string
        color?: string
      }
    }
  }
}

export type BlockType =
  // Bubbles
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'embed'
  // Inputs
  | 'text_input'
  | 'number'
  | 'email'
  | 'website'
  | 'date'
  | 'phone'
  | 'choice'
  | 'file'
  | 'payment'
  | 'rating'
  // Logic
  | 'set_variable'
  | 'condition'
  | 'redirect'
  | 'script'

export interface BlockContent {
  text?: string
  url?: string
  placeholder?: string
  options?: string[]
}

export interface BlockOptions {
  variableId?: string
  buttonLabel?: string
}