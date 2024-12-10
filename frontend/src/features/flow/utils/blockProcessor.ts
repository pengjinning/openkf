import { Block, BlockData } from '@/types/flow'

export const processBlock = async (
  block: Block,
  variables: Record<string, any>,
  onResponse: (content: string) => void
) => {
  const data = block.data

  switch (block.type) {
    case 'text':
      await processTextBlock(data, variables, onResponse)
      break
    case 'input':
      await processInputBlock(data, onResponse)
      break
    case 'choice':
      await processChoiceBlock(data, onResponse)
      break
    case 'condition':
      await processConditionBlock(data, variables)
      break
    case 'api':
      await processApiBlock(data, variables, onResponse)
      break
  }
}

const processTextBlock = async (
  data: BlockData,
  variables: Record<string, any>,
  onResponse: (content: string) => void
) => {
  const processedContent = processTemplate(data.content, variables)
  onResponse(processedContent)
  if (data.delay) {
    await delay(data.delay)
  }
}

const processInputBlock = async (
  data: BlockData,
  onResponse: (content: string) => void
) => {
  onResponse(data.question)
}

const processChoiceBlock = async (
  data: BlockData,
  onResponse: (content: string) => void
) => {
  onResponse(data.question)
  data.choices.forEach(choice => {
    onResponse(`- ${choice.content}`)
  })
}

const processConditionBlock = async (
  data: BlockData,
  variables: Record<string, any>
) => {
  const results = data.conditions.map(condition => {
    const value = variables[condition.variableName]
    return evaluateCondition(value, condition.operator, condition.value)
  })

  return data.logicalOperator === 'and'
    ? results.every(Boolean)
    : results.some(Boolean)
}

const processApiBlock = async (
  data: BlockData,
  variables: Record<string, any>,
  onResponse: (content: string) => void
) => {
  try {
    const url = processTemplate(data.url, variables)
    const body = data.body ? JSON.parse(processTemplate(data.body, variables)) : undefined
    const headers = data.headers ? JSON.parse(processTemplate(JSON.stringify(data.headers), variables)) : undefined

    const response = await fetch(url, {
      method: data.method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })

    const result = await response.json()
    if (data.resultVariable) {
      variables[data.resultVariable] = result
    }
  } catch (error) {
    onResponse(`Error: ${error.message}`)
  }
}

const processTemplate = (template: string, variables: Record<string, any>): string => {
  return template.replace(/{{(\w+)}}/g, (_, key) => variables[key] || '')
}

const evaluateCondition = (value: any, operator: string, target: string): boolean => {
  switch (operator) {
    case 'equals':
      return value === target
    case 'notEquals':
      return value !== target
    case 'contains':
      return String(value).includes(target)
    case 'greaterThan':
      return Number(value) > Number(target)
    case 'lessThan':
      return Number(value) < Number(target)
    case 'regex':
      return new RegExp(target).test(String(value))
    default:
      return false
  }
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)) 