import { FC } from 'react'
import { Stack, Switch, Input } from '@/components/ui'
import { BotSettings } from '@/types/bot'

interface BotSecurityFormProps {
  security?: BotSettings['security']
  onChange: (security: BotSettings['security']) => void
}

export const BotSecurityForm: FC<BotSecurityFormProps> = ({ security = {}, onChange }) => {
  const handleRecaptchaChange = (field: string, value: any) => {
    onChange({
      ...security,
      recaptcha: {
        ...security.recaptcha,
        [field]: value
      }
    })
  }

  return (
    <Stack spacing={6}>
      <Stack spacing={4}>
        <Switch
          label="Enable reCAPTCHA"
          isChecked={security.recaptcha?.enabled}
          onChange={e => handleRecaptchaChange('enabled', e.target.checked)}
          aria-label="Enable reCAPTCHA protection"
        />

        {security.recaptcha?.enabled && (
          <Stack spacing={4}>
            <Input
              label="Site Key"
              value={security.recaptcha?.siteKey || ''}
              onChange={e => handleRecaptchaChange('siteKey', e.target.value)}
              placeholder="Enter reCAPTCHA site key..."
              aria-label="reCAPTCHA site key"
            />

            <Input
              label="Secret Key"
              value={security.recaptcha?.secretKey || ''}
              onChange={e => handleRecaptchaChange('secretKey', e.target.value)}
              placeholder="Enter reCAPTCHA secret key..."
              type="password"
              aria-label="reCAPTCHA secret key"
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
} 