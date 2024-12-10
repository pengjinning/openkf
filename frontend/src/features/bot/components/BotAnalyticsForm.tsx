import { FC } from 'react'
import { Stack, Switch, Select, Input } from '@/components/ui'
import { BotSettings } from '@/types/bot'

interface BotAnalyticsFormProps {
  analytics?: BotSettings['analytics']
  onChange: (analytics: BotSettings['analytics']) => void
}

export const BotAnalyticsForm: FC<BotAnalyticsFormProps> = ({ analytics = {}, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...analytics,
      [field]: value
    })
  }

  return (
    <Stack spacing={6}>
      <Stack spacing={4}>
        <Switch
          label="Enable Analytics"
          isChecked={analytics.enabled}
          onChange={e => handleChange('enabled', e.target.checked)}
          aria-label="Enable analytics tracking"
        />

        {analytics.enabled && (
          <Stack spacing={4}>
            <Select
              label="Analytics Provider"
              value={analytics.provider || 'ga4'}
              onChange={e => handleChange('provider', e.target.value)}
              aria-label="Select analytics provider"
              title="Select analytics provider"
            >
              <option value="ga4">Google Analytics 4</option>
              <option value="custom">Custom</option>
            </Select>

            <Input
              label="Tracking ID"
              value={analytics.trackingId || ''}
              onChange={e => handleChange('trackingId', e.target.value)}
              placeholder={analytics.provider === 'ga4' ? 'G-XXXXXXXXXX' : 'Enter tracking ID...'}
              aria-label="Analytics tracking ID"
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
} 