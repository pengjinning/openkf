import { FC, useState } from 'react'
import { Stack, Input, Select, Button, Textarea, Switch } from '@/components/ui'
import { Block, ApiBlockData } from '@/types/block'

interface ApiBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const ApiBlockEditor: FC<ApiBlockEditorProps> = ({ block, onChange }) => {
  const [showHeaders, setShowHeaders] = useState(!!block.data?.headers)
  const [showBody, setShowBody] = useState(!!block.data?.body)

  const handleChange = (field: keyof ApiBlockData, value: any) => {
    onChange({
      ...block,
      data: {
        ...block.data,
        [field]: value
      }
    })
  }

  return (
    <Stack spacing={4}>
      <Input
        label="URL"
        value={block.data?.url || ''}
        onChange={e => handleChange('url', e.target.value)}
        placeholder="Enter API URL..."
        aria-describedby="url-help"
      />
      <div id="url-help" className="text-sm text-gray-500">
        You can use variables in the URL using {'{variableName}'} syntax
      </div>

      <Select
        label="HTTP Method"
        value={block.data?.method || 'GET'}
        onChange={e => handleChange('method', e.target.value)}
        aria-label="Select HTTP method"
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="DELETE">DELETE</option>
      </Select>

      <Stack spacing={2}>
        <Switch
          label="Include Custom Headers"
          isChecked={showHeaders}
          onChange={e => {
            setShowHeaders(e.target.checked)
            if (!e.target.checked) {
              handleChange('headers', undefined)
            }
          }}
        />
        {showHeaders && (
          <Textarea
            label="Headers (JSON)"
            value={block.data?.headers ? JSON.stringify(block.data.headers, null, 2) : ''}
            onChange={e => {
              try {
                const headers = JSON.parse(e.target.value)
                handleChange('headers', headers)
              } catch (error) {
                // Invalid JSON - keep the text but don't update headers
              }
            }}
            placeholder={'{\n  "Content-Type": "application/json",\n  "Authorization": "Bearer {{token}}"\n}'}
            rows={4}
            fontFamily="mono"
            aria-describedby="headers-help"
          />
        )}
        <div id="headers-help" className="text-sm text-gray-500">
          Enter headers as JSON object. You can use variables with {'{variableName}'} syntax
        </div>
      </Stack>

      <Stack spacing={2}>
        <Switch
          label="Include Request Body"
          isChecked={showBody}
          onChange={e => {
            setShowBody(e.target.checked)
            if (!e.target.checked) {
              handleChange('body', undefined)
            }
          }}
        />
        {showBody && (
          <Textarea
            label="Request Body (JSON)"
            value={block.data?.body || ''}
            onChange={e => handleChange('body', e.target.value)}
            placeholder={'{\n  "key": "{{variable}}"\n}'}
            rows={4}
            fontFamily="mono"
            aria-describedby="body-help"
          />
        )}
        <div id="body-help" className="text-sm text-gray-500">
          Enter request body as JSON. You can use variables with {{variableName}}
        </div>
      </Stack>

      <Input
        label="Store Response In Variable"
        value={block.data?.resultVariable || ''}
        onChange={e => handleChange('resultVariable', e.target.value)}
        placeholder="Enter variable name"
        aria-describedby="variable-help"
      />
      <div id="variable-help" className="text-sm text-gray-500">
        The API response will be stored in this variable
      </div>

      <Input
        label="Request Timeout"
        type="number"
        value={block.data?.timeout || 5000}
        onChange={e => handleChange('timeout', parseInt(e.target.value))}
        min={1000}
        max={30000}
        step={1000}
        aria-describedby="timeout-help"
      />
      <div id="timeout-help" className="text-sm text-gray-500">
        Maximum time to wait for response (in milliseconds)
      </div>
    </Stack>
  )
} 