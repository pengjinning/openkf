import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Input, Select } from '@/components/ui'
import { Block, WebhookBlockData } from '@/types/block'
import { BaseNode } from './BaseNode'

interface WebhookBlockProps extends Omit<NodeProps, 'data'> {
  data: WebhookBlockData
}

export const WebhookBlock: FC<WebhookBlockProps> = ({ data, type, ...props }) => {
  return (
    <BaseNode type={type} data={data} {...props}>
      <Box p={3}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Text id="url-label" fontWeight="medium">
              Webhook URL
            </Text>
            <Input
              value={data.url || ''}
              placeholder="Enter webhook URL..."
              isReadOnly
              aria-labelledby="url-label"
            />
          </Stack>

          <Stack spacing={2}>
            <Text id="method-label" fontWeight="medium">
              HTTP Method
            </Text>
            <Select
              value={data.method || 'POST'}
              isReadOnly
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
            <Text id="response-var-label" fontWeight="medium">
              Response Variable
            </Text>
            <Input
              value={data.responseVariable || ''}
              placeholder="Enter variable name..."
              isReadOnly
              aria-labelledby="response-var-label"
            />
          </Stack>
        </Stack>
      </Box>
    </BaseNode>
  )
} 