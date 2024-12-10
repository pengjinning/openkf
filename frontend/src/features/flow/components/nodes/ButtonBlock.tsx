import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Input } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const ButtonBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="button" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Message
            </Text>
            <Input
              value={data.message || ''}
              placeholder="Enter message..."
              isReadOnly
              aria-label="Button message"
            />
          </Stack>

          <Stack spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Options
            </Text>
            {data.options?.map((option: string, index: number) => (
              <Input
                key={index}
                value={option}
                placeholder={`Option ${index + 1}`}
                isReadOnly
                aria-label={`Button option ${index + 1}`}
              />
            ))}
          </Stack>

          <Stack spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Variable Name
            </Text>
            <Input
              value={data.variableName || ''}
              placeholder="Enter variable name..."
              isReadOnly
              aria-label="Variable name for button response"
            />
          </Stack>
        </Stack>
      </Box>
    </BaseNode>
  )
} 