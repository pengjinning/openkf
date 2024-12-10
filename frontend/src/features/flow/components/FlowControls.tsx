import { FC } from 'react'
import { Stack, IconButton, Tooltip, Box } from '@/components/ui'
import {
  ZoomInIcon,
  ZoomOutIcon,
  ZoomFitIcon,
  LockIcon,
  UnlockIcon,
  GridIcon
} from '@/components/icons'
import { useReactFlow } from 'reactflow'

interface FlowControlsProps {
  locked?: boolean
  onToggleLock?: () => void
  showGrid?: boolean
  onToggleGrid?: () => void
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export const FlowControls: FC<FlowControlsProps> = ({
  locked,
  onToggleLock,
  showGrid,
  onToggleGrid,
  position = 'bottom-right'
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow()

  const positionStyles = {
    'top-left': { top: 20, left: 20 },
    'top-right': { top: 20, right: 20 },
    'bottom-left': { bottom: 20, left: 20 },
    'bottom-right': { bottom: 20, right: 20 }
  }

  return (
    <Box
      position="absolute"
      {...positionStyles[position]}
      zIndex={100}
    >
      <Stack
        bg="white"
        p={2}
        borderRadius="md"
        shadow="md"
        spacing={2}
      >
        <Tooltip label="放大" placement="left">
          <IconButton
            icon={<ZoomInIcon />}
            onClick={() => zoomIn()}
            aria-label="Zoom in"
            size="sm"
          />
        </Tooltip>

        <Tooltip label="缩小" placement="left">
          <IconButton
            icon={<ZoomOutIcon />}
            onClick={() => zoomOut()}
            aria-label="Zoom out"
            size="sm"
          />
        </Tooltip>

        <Tooltip label="适应视图" placement="left">
          <IconButton
            icon={<ZoomFitIcon />}
            onClick={() => fitView()}
            aria-label="Fit view"
            size="sm"
          />
        </Tooltip>

        {onToggleLock && (
          <Tooltip label={locked ? '解锁画布' : '锁定画布'} placement="left">
            <IconButton
              icon={locked ? <LockIcon /> : <UnlockIcon />}
              onClick={onToggleLock}
              aria-label={locked ? 'Unlock canvas' : 'Lock canvas'}
              size="sm"
            />
          </Tooltip>
        )}

        {onToggleGrid && (
          <Tooltip label={showGrid ? '隐藏网格' : '显示网格'} placement="left">
            <IconButton
              icon={<GridIcon />}
              onClick={onToggleGrid}
              aria-label={showGrid ? 'Hide grid' : 'Show grid'}
              size="sm"
            />
          </Tooltip>
        )}
      </Stack>
    </Box>
  )
} 