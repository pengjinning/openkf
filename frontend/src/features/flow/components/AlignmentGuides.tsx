import { FC } from 'react'
import { GuideLines } from '../utils/alignmentGuides'

interface AlignmentGuidesProps {
  guides: GuideLines
}

export const AlignmentGuides: FC<AlignmentGuidesProps> = ({ guides }) => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    >
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
        />
      ))}
    </svg>
  )
} 