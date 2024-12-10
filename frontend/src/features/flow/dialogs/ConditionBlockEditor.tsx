import { FC } from 'react'
import { Stack, Text, Input, Select, IconButton } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'
import { PlusIcon, DeleteIcon } from '@/components/icons'

interface ConditionBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const ConditionBlockEditor: FC<ConditionBlockEditorProps> = ({ block, ...props }) => {
  const handleChange = (field: string, value: any) => {
    block.data = {
      ...block.data,
      [field]: value
    }
  }

  const handleConditionChange = (index: number, field: string, value: string) => {
    const conditions = [...(block.data?.conditions || [])]
    conditions[index] = {
      ...conditions[index],
      [field]: value
    }
    handleChange('conditions', conditions)
  }

  const addCondition = () => {
    const conditions = [...(block.data?.conditions || []), { variable: '', operator: '==', value: '' }]
    handleChange('conditions', conditions)
  }

  const removeCondition = (index: number) => {
    const conditions = [...(block.data?.conditions || [])]
    conditions.splice(index, 1)
    handleChange('conditions', conditions)
  }

  return (
    <BlockEditorDialog block={block} {...props}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              Conditions
            </Text>
            <IconButton
              icon={<PlusIcon />}
              onClick={addCondition}
              size="sm"
              aria-label="Add condition"
            />
          </Stack>
          {block.data?.conditions?.map((condition: any, index: number) => (
            <Stack key={index} spacing={2}>
              <Stack direction="row" spacing={2}>
                <Input
                  value={condition.variable}
                  onChange={e => handleConditionChange(index, 'variable', e.target.value)}
                  placeholder="Variable name"
                  aria-label={`Condition ${index + 1} variable`}
                />
                <Select
                  value={condition.operator}
                  onChange={e => handleConditionChange(index, 'operator', e.target.value)}
                  aria-label={`Condition ${index + 1} operator`}
                  title="Select operator"
                >
                  <option value="==">Equals</option>
                  <option value="!=">Not equals</option>
                  <option value=">">Greater than</option>
                  <option value="<">Less than</option>
                  <option value="contains">Contains</option>
                </Select>
                <Input
                  value={condition.value}
                  onChange={e => handleConditionChange(index, 'value', e.target.value)}
                  placeholder="Value"
                  aria-label={`Condition ${index + 1} value`}
                />
                <IconButton
                  icon={<DeleteIcon />}
                  onClick={() => removeCondition(index)}
                  size="sm"
                  colorScheme="red"
                  aria-label={`Remove condition ${index + 1}`}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="operator-label">
            Logical Operator
          </Text>
          <Select
            value={block.data?.logicalOperator || 'and'}
            onChange={e => handleChange('logicalOperator', e.target.value)}
            aria-labelledby="operator-label"
            title="Select logical operator"
          >
            <option value="and">AND</option>
            <option value="or">OR</option>
          </Select>
        </Stack>
      </Stack>
    </BlockEditorDialog>
  )
} 