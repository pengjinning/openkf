import { FC, useState } from 'react'
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Stack,
  Button,
  Select,
  Input,
  Textarea
} from '@/components/ui'
import { Block, BlockType } from '@/types/block'
import { ChoiceBlockEditor } from './ChoiceBlockEditor'
import { ConditionBlockEditor } from './ConditionBlockEditor'
import { ApiBlockEditor } from './ApiBlockEditor'

interface BlockEditorProps {
  isOpen: boolean
  onClose: () => void
  block?: Block
  onSave: (block: Block) => void
}

export const BlockEditor: FC<BlockEditorProps> = ({
  isOpen,
  onClose,
  block,
  onSave
}) => {
  const [editingBlock, setEditingBlock] = useState<Block>(
    block || {
      id: `block-${Date.now()}`,
      type: BlockType.TEXT,
      data: {
        content: '',
        label: ''
      }
    }
  )

  const handleChange = (field: string, value: any) => {
    setEditingBlock(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    onSave(editingBlock)
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{block ? 'Edit Block' : 'Add Block'}</DialogTitle>
        </DialogHeader>

        <Stack spacing={4}>
          <Select
            label="Block Type"
            value={editingBlock.type}
            onChange={e => setEditingBlock(prev => ({ 
              ...prev, 
              type: e.target.value as BlockType,
              data: {} // Reset data when type changes
            }))}
            title="Select block type"
          >
            <option value={BlockType.TEXT}>Text</option>
            <option value={BlockType.INPUT}>Input</option>
            <option value={BlockType.CHOICE}>Choice</option>
            <option value={BlockType.CONDITION}>Condition</option>
            <option value={BlockType.API}>API</option>
          </Select>

          {editingBlock.type === BlockType.TEXT && (
            <Textarea
              label="Content"
              value={editingBlock.data?.content || ''}
              onChange={e => handleChange('content', e.target.value)}
              placeholder="Enter text content..."
              minHeight="100px"
            />
          )}

          {editingBlock.type === BlockType.INPUT && (
            <>
              <Input
                label="Question"
                value={editingBlock.data?.content || ''}
                onChange={e => handleChange('content', e.target.value)}
                placeholder="Enter question..."
              />
              <Input
                label="Variable Name"
                value={editingBlock.options?.variableName || ''}
                onChange={e => setEditingBlock({
                  ...editingBlock,
                  options: { ...editingBlock.options, variableName: e.target.value }
                })}
                placeholder="Enter variable name..."
              />
            </>
          )}

          {editingBlock.type === BlockType.CHOICE && (
            <ChoiceBlockEditor
              block={editingBlock}
              onChange={setEditingBlock}
            />
          )}

          {editingBlock.type === BlockType.CONDITION && (
            <ConditionBlockEditor
              block={editingBlock}
              onChange={setEditingBlock}
            />
          )}

          {editingBlock.type === BlockType.API && (
            <ApiBlockEditor
              block={editingBlock}
              onChange={setEditingBlock}
            />
          )}

          <Stack direction="row" justify="flex-end" spacing={2}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
} 