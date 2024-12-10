import { FC } from 'react'
import { Stack, Input, Switch, NumberInput } from '@/components/ui'
import { Block, RedirectBlockOptions } from '@/types/block'

interface RedirectBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const RedirectBlockEditor: FC<RedirectBlockEditorProps> = ({ block, onChange }) => {
  const options = block.options as RedirectBlockOptions

  const handleChange = (field: keyof RedirectBlockOptions, value: any) => {
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
        label="Redirect URL"
        value={options?.url || ''}
        onChange={e => handleChange('url', e.target.value)}
        placeholder="https://example.com"
        aria-describedby="url-help"
      />
      <div id="url-help" className="text-sm text-gray-500">
        You can use variables in the URL using {{variableName}} syntax
      </div>

      <Switch
        label="Open in New Tab"
        isChecked={options?.newTab}
        onChange={e => handleChange('newTab', e.target.checked)}
        aria-describedby="newtab-help"
      />
      <div id="newtab-help" className="text-sm text-gray-500">
        The URL will be opened in a new browser tab
      </div>

      <NumberInput
        label="Delay Before Redirect (ms)"
        value={options?.delay || 0}
        onChange={value => handleChange('delay', value)}
        min={0}
        max={10000}
        step={100}
        aria-describedby="delay-help"
      />
      <div id="delay-help" className="text-sm text-gray-500">
        Wait this many milliseconds before redirecting (0-10000ms)
      </div>
    </Stack>
  )
} 