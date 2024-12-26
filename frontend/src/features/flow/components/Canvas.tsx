import { FC, useRef, useState, useCallback } from 'react'
import { Box, useEventListener } from '@/components/ui'
import { Flow, Group } from '@/types/flow'
import { FlowGroup } from './FlowGroup'
import { useFlowStore } from '@/stores/flowStore'

interface Point {
  x: number
  y: number
}

interface CanvasProps {
  flow: Flow
  onGroupMove?: (groupId: string, position: Point) => void
}

export const Canvas: FC<CanvasProps> = ({ flow, onGroupMove }) => {
  const canvasRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<Point>({ x: 0, y: 0 })

  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? 0.9 : 1.1
      setScale(s => Math.min(Math.max(0.1, s * delta), 2))
    } else {
      setOffset(o => ({
        x: o.x - e.deltaX,
        y: o.y - e.deltaY
      }))
    }
  }, [])

  useEventListener('wheel', handleWheel, canvasRef, { passive: false })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) { // Middle mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Box
      ref={canvasRef}
      position="relative"
      w="full"
      h="full"
      bg="gray.50"
      overflow="hidden"
      cursor={isDragging ? 'grabbing' : 'default'}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <Box
        position="absolute"
        transform={`scale(${scale}) translate(${offset.x}px, ${offset.y}px)`}
        transformOrigin="0 0"
      >
        {flow.groups?.map((group) => (
          <FlowGroup
            key={group.id}
            group={group}
            onMove={onGroupMove}
          />
        ))}
      </Box>
    </Box>
  )
} 