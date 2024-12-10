import { NodeData, NodeType } from '@/types/nodes'

interface MigrationResult {
  success: boolean
  data?: NodeData
  error?: string
}

// 版本号定义
const CURRENT_VERSION = '1.0.0'

// 迁移函数映射
const migrations: Record<string, (data: any) => NodeData> = {
  '0.9.0': migrateFrom090,
  '0.9.5': migrateFrom095
}

export const migrateNodeData = (data: any, fromVersion: string): MigrationResult => {
  try {
    // 如果已经是最新版本，直接返回
    if (fromVersion === CURRENT_VERSION) {
      return { success: true, data: data as NodeData }
    }

    // 获取需要执行的迁移函数
    const migrationFn = migrations[fromVersion]
    if (!migrationFn) {
      return {
        success: false,
        error: `No migration path found from version ${fromVersion}`
      }
    }

    // 执行迁移
    const migratedData = migrationFn(data)

    return {
      success: true,
      data: migratedData
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown migration error'
    }
  }
}

// 从0.9.0版本迁移
function migrateFrom090(data: any): NodeData {
  // 处理旧版本的数据结构
  const migratedData: NodeData = {
    id: data.id,
    type: data.type,
    label: data.name || data.label,
    description: data.description
  }

  // 根据节点类型迁移特定字段
  switch (data.type) {
    case NodeType.TEXT:
      migratedData.content = data.text || data.content
      migratedData.delay = data.delay || 0
      break

    case NodeType.INPUT:
      migratedData.question = data.message || data.question
      migratedData.inputType = data.type || 'text'
      migratedData.validation = {
        required: data.required || false,
        pattern: data.pattern,
        minLength: data.minLength,
        maxLength: data.maxLength
      }
      break

    // ... 其他节点类型的迁移逻辑
  }

  return migratedData
}

// 从0.9.5版本迁移
function migrateFrom095(data: any): NodeData {
  // 实现0.9.5版本的迁移逻辑
  return data as NodeData
} 