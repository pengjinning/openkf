import { NodeType, NodeData } from '@/types/nodes'
import { Position } from '@/types/flow'

export const createNode = (type: NodeType, position: Position): NodeData => {
  const baseNode = {
    id: `node-${Date.now()}`,
    type,
    position
  }

  switch (type) {
    case NodeType.TEXT:
      return {
        ...baseNode,
        content: '',
        delay: 0
      }

    case NodeType.INPUT:
      return {
        ...baseNode,
        question: '',
        inputType: 'text',
        validation: {
          required: false
        }
      }

    case NodeType.BUTTON:
      return {
        ...baseNode,
        buttons: []
      }

    case NodeType.API:
      return {
        ...baseNode,
        method: 'GET',
        headers: {},
        responseMapping: {}
      }

    case NodeType.CONDITION:
      return {
        ...baseNode,
        conditions: [],
        logicalOperator: 'and'
      }

    case NodeType.SCRIPT:
      return {
        ...baseNode,
        code: '',
        language: 'javascript'
      }

    case NodeType.INTEGRATION:
      return {
        ...baseNode,
        integration: {
          type: '',
          provider: '',
          action: '',
          config: {}
        }
      }

    case NodeType.LOGIC:
      return {
        ...baseNode,
        logicType: 'condition',
        conditions: []
      }

    default:
      return baseNode
  }
} 