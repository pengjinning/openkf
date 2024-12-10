import { FC, useEffect, useState } from 'react'
import { Box, Text, Badge } from '@/components/ui'
import { nodeConfig } from '../constants/nodeTypes'

interface NodeDragPreviewProps {
  type: string
  isDragging: boolean
  offset?: { x: number; y: number }
}

export const NodeDragPreview: FC<NodeDragPreviewProps> = ({ 
  type, 
  isDragging,
  offset = { x: 0, y: 0 }
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const config = nodeConfig[type]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX + offset.x,
          y: e.clientY + offset.y
        })
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [isDragging, offset])

  if (!isDragging || !config) return null

  return (
    <Box
      position="fixed"
      left={position.x}
      top={position.y}
      transform="translate(-50%, -50%)"
      pointerEvents="none"
      bg="white"
      borderWidth={2}
      borderStyle="dashed"
      borderColor={`${config.color}.500`}
      borderRadius="md"
      shadow="lg"
      p={3}
      minW="200px"
      opacity={0.8}
      zIndex={9999}
    >
      <Stack direction="row" align="center" spacing={2}>
        <Badge colorScheme={config.color}>
          {config.label}
        </Badge>
        <Text fontSize="sm" color="gray.600">
          {config.description}
        </Text>
      </Stack>
    </Box>
  )
} 