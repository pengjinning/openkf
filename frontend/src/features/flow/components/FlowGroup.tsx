import { FC } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { Group } from '@/types/flow'
import { FlowBlock } from './FlowBlock'
import { useFlowStore } from '../store/flowStore'
import { useDraggable } from '@/hooks/useDraggable'

interface FlowGroupProps {
  group: Group
}

export const FlowGroup: FC<FlowGroupProps> = ({ group }) => {
  const updateGroup = useFlowStore((state) => state.updateGroup)
  const setIsDragging = useFlowStore((state) => state.setIsDragging)

  const { isDragging, handleMouseDown } = useDraggable({
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
    onDrag: (delta) => {
      updateGroup(group.id, {
        graphCoordinates: {
          x: group.graphCoordinates.x + delta.x,
          y: group.graphCoordinates.y + delta.y,
        },
      })
    },
  })

  return (
    <Box
      position="absolute"
      left={group.graphCoordinates.x}
      top={group.graphCoordinates.y}
      bg="white"
      borderRadius="md"
      shadow="sm"
      minW="250px"
      cursor={isDragging ? 'grabbing' : 'grab'}
      onMouseDown={handleMouseDown}
    >
      <Box p={4} borderBottomWidth={1}>
        <Text fontWeight="medium">{group.title}</Text>
      </Box>
      <Box p={2}>
        {group.blocks.map((block, index) => (
          <FlowBlock
            key={block.id}
            block={block}
            isFirst={index === 0}
            isLast={index === group.blocks.length - 1}
          />
        ))}
      </Box>
    </Box>
  )
}
