import { FC } from 'react'
import { Stack, Text, Input, Select, IconButton } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'
import { PlusIcon, DeleteIcon } from '@/components/icons'

interface ApiBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const ApiBlockEditor: FC<ApiBlockEditorProps> = ({ block, ...props }) => {
  const handleChange = (field: string, value: any) => {
    block.data = {
      ...block.data,
      [field]: value
    }
  }

  const handleHeaderChange = (index: number, field: string, value: string) => {
    const headers = [...(block.data?.headers || [])]
    headers[index] = {
      ...headers[index],
      [field]: value
    }
    handleChange('headers', headers)
  }

  const addHeader = () => {
    const headers = [...(block.data?.headers || []), { key: '', value: '' }]
    handleChange('headers', headers)
  }

  const removeHeader = (index: number) => {
    const headers = [...(block.data?.headers || [])]
    headers.splice(index, 1)
    handleChange('headers', headers)
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
            placeholder="Enter API URL..."
            aria-labelledby="url-label"
          />
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="method-label">
            Method
          </Text>
          <Select
            value={block.data?.method || 'GET'}
            onChange={e => handleChange('method', e.target.value)}
            aria-labelledby="method-label"
            title="Select HTTP method"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </Select>
        </Stack>

        <Stack spacing={2}>
          <Stack direction="row" justify="space-between" align="center">
            <Text fontSize="sm" color="gray.500">
              Headers
            </Text>
            <IconButton
              icon={<PlusIcon />}
              onClick={addHeader}
              size="sm"
              aria-label="Add header"
            />
          </Stack>
          {block.data?.headers?.map((header: any, index: number) => (
            <Stack key={index} direction="row" spacing={2}>
              <Input
                value={header.key}
                onChange={e => handleHeaderChange(index, 'key', e.target.value)}
                placeholder="Header name"
                aria-label={`Header ${index + 1} name`}
              />
              <Input
                value={header.value}
                onChange={e => handleHeaderChange(index, 'value', e.target.value)}
                placeholder="Header value"
                aria-label={`Header ${index + 1} value`}
              />
              <IconButton
                icon={<DeleteIcon />}
                onClick={() => removeHeader(index)}
                size="sm"
                colorScheme="red"
                aria-label={`Remove header ${index + 1}`}
              />
            </Stack>
          ))}
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="body-label">
            Request Body
          </Text>
          <Input
            as="textarea"
            value={block.data?.body || ''}
            onChange={e => handleChange('body', e.target.value)}
            placeholder="Enter request body (JSON)..."
            rows={4}
            aria-labelledby="body-label"
          />
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