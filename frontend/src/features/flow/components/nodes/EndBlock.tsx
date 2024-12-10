import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Badge } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const EndBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="end" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={2}>
          <Stack direction="row" align="center" spacing={2}>
            <Badge colorScheme="red">End</Badge>
            <Text fontSize="sm" fontWeight="medium">
              {data.label || 'Flow End'}
            </Text>
          </Stack>
          {data.description && (
            <Text fontSize="sm" color="gray.500">
              {data.description}
            </Text>
          )}
          {data.redirectUrl && (
            <Stack spacing={1}>
              <Text fontSize="sm" color="gray.500">
                Redirect URL
              </Text>
              <Text fontSize="sm" color="blue.500">
                {data.redirectUrl}
              </Text>
            </Stack>
          )}
          {data.resultVariable && (
            <Stack spacing={1}>
              <Text fontSize="sm" color="gray.500">
                Result Variable
              </Text>
              <Text fontSize="sm">
                {data.resultVariable}
              </Text>
            </Stack>
          )}
        </Stack>
      </Box>
    </BaseNode>
  )
} 