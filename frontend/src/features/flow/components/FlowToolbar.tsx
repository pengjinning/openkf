import { FC } from 'react'
import { 
  Stack, 
  IconButton, 
  Button, 
  Divider,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure
} from '@/components/ui'
import {
  UndoIcon,
  RedoIcon,
  SaveIcon,
  PlayIcon,
  DownloadIcon,
  UploadIcon,
  DeleteIcon,
  ZoomInIcon,
  ZoomOutIcon,
  ZoomFitIcon,
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  AlignTopIcon,
  AlignMiddleIcon,
  AlignBottomIcon,
  GridIcon,
  SearchIcon
} from '@/components/icons'
import { Flow } from '@/types/flow'
import { useReactFlow } from 'reactflow'
import { FlowExportDialog } from '../dialogs/FlowExportDialog'
import { FlowImportDialog } from '../dialogs/FlowImportDialog'
import { FlowSearch } from './FlowSearch'

interface FlowToolbarProps {
  flow: Flow
  onSave?: () => void
  onUndo?: () => void
  onRedo?: () => void
  onPreview?: () => void
  onDelete?: () => void
  canUndo?: boolean
  canRedo?: boolean
  isDirty?: boolean
  selectedNodes?: string[]
  onAlignNodes?: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void
  onToggleGrid?: () => void
  showGrid?: boolean
}

export const FlowToolbar: FC<FlowToolbarProps> = ({
  flow,
  onSave,
  onUndo,
  onRedo,
  onPreview,
  onDelete,
  canUndo = false,
  canRedo = false,
  isDirty = false,
  selectedNodes = [],
  onAlignNodes,
  onToggleGrid,
  showGrid
}) => {
  const { zoomIn, zoomOut, fitView } = useReactFlow()
  const exportDialog = useDisclosure()
  const importDialog = useDisclosure()
  const searchDialog = useDisclosure()

  const hasSelectedNodes = selectedNodes.length > 1

  return (
    <>
      <Stack
        direction="row"
        align="center"
        spacing={2}
        p={2}
        bg="white"
        borderBottomWidth={1}
        borderColor="gray.200"
      >
        {/* 历史操作 */}
        <Stack direction="row" spacing={1}>
          <Tooltip label="撤销 (Ctrl+Z)" placement="bottom">
            <IconButton
              icon={<UndoIcon />}
              onClick={onUndo}
              isDisabled={!canUndo}
              aria-label="Undo"
            />
          </Tooltip>
          <Tooltip label="重做 (Ctrl+Y)" placement="bottom">
            <IconButton
              icon={<RedoIcon />}
              onClick={onRedo}
              isDisabled={!canRedo}
              aria-label="Redo"
            />
          </Tooltip>
        </Stack>

        <Divider orientation="vertical" h="24px" />

        {/* 视图控制 */}
        <Stack direction="row" spacing={1}>
          <Tooltip label="放大 (Ctrl++)" placement="bottom">
            <IconButton
              icon={<ZoomInIcon />}
              onClick={() => zoomIn()}
              aria-label="Zoom in"
            />
          </Tooltip>
          <Tooltip label="缩小 (Ctrl+-)" placement="bottom">
            <IconButton
              icon={<ZoomOutIcon />}
              onClick={() => zoomOut()}
              aria-label="Zoom out"
            />
          </Tooltip>
          <Tooltip label="适应视图 (Ctrl+0)" placement="bottom">
            <IconButton
              icon={<ZoomFitIcon />}
              onClick={() => fitView()}
              aria-label="Fit view"
            />
          </Tooltip>
        </Stack>

        <Divider orientation="vertical" h="24px" />

        {/* 对齐工具 */}
        {hasSelectedNodes && onAlignNodes && (
          <Menu>
            <MenuButton as={Button} variant="ghost" size="sm">
              对齐
            </MenuButton>
            <MenuList>
              <MenuItem icon={<AlignLeftIcon />} onClick={() => onAlignNodes('left')}>
                左对齐
              </MenuItem>
              <MenuItem icon={<AlignCenterIcon />} onClick={() => onAlignNodes('center')}>
                水平居中
              </MenuItem>
              <MenuItem icon={<AlignRightIcon />} onClick={() => onAlignNodes('right')}>
                右对齐
              </MenuItem>
              <Divider />
              <MenuItem icon={<AlignTopIcon />} onClick={() => onAlignNodes('top')}>
                顶部对齐
              </MenuItem>
              <MenuItem icon={<AlignMiddleIcon />} onClick={() => onAlignNodes('middle')}>
                垂直居中
              </MenuItem>
              <MenuItem icon={<AlignBottomIcon />} onClick={() => onAlignNodes('bottom')}>
                底部对齐
              </MenuItem>
            </MenuList>
          </Menu>
        )}

        {/* 网格控制 */}
        {onToggleGrid && (
          <Tooltip label={showGrid ? '隐藏网格' : '显示网格'} placement="bottom">
            <IconButton
              icon={<GridIcon />}
              onClick={onToggleGrid}
              aria-label={showGrid ? 'Hide grid' : 'Show grid'}
              variant={showGrid ? 'solid' : 'ghost'}
            />
          </Tooltip>
        )}

        {/* 搜索 */}
        <Tooltip label="搜索节点 (Ctrl+F)" placement="bottom">
          <IconButton
            icon={<SearchIcon />}
            onClick={searchDialog.onOpen}
            aria-label="Search"
          />
        </Tooltip>

        <Divider orientation="vertical" h="24px" />

        {/* 主要操作 */}
        <Stack direction="row" spacing={1}>
          <Tooltip label="保存 (Ctrl+S)" placement="bottom">
            <Button
              leftIcon={<SaveIcon />}
              onClick={onSave}
              isDisabled={!isDirty}
              variant={isDirty ? 'solid' : 'ghost'}
              colorScheme={isDirty ? 'blue' : 'gray'}
            >
              保存
            </Button>
          </Tooltip>
          <Tooltip label="预览" placement="bottom">
            <IconButton
              icon={<PlayIcon />}
              onClick={onPreview}
              aria-label="Preview"
            />
          </Tooltip>
        </Stack>

        <Divider orientation="vertical" h="24px" />

        {/* 导入导出 */}
        <Stack direction="row" spacing={1}>
          <Tooltip label="导出" placement="bottom">
            <IconButton
              icon={<DownloadIcon />}
              onClick={exportDialog.onOpen}
              aria-label="Export"
            />
          </Tooltip>
          <Tooltip label="导入" placement="bottom">
            <IconButton
              icon={<UploadIcon />}
              onClick={importDialog.onOpen}
              aria-label="Import"
            />
          </Tooltip>
        </Stack>

        {/* 删除 */}
        <Stack direction="row" spacing={1} ml="auto">
          <Tooltip label="删除" placement="bottom">
            <IconButton
              icon={<DeleteIcon />}
              onClick={onDelete}
              colorScheme="red"
              variant="ghost"
              aria-label="Delete"
            />
          </Tooltip>
        </Stack>
      </Stack>

      {/* 对话框 */}
      <FlowExportDialog
        isOpen={exportDialog.isOpen}
        onClose={exportDialog.onClose}
        flow={flow}
      />
      <FlowImportDialog
        isOpen={importDialog.isOpen}
        onClose={importDialog.onClose}
        onImport={() => {
          // TODO: 处理导入
          importDialog.onClose()
        }}
      />
      <FlowSearch
        isOpen={searchDialog.isOpen}
        onClose={searchDialog.onClose}
        nodes={flow.blocks}
        onNodeSelect={() => {
          // TODO: 处理节点选择
          searchDialog.onClose()
        }}
      />
    </>
  )
} 