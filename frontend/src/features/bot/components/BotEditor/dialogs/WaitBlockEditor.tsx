import { FC } from 'react'
import { Stack, Input, Switch } from '@/components/ui'
import { Block, WaitBlockOptions } from '@/types/block'

interface WaitBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const WaitBlockEditor: FC<WaitBlockEditorProps> = ({ block, onChange }) => {
  const options = block.options as WaitBlockOptions

  const handleChange = (field: keyof WaitBlockOptions, value: any) => {
    onChange({
      ...block,
      options: {
        ...options,
        [field]: value
      }
    })
  }

  return (
    <Stack spacing={4}>
      <Input
        label="Wait Duration (seconds)"
        type="number"
        value={options?.delay || 1}
        onChange={e => handleChange('delay', parseInt(e.target.value))}
        min={1}
        max={300}
        step={1}
        aria-describedby="delay-help"
      />
      <div id="delay-help" className="text-sm text-gray-500">
        How long to wait before continuing (1-300 seconds)
      </div>

      <Input
        label="Display Message (optional)"
        value={options?.message || ''}
        onChange={e => handleChange('message', e.target.value)}
        placeholder="Message to show while waiting..."
        aria-describedby="message-help"
      />
      <div id="message-help" className="text-sm text-gray-500">
        This message will be shown during the wait period
      </div>

      <Switch
        label="Show Progress Bar"
        isChecked={options?.showProgress}
        onChange={e => handleChange('showProgress', e.target.checked)}
        aria-describedby="progress-help"
      />
      <div id="progress-help" className="text-sm text-gray-500">
        Display a progress bar during the wait period
      </div>
    </Stack>
  )
} 