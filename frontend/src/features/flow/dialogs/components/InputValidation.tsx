import { FC } from 'react'
import { Stack, Select, Input, Switch, Text } from '@/components/ui'

interface ValidationConfig {
  type?: string
  regex?: string
  min?: number
  max?: number
  required?: boolean
}

interface InputValidationProps {
  validation?: ValidationConfig
  onChange: (validation: ValidationConfig) => void
}

export const InputValidation: FC<InputValidationProps> = ({ validation = {}, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...validation,
      [field]: value
    })
  }

  return (
    <Stack spacing={4}>
      <Select
        label="Validation Type"
        value={validation.type || 'text'}
        onChange={e => handleChange('type', e.target.value)}
        aria-label="Select input validation type"
        title="Select validation type"
      >
        <option value="text">Text</option>
        <option value="number">Number</option>
        <option value="email">Email</option>
        <option value="phone">Phone</option>
        <option value="url">URL</option>
      </Select>

      {validation.type === 'text' && (
        <Stack spacing={1}>
          <Input
            label="Regex Pattern"
            value={validation.regex || ''}
            onChange={e => handleChange('regex', e.target.value)}
            placeholder="Enter regex pattern..."
            aria-label="Regular expression pattern for validation"
          />
          <Text fontSize="sm" color="gray.500">
            Leave empty for no pattern validation
          </Text>
        </Stack>
      )}

      {validation.type === 'number' && (
        <Stack direction="row" spacing={2}>
          <Input
            type="number"
            label="Min Value"
            value={validation.min ?? ''}
            onChange={e => handleChange('min', e.target.value ? Number(e.target.value) : undefined)}
            aria-label="Minimum allowed value"
          />
          <Input
            type="number"
            label="Max Value"
            value={validation.max ?? ''}
            onChange={e => handleChange('max', e.target.value ? Number(e.target.value) : undefined)}
            aria-label="Maximum allowed value"
          />
        </Stack>
      )}

      <Switch
        label="Required Field"
        isChecked={validation.required}
        onChange={e => handleChange('required', e.target.checked)}
        aria-label="Make input field required"
      />
    </Stack>
  )
} 