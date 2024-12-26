import { FC } from 'react'
import {
  Box,
  HStack,
  IconButton,
  Button,
  Tooltip,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import {
  RepeatIcon,
  RepeatClockIcon,
  CheckIcon,
  AddIcon,
  MinusIcon,
  ViewIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  DeleteIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons'
import { Flow } from '@/types/flow'
import { useFlowStore } from '../store/flowStore'

interface FlowToolbarProps {
  flow: Flow
  onSave: () => void
}

export const FlowToolbar: FC<FlowToolbarProps> = ({ flow, onSave }) => {
  const selectedBlockId = useFlowStore((state) => state.selectedBlockId)
  const updateGroup = useFlowStore((state) => state.updateGroup)
  const undo = useFlowStore((state) => state.undo)
  const redo = useFlowStore((state) => state.redo)

  const handleAlignBlocks = (alignment: string) => {
    if (!selectedBlockId || !flow) return

    const selectedGroup = flow.groups.find(g => 
      g.blocks.some(b => b.id === selectedBlockId)
    )
    if (!selectedGroup) return

    let newCoordinates = { ...selectedGroup.graphCoordinates }
    
    switch (alignment) {
      case 'left':
        newCoordinates.x = 100
        break
      case 'center':
        newCoordinates.x = window.innerWidth / 2 - 125
        break
      case 'right':
        newCoordinates.x = window.innerWidth - 350
        break
      case 'top':
        newCoordinates.y = 100
        break
      case 'middle':
        newCoordinates.y = window.innerHeight / 2 - 100
        break
      case 'bottom':
        newCoordinates.y = window.innerHeight - 200
        break
    }

    updateGroup(selectedGroup.id, { graphCoordinates: newCoordinates })
  }

  return (
    <Box px={4} py={2} borderBottomWidth={1} bg="white">
      <HStack spacing={4}>
        {/* History */}
        <HStack spacing={2}>
          <Tooltip label="Undo (Ctrl+Z)">
            <IconButton
              icon={<RepeatIcon />}
              aria-label="Undo"
              size="sm"
              variant="ghost"
              onClick={undo}
            />
          </Tooltip>
          <Tooltip label="Redo (Ctrl+Shift+Z)">
            <IconButton
              icon={<RepeatClockIcon />}
              aria-label="Redo"
              size="sm"
              variant="ghost"
              onClick={redo}
            />
          </Tooltip>
        </HStack>

        <Divider orientation="vertical" h="24px" />

        {/* Zoom */}
        <HStack spacing={2}>
          <Tooltip label="Zoom in">
            <IconButton
              icon={<AddIcon />}
              aria-label="Zoom in"
              size="sm"
              variant="ghost"
            />
          </Tooltip>
          <Tooltip label="Zoom out">
            <IconButton
              icon={<MinusIcon />}
              aria-label="Zoom out"
              size="sm"
              variant="ghost"
            />
          </Tooltip>
          <Tooltip label="Fit view">
            <IconButton
              icon={<ViewIcon />}
              aria-label="Fit view"
              size="sm"
              variant="ghost"
            />
          </Tooltip>
        </HStack>

        <Divider orientation="vertical" h="24px" />

        {/* Alignment */}
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            leftIcon={<ArrowDownIcon />}
          >
            Align
          </MenuButton>
          <MenuList>
            <MenuItem icon={<ChevronLeftIcon />} onClick={() => handleAlignBlocks('left')}>
              Left
            </MenuItem>
            <MenuItem icon={<ArrowDownIcon />} onClick={() => handleAlignBlocks('center')}>
              Center
            </MenuItem>
            <MenuItem icon={<ChevronRightIcon />} onClick={() => handleAlignBlocks('right')}>
              Right
            </MenuItem>
            <MenuItem icon={<ChevronUpIcon />} onClick={() => handleAlignBlocks('top')}>
              Top
            </MenuItem>
            <MenuItem icon={<ArrowUpIcon />} onClick={() => handleAlignBlocks('middle')}>
              Middle
            </MenuItem>
            <MenuItem icon={<ChevronDownIcon />} onClick={() => handleAlignBlocks('bottom')}>
              Bottom
            </MenuItem>
          </MenuList>
        </Menu>

        <Divider orientation="vertical" h="24px" />

        {/* Actions */}
        <HStack spacing={2}>
          <Button
            leftIcon={<CheckIcon />}
            size="sm"
            colorScheme="blue"
            variant="solid"
            onClick={onSave}
          >
            Save
          </Button>
          <Tooltip label="Preview">
            <IconButton
              icon={<ExternalLinkIcon />}
              aria-label="Preview"
              size="sm"
              variant="ghost"
            />
          </Tooltip>
          <Tooltip label="Delete">
            <IconButton
              icon={<DeleteIcon />}
              aria-label="Delete"
              size="sm"
              variant="ghost"
              colorScheme="red"
            />
          </Tooltip>
        </HStack>
      </HStack>
    </Box>
  )
}