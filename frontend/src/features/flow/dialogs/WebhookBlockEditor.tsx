import { FC } from 'react'
import { Stack, Text, Input, Select } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'

interface WebhookBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const WebhookBlockEditor: FC<WebhookBlockEditorProps> = ({ block, ...props }) => {
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
          <Text fontSize="sm" color="gray.500" id="url-label">
            URL
          </Text>
          <Input
            value={block.data?.url || ''}
            onChange={e => handleChange('url', e.target.value)}
            placeholder="Enter webhook URL..."
            aria-labelledby="url-label"
          />
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="method-label">
            Method
          </Text>
          <Select
            value={block.data?.method || 'POST'}
            onChange={e => handleChange('method', e.target.value)}
            aria-labelledby="method-label"
            title="Select webhook method"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </Select>
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="response-var-label">
            Response Variable
          </Text>
          <Input
            value={block.data?.responseVariable || ''}
            onChange={e => handleChange('responseVariable', e.target.value)}
            placeholder="Enter variable name..."
            aria-labelledby="response-var-label"
          />
        </Stack>
      </Stack>
    </BlockEditorDialog>
  )
} 
