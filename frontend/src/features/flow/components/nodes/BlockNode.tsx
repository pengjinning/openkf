import { FC, memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Text } from '@/components/ui'
import { Block } from '@/types/flow'

interface BlockNodeProps {
  block: Block
  isFirst: boolean
  isLast: boolean
}

export const BlockNode: FC<BlockNodeProps> = memo(({ block, isFirst, isLast }) => {
  return (
    <Box
      bg="gray.50"
      p={3}
      borderRadius="md"
      position="relative"
    >
      {isFirst && (
        <Handle
          type="target"
          position={Position.Top}
          style={{ top: -10 }}
        />
      )}

      <Text fontSize="sm">
        {block.type}
        {block.content?.richText?.[0]?.children?.[0]?.text}
      </Text>

      {block.outgoingEdgeId && (
        <Handle
          type="source"
          position={Position.Bottom}
          id={block.outgoingEdgeId}
          style={{ bottom: -10 }}
        />
      )}

      {isLast && !block.outgoingEdgeId && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{ bottom: -10 }}
        />
      )}
    </Box>
  )
})

BlockNode.displayName = 'BlockNode' 