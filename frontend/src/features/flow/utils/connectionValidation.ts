import { Connection, Edge } from 'reactflow'
import { Block, NodeType } from '@/types/nodes'
import { nodeConfig } from '../constants/nodeTypes'

interface ValidationResult {
  isValid: boolean
  error?: string
}

export const validateConnection = (
  connection: Connection,
  nodes: Block[],
  edges: Edge[]
): ValidationResult => {
  const sourceNode = nodes.find(n => n.id === connection.source)
  const targetNode = nodes.find(n => n.id === connection.target)

  if (!sourceNode || !targetNode) {
    return {
      isValid: false,
      error: '无效的连接：找不到源节点或目标节点'
    }
  }

  // 检查是否已存在连接
  const existingConnection = edges.find(
    e => e.source === connection.source && e.target === connection.target
  )
  if (existingConnection) {
    return {
      isValid: false,
      error: '节点间已存在连接'
    }
  }

  // 检查特殊节点规则
  if (sourceNode.type === 'start' && connection.sourceHandle !== 'output') {
    return {
      isValid: false,
      error: '开始节点只能有输出连接'
    }
  }

  if (targetNode.type === 'end' && connection.targetHandle !== 'input') {
    return {
      isValid: false,
      error: '结束节点只能有输入连接'
    }
  }

  // 检查条件节点连接
  if (sourceNode.type === NodeType.CONDITION) {
    if (!['true', 'false'].includes(connection.sourceHandle || '')) {
      return {
        isValid: false,
        error: '条件节点必须从true/false端口连接'
      }
    }
  }

  // 检查循环连接
  if (sourceNode.id === targetNode.id) {
    return {
      isValid: false,
      error: '不允许自我连接'
    }
  }

  // 检查节点类型兼容性
  const sourceConfig = nodeConfig[sourceNode.type]
  const targetConfig = nodeConfig[targetNode.type]

  if (!sourceConfig.allowsChildren) {
    return {
      isValid: false,
      error: `${sourceConfig.label}节点不能有输出连接`
    }
  }

  if (!targetConfig.allowsParents) {
    return {
      isValid: false,
      error: `${targetConfig.label}节点不能有输入连接`
    }
  }

  // 检查连接数量限制
  const sourceConnections = edges.filter(e => e.source === sourceNode.id)
  const targetConnections = edges.filter(e => e.target === targetNode.id)

  if (sourceConfig.maxOutputs && sourceConnections.length >= sourceConfig.maxOutputs) {
    return {
      isValid: false,
      error: `${sourceConfig.label}节点最多只能有${sourceConfig.maxOutputs}个输出连接`
    }
  }

  if (targetConfig.maxInputs && targetConnections.length >= targetConfig.maxInputs) {
    return {
      isValid: false,
      error: `${targetConfig.label}节点最多只能有${targetConfig.maxInputs}个输入连接`
    }
  }

  return { isValid: true }
}

export const getConnectionStyle = (isValid: boolean) => ({
  strokeWidth: 2,
  stroke: isValid ? '#2563eb' : '#ef4444',
  strokeDasharray: isValid ? 'none' : '5,5',
  animation: isValid ? 'none' : 'flowPathAnimation 1s linear infinite',
  '@keyframes flowPathAnimation': {
    '0%': {
      strokeDashoffset: 0
    },
    '100%': {
      strokeDashoffset: 10
    }
  }
}) 