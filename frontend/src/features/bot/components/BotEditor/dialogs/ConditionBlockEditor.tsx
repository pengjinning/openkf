import { FC } from 'react'
import { Stack, Input, Select, Button, IconButton } from '@/components/ui'
import { PlusIcon, DeleteIcon } from '@/components/icons'
import { Block, ConditionBlockData } from '@/types/block'

interface ConditionBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const ConditionBlockEditor: FC<ConditionBlockEditorProps> = ({ block, onChange }) => {
  const data = block.data as ConditionBlockData
  const conditions = data?.conditions || []

  const handleAddCondition = () => {
    const newCondition = {
      id: `condition-${Date.now()}`,
      variableName: '',
      operator: 'equals' as const,
      value: ''
    }

    onChange({
      ...block,
      data: {
        ...data,
        conditions: [...conditions, newCondition],
        logicalOperator: data?.logicalOperator || 'and'
      }
    })
  }

  const handleRemoveCondition = (id: string) => {
    onChange({
      ...block,
      data: {
        ...data,
        conditions: conditions.filter(c => c.id !== id)
      }
    })
  }

  const handleChangeCondition = (id: string, field: string, value: string) => {
    onChange({
      ...block,
      data: {
        ...data,
        conditions: conditions.map(c => 
          c.id === id ? { ...c, [field]: value } : c
        )
      }
    })
  }

  return (
    <Stack spacing={4}>
      <Select
        label="Logical Operator"
        value={data?.logicalOperator || 'and'}
        onChange={e => onChange({
          ...block,
          data: { ...data, logicalOperator: e.target.value as 'and' | 'or' }
        })}
        aria-label="Select logical operator for conditions"
      >
        <option value="and">AND - All conditions must be true</option>
        <option value="or">OR - Any condition must be true</option>
      </Select>

      <Stack spacing={2}>
        {conditions.map(condition => (
          <Stack key={condition.id} direction="row" spacing={2} align="flex-end">
            <Input
              label="Variable Name"
              value={condition.variableName}
              onChange={e => handleChangeCondition(condition.id, 'variableName', e.target.value)}
              placeholder="Enter variable name..."
              aria-label={`Variable name for condition ${condition.id}`}
            />
            <Select
              label="Comparison Operator"
              value={condition.operator}
              onChange={e => handleChangeCondition(condition.id, 'operator', e.target.value)}
              aria-label={`Comparison operator for condition ${condition.id}`}
            >
              <option value="equals">Equals</option>
              <option value="notEquals">Not Equals</option>
              <option value="contains">Contains</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
              <option value="regex">Regex</option>
            </Select>
            <Input
              label="Comparison Value"
              value={condition.value}
              onChange={e => handleChangeCondition(condition.id, 'value', e.target.value)}
              placeholder="Enter comparison value..."
              aria-label={`Comparison value for condition ${condition.id}`}
            />
            <IconButton
              aria-label={`Delete condition ${condition.variableName || condition.id}`}
              icon={<DeleteIcon />}
              onClick={() => handleRemoveCondition(condition.id)}
            />
          </Stack>
        ))}
      </Stack>

      <Button
        leftIcon={<PlusIcon />}
        variant="ghost"
        onClick={handleAddCondition}
      >
        Add Condition
      </Button>
    </Stack>
  )
} 