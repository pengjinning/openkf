import { FC } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Stack, Button } from '@/components/ui'
import { Block } from '@/types/flow'

interface BlockEditorDialogProps {
  isOpen: boolean
  onClose: () => void
  block: Block
  onSave: (block: Block) => void
  title?: string
  children: React.ReactNode
}

export const BlockEditorDialog: FC<BlockEditorDialogProps> = ({
  isOpen,
  onClose,
  block,
  onSave,
  title,
  children
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {title || `Edit ${block.type} Block`}
          </DialogTitle>
        </DialogHeader>

        <Stack spacing={4}>
          {children}

          <Stack direction="row" justify="flex-end" spacing={2}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(block)}>
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
} 