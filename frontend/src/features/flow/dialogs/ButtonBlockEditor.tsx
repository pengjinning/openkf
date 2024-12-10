import { FC } from 'react'
import { Stack, Text, Input, IconButton } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'
import { PlusIcon, DeleteIcon } from '@/components/icons'

interface ButtonBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const ButtonBlockEditor: FC<ButtonBlockEditorProps> = ({ block, ...props }) => {
  const handleChange = (field: string, value: any) => {
    block.data = {
      ...block.data,
      [field]: value
    }
  }

  const handleOptionChange = (index: number, value: string) => {
    const options = [...(block.data?.options || [])]
    options[index] = value
    handleChange('options', options)
  }

  const addOption = () => {
    const options = [...(block.data?.options || []), '']
    handleChange('options', options)
  }

  const removeOption = (index: number) => {
    const options = [...(block.data?.options || [])]
    options.splice(index, 1)
    handleChange('options', options)
  }

  return (
    <BlockEditorDialog block={block} {...props}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="message-label">
            Message
          </Text>
          <Input
            value={block.data?.message || ''}
            onChange={e => handleChange('message', e.target.value)}
            placeholder="Enter message..."
            aria-labelledby="message-label"
          />
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              Options
            </Text>
            <IconButton
              icon={<PlusIcon />}
              onClick={addOption}
              size="sm"
              aria-label="Add option"
            />
          </Stack>
          {block.data?.options?.map((option: string, index: number) => (
            <Stack key={index} direction="row" spacing={2}>
              <Input
                value={option}
                onChange={e => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                aria-label={`Button option ${index + 1}`}
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => removeOption(index)}
                size="sm"
                colorScheme="red"
                aria-label={`Remove option ${index + 1}`}
              />
            </Stack>
          ))}
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