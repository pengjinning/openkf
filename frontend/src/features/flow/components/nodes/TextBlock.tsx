import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Text, Textarea } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const TextBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="text" data={data} {...props}>
      <Box p={3}>
        <Text fontSize="sm" color="gray.500" mb={2}>
          Message
        </Text>
        <Textarea
          value={data.content || ''}
          placeholder="Enter your message..."
          rows={3}
          isReadOnly
        />
      </Box>
    </BaseNode>
  )
} 