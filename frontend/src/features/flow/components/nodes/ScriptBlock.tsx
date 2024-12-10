import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Code } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const ScriptBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="script" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500">
            Script
          </Text>
          <Code
            p={2}
            borderRadius="md"
            bg="gray.50"
            fontSize="sm"
            whiteSpace="pre-wrap"
          >
            {data.code || '// No script'}
          </Code>
        </Stack>
      </Box>
    </BaseNode>
  )
} 