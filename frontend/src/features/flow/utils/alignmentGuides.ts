import { Node, XYPosition } from 'reactflow'

interface GuideLines {
  vertical: number[]
  horizontal: number[]
}

interface AlignmentResult {
  position: XYPosition
  guides: GuideLines
}

const SNAP_THRESHOLD = 5
const GUIDE_GAP = 20

export const getAlignmentGuides = (
  node: Node,
  nodes: Node[],
  position: XYPosition
): AlignmentResult => {
  const otherNodes = nodes.filter(n => n.id !== node.id)
  const guides: GuideLines = {
    vertical: [],
    horizontal: []
  }

  // 获取当前节点的边界
  const nodeBounds = {
    left: position.x,
    right: position.x + (node.width || 0),
    top: position.y,
    bottom: position.y + (node.height || 0),
    centerX: position.x + (node.width || 0) / 2,
    centerY: position.y + (node.height || 0) / 2
  }

  // 遍历其他节点寻找对齐点
  otherNodes.forEach(otherNode => {
    const otherBounds = {
      left: otherNode.position.x,
      right: otherNode.position.x + (otherNode.width || 0),
      top: otherNode.position.y,
      bottom: otherNode.position.y + (otherNode.height || 0),
      centerX: otherNode.position.x + (otherNode.width || 0) / 2,
      centerY: otherNode.position.y + (otherNode.height || 0) / 2
    }

    // 垂直对齐
    const verticalAlignments = [
      { value: otherBounds.left, target: nodeBounds.left },
      { value: otherBounds.centerX, target: nodeBounds.centerX },
      { value: otherBounds.right, target: nodeBounds.right }
    ]

    verticalAlignments.forEach(({ value, target }) => {
      if (Math.abs(value - target) < SNAP_THRESHOLD) {
        guides.vertical.push(value)
        position.x = value - (target - nodeBounds.left)
      }
    })

    // 水平对齐
    const horizontalAlignments = [
      { value: otherBounds.top, target: nodeBounds.top },
      { value: otherBounds.centerY, target: nodeBounds.centerY },
      { value: otherBounds.bottom, target: nodeBounds.bottom }
    ]

    horizontalAlignments.forEach(({ value, target }) => {
      if (Math.abs(value - target) < SNAP_THRESHOLD) {
        guides.horizontal.push(value)
        position.y = value - (target - nodeBounds.top)
      }
    })

    // 添加间距辅助线
    if (Math.abs(otherBounds.right - nodeBounds.left - GUIDE_GAP) < SNAP_THRESHOLD) {
      guides.vertical.push(otherBounds.right + GUIDE_GAP)
      position.x = otherBounds.right + GUIDE_GAP
    }

    if (Math.abs(nodeBounds.right - otherBounds.left - GUIDE_GAP) < SNAP_THRESHOLD) {
      guides.vertical.push(otherBounds.left - GUIDE_GAP)
      position.x = otherBounds.left - GUIDE_GAP - (node.width || 0)
    }
  })

  return { position, guides }
}

export const renderAlignmentGuides = (guides: GuideLines) => {
  return (
    <>
      {guides.vertical.map((position, index) => (
        <line
          key={`v-${index}`}
          x1={position}
          y1={0}
          x2={position}
          y2="100%"
          stroke="#2563eb"
          strokeWidth={1}
          strokeDasharray="4"
          style={{ pointerEvents: 'none' }}
        />
      ))}
      {guides.horizontal.map((position, index) => (
        <line
          key={`h-${index}`}
          x1={0}
          y1={position}
          x2="100%"
          y2={position}
          stroke="#2563eb"
          strokeWidth={1}
          strokeDasharray="4"
          style={{ pointerEvents: 'none' }}
        />
      ))}
    </>
  )
} 