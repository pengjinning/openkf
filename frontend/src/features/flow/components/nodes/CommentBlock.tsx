import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Badge } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

export const CommentBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  return (
    <BaseNode type="comment" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={2}>
          <Stack direction="row" align="center" spacing={2}>
            <Badge colorScheme="gray">Note</Badge>
            <Text fontSize="sm" fontWeight="medium">
              {data.label || 'Comment'}
            </Text>
          </Stack>
          <Text
            fontSize="sm"
            color="gray.600"
            whiteSpace="pre-wrap"
            maxH="120px"
            overflowY="auto"
            sx={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                bg: 'gray.300',
                borderRadius: 'full',
              }
            }}
          >
            {data.content || 'No content'}
          </Text>
        </Stack>
      </Box>
    </BaseNode>
  )
} 