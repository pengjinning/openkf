import { FC } from 'react'
import { Stack, Text, Textarea } from '@/components/ui'
import { Block } from '@/types/flow'
import { BlockEditorDialog } from './BlockEditorDialog'

interface TextBlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
}

export const TextBlockEditor: FC<TextBlockEditorProps> = ({ block, ...props }) => {
  const handleContentChange = (content: string) => {
    block.data = {
      ...block.data,
      content
    }
  }

  return (
    <BlockEditorDialog block={block} {...props}>
      <Stack spacing={3}>
        <Stack spacing={2}>
          <Text fontSize="sm" color="gray.500" id="content-label">
            Message Content
          </Text>
          <Textarea
            value={block.data?.content || ''}
            onChange={e => handleContentChange(e.target.value)}
            placeholder="Enter your message..."
            rows={5}
            aria-labelledby="content-label"
          />
        </Stack>
      </Stack>
    </BlockEditorDialog>
  )
} 