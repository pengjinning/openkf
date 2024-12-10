import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Badge } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const StartBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="start" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={2}>
          <Stack direction="row" align="center" spacing={2}>
            <Badge colorScheme="green">Start</Badge>
            <Text fontSize="sm" fontWeight="medium">
              {data.label || 'Flow Start'}
            </Text>
          </Stack>
          {data.description && (
            <Text fontSize="sm" color="gray.500">
              {data.description}
            </Text>
          )}
          {data.variables?.length > 0 && (
            <Stack spacing={1}>
              <Text fontSize="sm" color="gray.500">
                Initial Variables
              </Text>
              {data.variables.map((variable, index) => (
                <Text key={index} fontSize="sm">
                  {variable.name}: {variable.value}
                </Text>
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </BaseNode>
  )
} 