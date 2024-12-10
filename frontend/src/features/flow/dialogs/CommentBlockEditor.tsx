import { FC } from 'react'
import { Stack, Text, Input, Textarea, Select } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'

interface CommentBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const CommentBlockEditor: FC<CommentBlockEditorProps> = ({ block, ...props }) => {
  const handleChange = (field: string, value: string) => {
    block.data = {
      ...block.data,
      [field]: value
    }
  }

  return (
    <BlockEditorDialog block={block} {...props}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="label-input">
            Label
          </Text>
          <Input
            value={block.data?.label || ''}
            onChange={e => handleChange('label', e.target.value)}
            placeholder="Enter note label..."
            aria-labelledby="label-input"
          />
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="content-input">
            Content
          </Text>
          <Textarea
            value={block.data?.content || ''}
            onChange={e => handleChange('content', e.target.value)}
            placeholder="Enter note content..."
            rows={5}
            aria-labelledby="content-input"
          />
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="color-input">
            Color
          </Text>
          <Select
            value={block.data?.color || 'gray'}
            onChange={e => handleChange('color', e.target.value)}
            aria-labelledby="color-input"
            title="Select note color"
          >
            <option value="gray">Gray</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="purple">Purple</option>
            <option value="cyan">Cyan</option>
            <option value="pink">Pink</option>
          </Select>
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="position-input">
            Position
          </Text>
          <Stack direction="row" spacing={2}>
            <Input
              type="number"
              value={block.data?.position?.x || 0}
              onChange={e => handleChange('position.x', e.target.value)}
              placeholder="X position"
              aria-label="X position"
            />
            <Input
              type="number"
              value={block.data?.position?.y || 0}
              onChange={e => handleChange('position.y', e.target.value)}
              placeholder="Y position"
              aria-label="Y position"
            />
          </Stack>
        </Stack>

        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="zindex-input">
            Z-Index
          </Text>
          <Input
            type="number"
            value={block.data?.zIndex || 0}
            onChange={e => handleChange('zIndex', e.target.value)}
            placeholder="Enter z-index..."
            aria-labelledby="zindex-input"
          />
        </Stack>
      </Stack>
    </BlockEditorDialog>
  )
} 