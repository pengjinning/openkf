import { useCallback, useEffect, useState } from 'react'

interface Point {
  x: number
  y: number
}

interface UseDraggableOptions {
  onDragStart?: () => void
  onDragEnd?: () => void
  onDrag?: (delta: Point) => void
}

export const useDraggable = (options: UseDraggableOptions = {}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState<Point>({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return

      const delta = {
        x: e.clientX - startPos.x,
        y: e.clientY - startPos.y,
      }

      options.onDrag?.(delta)
      setStartPos({ x: e.clientX, y: e.clientY })
    },
    [isDragging, startPos, options]
  )

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    setIsDragging(false)
    options.onDragEnd?.()
  }, [isDragging, options])

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      setStartPos({ x: e.clientX, y: e.clientY })
      options.onDragStart?.()
    },
    [options]
  )

  return {
    isDragging,
    handleMouseDown,
  }
} 