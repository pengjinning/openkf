import { FC, memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Box, Stack, Text } from '@/components/ui'
import { Group } from '@/types/flow'
import { BlockNode } from './BlockNode'

interface GroupNodeProps extends NodeProps {
  data: Group
}

export const GroupNode: FC<GroupNodeProps> = memo(({ data }) => {
  return (
    <Box 
      bg="white" 
      p={4} 
      borderRadius="md" 
      shadow="sm"
      minW="250px"
    >
      <Text fontWeight="medium" mb={4}>{data.title}</Text>
      <Stack spacing={2}>
        {data.blocks.map((block, index) => (
          <BlockNode 
            key={block.id}
            block={block}
            isFirst={index === 0}
            isLast={index === data.blocks.length - 1}
          />
        ))}
      </Stack>
    </Box>
  )
})

GroupNode.displayName = 'GroupNode' 