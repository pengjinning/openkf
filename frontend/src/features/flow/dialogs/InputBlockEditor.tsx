import { FC } from 'react'
import { Stack, Text, Input, Select } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'

interface InputBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const InputBlockEditor: FC<InputBlockEditorProps> = ({ block, ...props }) => {
  const handleChange = (field: string, value: any) => {
    block.data = {
      ...block.data,
      [field]: value
    }
  }

  return (
    <BlockEditorDialog block={block} {...props}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="question-label">
            Question
          </Text>
          <Input
            value={block.data?.question || ''}
            onChange={e => handleChange('question', e.target.value)}
            placeholder="Enter your question..."
            aria-labelledby="question-label"
          />
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="input-type-label">
            Input Type
          </Text>
          <Select
            value={block.data?.inputType || 'text'}
            onChange={e => handleChange('inputType', e.target.value)}
            aria-labelledby="input-type-label"
            title="Select input type"
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="url">URL</option>
          </Select>
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="variable-label">
            Variable Name
          </Text>
          <Input
            value={block.data?.variableName || ''}
            onChange={e => handleChange('variableName', e.target.value)}
            placeholder="Enter variable name..."
            aria-labelledby="variable-label"
          />
        </Stack>
      </Stack>
    </BlockEditorDialog>
  )
} 