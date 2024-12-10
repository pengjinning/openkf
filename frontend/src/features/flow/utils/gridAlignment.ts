import { XYPosition } from 'reactflow'

interface GridConfig {
  gridSize: number
  snapThreshold: number
  enabled: boolean
}

export const snapToGrid = (
  position: XYPosition,
  config: GridConfig = { gridSize: 20, snapThreshold: 10, enabled: true }
): XYPosition => {
  if (!config.enabled) return position

  const { gridSize, snapThreshold } = config

  const snapToGridLine = (value: number): number => {
    const remainder = value % gridSize
    const shouldSnap = Math.abs(remainder) < snapThreshold

    if (shouldSnap) {
      return value - remainder
    }

    const shouldSnapToNext = Math.abs(remainder - gridSize) < snapThreshold
    if (shouldSnapToNext) {
      return value + (gridSize - remainder)
    }

    return value
  }

  return {
    x: snapToGridLine(position.x),
    y: snapToGridLine(position.y)
  }
}

export const renderGrid = (config: GridConfig) => {
  if (!config.enabled) return null

  const { gridSize } = config
  const width = 2000
  const height = 2000

  const horizontalLines = []
  const verticalLines = []

  for (let i = 0; i < width; i += gridSize) {
    verticalLines.push(
      <line
        key={`v-${i}`}
        x1={i}
        y1={0}
        x2={i}
        y2={height}
        stroke="#e2e8f0"
        strokeWidth={1}
      />
    )
  }

  for (let i = 0; i < height; i += gridSize) {
    horizontalLines.push(
      <line
        key={`h-${i}`}
        x1={0}
        y1={i}
        x2={width}
        y2={i}
        stroke="#e2e8f0"
        strokeWidth={1}
      />
    )
  }

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      {verticalLines}
      {horizontalLines}
    </svg>
  )
} 