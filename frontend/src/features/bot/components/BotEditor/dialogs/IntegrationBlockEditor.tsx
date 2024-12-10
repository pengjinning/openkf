import { FC } from 'react'
import { Stack, Select, Input, Textarea } from '@/components/ui'
import { Block, IntegrationBlockOptions } from '@/types/block'

interface IntegrationBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const IntegrationBlockEditor: FC<IntegrationBlockEditorProps> = ({ block, onChange }) => {
  const options = block.options as IntegrationBlockOptions

  const handleChange = (field: keyof IntegrationBlockOptions, value: any) => {
    onChange({
      ...block,
      options: {
        ...options,
        [field]: value
      }
    })
  }

  const handleConfigChange = (value: string) => {
    try {
      const config = JSON.parse(value)
      handleChange('config', config)
    } catch (error) {
      // Invalid JSON - keep the text but don't update config
    }
  }

  return (
    <Stack spacing={4}>
      <Select
        label="Integration Type"
        value={options?.type || 'webhook'}
        onChange={e => handleChange('type', e.target.value)}
        aria-label="Select integration type"
      >
        <option value="webhook">Webhook</option>
        <option value="googleSheets">Google Sheets</option>
        <option value="zapier">Zapier</option>
      </Select>

      {options?.type === 'webhook' && (
        <>
          <Input
            label="Webhook URL"
            value={options?.config?.url || ''}
            onChange={e => handleChange('config', { ...options?.config, url: e.target.value })}
            placeholder="https://api.example.com/webhook"
            aria-describedby="webhook-help"
          />
          <div id="webhook-help" className="text-sm text-gray-500">
            The URL that will receive the webhook POST request
          </div>
        </>
      )}

      {options?.type === 'googleSheets' && (
        <>
          <Input
            label="Spreadsheet ID"
            value={options?.config?.spreadsheetId || ''}
            onChange={e => handleChange('config', { ...options?.config, spreadsheetId: e.target.value })}
            placeholder="1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
            aria-describedby="sheets-id-help"
          />
          <div id="sheets-id-help" className="text-sm text-gray-500">
            The ID of your Google Sheets document
          </div>

          <Input
            label="Sheet Name"
            value={options?.config?.sheetName || ''}
            onChange={e => handleChange('config', { ...options?.config, sheetName: e.target.value })}
            placeholder="Sheet1"
            aria-describedby="sheet-name-help"
          />
          <div id="sheet-name-help" className="text-sm text-gray-500">
            The name of the sheet to write to
          </div>
        </>
      )}

      {options?.type === 'zapier' && (
        <>
          <Input
            label="Zap Webhook URL"
            value={options?.config?.webhookUrl || ''}
            onChange={e => handleChange('config', { ...options?.config, webhookUrl: e.target.value })}
            placeholder="https://hooks.zapier.com/hooks/catch/..."
            aria-describedby="zap-help"
          />
          <div id="zap-help" className="text-sm text-gray-500">
            The webhook URL provided by your Zapier trigger
          </div>
        </>
      )}

      <Textarea
        label="Advanced Configuration (JSON)"
        value={JSON.stringify(options?.config || {}, null, 2)}
        onChange={e => handleConfigChange(e.target.value)}
        placeholder="{\n  // Additional configuration options...\n}"
        rows={6}
        fontFamily="mono"
        aria-describedby="config-help"
      />
      <div id="config-help" className="text-sm text-gray-500">
        Additional configuration options in JSON format
      </div>

      <Input
        label="Store Response In Variable"
        value={options?.resultVariable || ''}
        onChange={e => handleChange('resultVariable', e.target.value)}
        placeholder="Enter variable name"
        aria-describedby="variable-help"
      />
      <div id="variable-help" className="text-sm text-gray-500">
        The integration response will be stored in this variable
      </div>
    </Stack>
  )
} 