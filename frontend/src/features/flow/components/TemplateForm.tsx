import { FC } from 'react'
import { Stack, Input, Textarea, Switch } from '@/components/ui'
import { Template } from '@/types/template'

interface TemplateFormProps {
  template: Partial<Template>
  onChange: (template: Partial<Template>) => void
}

export const TemplateForm: FC<TemplateFormProps> = ({ template, onChange }) => {
  const handleChange = (field: keyof Template, value: any) => {
    onChange({
      ...template,
      [field]: value
    })
  }

  return (
    <Stack spacing={4}>
      <Input
        label="Template Name"
        value={template.name || ''}
        onChange={e => handleChange('name', e.target.value)}
        placeholder="Enter template name..."
        aria-label="Template name"
      />

      <Textarea
        label="Description"
        value={template.description || ''}
        onChange={e => handleChange('description', e.target.value)}
        placeholder="Enter template description..."
        rows={3}
        aria-label="Template description"
      />

      <Input
        label="Category"
        value={template.category || ''}
        onChange={e => handleChange('category', e.target.value)}
        placeholder="Enter template category..."
        aria-label="Template category"
      />

      <Switch
        label="Make Public"
        isChecked={template.isPublic}
        onChange={e => handleChange('isPublic', e.target.checked)}
        aria-label="Make template public"
      />
    </Stack>
  )
} 