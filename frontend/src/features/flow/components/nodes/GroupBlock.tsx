import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Badge, Divider } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const GroupBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="group" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={3}>
          <Stack direction="row" align="center" spacing={2}>
            <Badge colorScheme="purple">Group</Badge>
            <Text fontSize="sm" fontWeight="medium">
              {data.label || 'Untitled Group'}
            </Text>
          </Stack>

          {data.description && (
            <>
              <Divider />
              <Text fontSize="sm" color="gray.500">
                {data.description}
              </Text>
            </>
          )}

          {data.blocks?.length > 0 && (
            <>
              <Divider />
              <Stack spacing={1}>
                <Text fontSize="sm" color="gray.500">
                  Blocks
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {data.blocks.length} blocks
                </Text>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </BaseNode>
  )
} 