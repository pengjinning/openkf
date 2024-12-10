import { NodeData, NodeType } from '@/types/nodes'

interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateNode = (node: NodeData): ValidationResult => {
  const errors: string[] = []

  // 基础验证
  if (!node.id) {
    errors.push('Node ID is required')
  }

  // 根据节点类型进行特定验证
  switch (node.type) {
    case NodeType.TEXT:
      if (!node.content?.trim()) {
        errors.push('Text content is required')
      }
      break

    case NodeType.INPUT:
      if (!node.question?.trim()) {
        errors.push('Question is required')
      }
      if (node.validation?.required && !node.validation?.pattern) {
        errors.push('Validation pattern is required when input is required')
      }
      break

    case NodeType.BUTTON:
      if (!node.buttons?.length) {
        errors.push('At least one button is required')
      }
      node.buttons?.forEach((button, index) => {
        if (!button.label?.trim()) {
          errors.push(`Button ${index + 1} label is required`)
        }
      })
      break

    case NodeType.API:
      if (!node.url?.trim()) {
        errors.push('API URL is required')
      }
      if (!node.method) {
        errors.push('HTTP method is required')
      }
      break

    case NodeType.CONDITION:
      if (!node.conditions?.length) {
        errors.push('At least one condition is required')
      }
      node.conditions?.forEach((condition, index) => {
        if (!condition.variable?.trim()) {
          errors.push(`Condition ${index + 1} variable is required`)
        }
        if (!condition.operator?.trim()) {
          errors.push(`Condition ${index + 1} operator is required`)
        }
      })
      break

    case NodeType.SCRIPT:
      if (!node.code?.trim()) {
        errors.push('Script code is required')
      }
      if (!node.language) {
        errors.push('Script language is required')
      }
      break

    case NodeType.INTEGRATION:
      if (!node.integration?.type) {
        errors.push('Integration type is required')
      }
      if (!node.integration?.provider) {
        errors.push('Integration provider is required')
      }
      if (!node.integration?.action) {
        errors.push('Integration action is required')
      }
      break

    case NodeType.LOGIC:
      if (!node.logicType) {
        errors.push('Logic type is required')
      }
      if (node.logicType === 'condition' && !node.conditions?.length) {
        errors.push('At least one condition is required')
      }
      if (node.logicType === 'switch' && !node.switchVariable?.trim()) {
        errors.push('Switch variable is required')
      }
      break
  }

  return {
    isValid: errors.length === 0,
    errors
  }
} 