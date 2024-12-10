import { Flow } from '@/types/flow'

interface ExportOptions {
  format?: 'json' | 'yaml'
  pretty?: boolean
}

interface ImportResult {
  success: boolean
  flow?: Flow
  error?: string
}

export const exportFlow = (flow: Flow, options: ExportOptions = {}) => {
  try {
    const { format = 'json', pretty = true } = options
    
    // 清理数据
    const cleanFlow = {
      ...flow,
      blocks: flow.blocks.map(block => ({
        ...block,
        selected: undefined,
        dragging: undefined,
        position: {
          x: Math.round(block.position.x),
          y: Math.round(block.position.y)
        }
      }))
    }

    // 导出为指定格式
    let content: string
    if (format === 'json') {
      content = pretty 
        ? JSON.stringify(cleanFlow, null, 2)
        : JSON.stringify(cleanFlow)
    } else {
      throw new Error('Unsupported format')
    }

    // 创建下载
    const blob = new Blob([content], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `flow-${Date.now()}.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '导出失败'
    }
  }
}

export const importFlow = async (file: File): Promise<ImportResult> => {
  try {
    const content = await file.text()
    const flow = JSON.parse(content)

    // 验证数据结构
    if (!flow.blocks || !Array.isArray(flow.blocks)) {
      throw new Error('无效的流程数据: 缺少blocks数组')
    }

    if (!flow.edges || !Array.isArray(flow.edges)) {
      throw new Error('无效的流程数据: 缺少edges数组')
    }

    // 修复节点位置
    flow.blocks = flow.blocks.map(block => ({
      ...block,
      position: {
        x: Number(block.position.x) || 0,
        y: Number(block.position.y) || 0
      }
    }))

    return {
      success: true,
      flow
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : '导入失败'
    }
  }
} 