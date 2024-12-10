import { FC } from 'react'
import { Stack, Button, IconButton } from '@/components/ui'
import { EditIcon, DeleteIcon, CopyIcon, DownloadIcon } from '@/components/icons'
import { Template } from '@/types/template'
import { TemplateExport } from './TemplateExport'

interface TemplateActionsProps {
  template: Template
  onEdit?: () => void
  onDelete?: () => void
  onDuplicate?: () => void
  onError?: (error: string) => void
}

export const TemplateActions: FC<TemplateActionsProps> = ({
  template,
  onEdit,
  onDelete,
  onDuplicate,
  onError
}) => {
  return (
    <Stack direction="row" spacing={2}>
      {onEdit && (
        <IconButton
          aria-label={`Edit template ${template.name}`}
          icon={<EditIcon />}
          onClick={onEdit}
        />
      )}
      {onDuplicate && (
        <IconButton
          aria-label={`Duplicate template ${template.name}`}
          icon={<CopyIcon />}
          onClick={onDuplicate}
        />
      )}
      <TemplateExport
        templateId={template.id}
        templateName={template.name}
        onError={onError}
      />
      {onDelete && (
        <IconButton
          aria-label={`Delete template ${template.name}`}
          icon={<DeleteIcon />}
          colorScheme="red"
          onClick={onDelete}
        />
      )}
    </Stack>
  )
} 