/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 12:26:57
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-10 15:38:45
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { FC } from 'react'
import { Stack, Box, Text, Input, Switch, Select } from '@/components/ui'

interface SettingsEditorProps {
  settings: any
  onChange: (settings: any) => void
}

export const SettingsEditor: FC<SettingsEditorProps> = ({ settings, onChange }) => {
  const handleChange = (key: string, value: any) => {
    onChange({ ...settings, [key]: value })
  }

  return (
    <Stack spacing={6}>
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Typing Emulation
        </Text>
        <Stack spacing={4}>
          <Switch
            label="Enable typing emulation"
            isChecked={settings.typingEmulation?.enabled}
            onChange={e => handleChange('typingEmulation.enabled', e.target.checked)}
          />
          <Input
            label="Speed (ms per character)"
            type="number"
            value={settings.typingEmulation?.speed || 50}
            onChange={e => handleChange('typingEmulation.speed', parseInt(e.target.value))}
            isDisabled={!settings.typingEmulation?.enabled}
          />
          <Input
            label="Delay between messages (ms)"
            type="number"
            value={settings.typingEmulation?.delay || 1000}
            onChange={e => handleChange('typingEmulation.delay', parseInt(e.target.value))}
            isDisabled={!settings.typingEmulation?.enabled}
          />
        </Stack>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Security
        </Text>
        <Stack spacing={4}>
          <Switch
            label="Enable reCAPTCHA"
            isChecked={settings.security?.recaptcha?.enabled}
            onChange={e => handleChange('security.recaptcha.enabled', e.target.checked)}
          />
          {settings.security?.recaptcha?.enabled && (
            <>
              <Input
                label="Site Key"
                value={settings.security?.recaptcha?.siteKey || ''}
                onChange={e => handleChange('security.recaptcha.siteKey', e.target.value)}
              />
              <Input
                label="Secret Key"
                type="password"
                value={settings.security?.recaptcha?.secretKey || ''}
                onChange={e => handleChange('security.recaptcha.secretKey', e.target.value)}
              />
            </>
          )}
        </Stack>
      </Box>

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          Results
        </Text>
        <Stack spacing={4}>
          <Switch
            label="Save results"
            isChecked={settings.results?.save}
            onChange={e => handleChange('results.save', e.target.checked)}
          />
          {settings.results?.save && (
            <Select
              label="Storage Type"
              value={settings.results?.storage || 'database'}
              onChange={e => handleChange('results.storage', e.target.value)}
            >
              <option value="database">Database</option>
              <option value="googleSheets">Google Sheets</option>
              <option value="webhook">Webhook</option>
            </Select>
          )}
        </Stack>
      </Box>
    </Stack>
  )
} 