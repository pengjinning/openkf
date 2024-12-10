import { FC, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Stack, Button } from '@/components/ui'
import { Template } from '@/types/template'
import { TemplateForm } from '../components/TemplateForm'

interface TemplateDialogProps {
  isOpen: boolean
  onClose: () => void
  template?: Template
  onSave: (template: Partial<Template>) => void
}

export const TemplateDialog: FC<TemplateDialogProps> = ({
  isOpen,
  onClose,
  template,
  onSave
}) => {
  const [editingTemplate, setEditingTemplate] = useState<Partial<Template>>(
    template || {
      name: '',
      description: '',
      category: '',
      isPublic: false
    }
  )

  const handleSave = () => {
    onSave(editingTemplate)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {template ? 'Edit Template' : 'Create Template'}
          </DialogTitle>
        </DialogHeader>

        <Stack spacing={4}>
          <TemplateForm
            template={editingTemplate}
            onChange={setEditingTemplate}
          />

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