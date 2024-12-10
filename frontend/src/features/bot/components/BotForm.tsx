import { FC } from 'react'
import { Stack, Input, Textarea, Switch, Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/ui'
import { Bot } from '@/types/bot'
import { BotThemeForm } from './BotThemeForm'
import { BotSecurityForm } from './BotSecurityForm'
import { BotAnalyticsForm } from './BotAnalyticsForm'

interface BotFormProps {
  bot: Partial<Bot>
  onChange: (bot: Partial<Bot>) => void
}

export const BotForm: FC<BotFormProps> = ({ bot, onChange }) => {
  const handleChange = (field: keyof Bot, value: any) => {
    onChange({
      ...bot,
      [field]: value
    })
  }

  const handleSettingsChange = (field: keyof Bot['settings'], value: any) => {
    onChange({
      ...bot,
      settings: {
        ...bot.settings,
        [field]: value
      }
    })
  }

  return (
    <Stack spacing={6}>
      <Stack spacing={4}>
        <Input
          label="Bot Name"
          value={bot.name || ''}
          onChange={e => handleChange('name', e.target.value)}
          placeholder="Enter bot name..."
          aria-label="Bot name"
        />

        <Textarea
          label="Description"
          value={bot.description || ''}
          onChange={e => handleChange('description', e.target.value)}
          placeholder="Enter bot description..."
          rows={3}
          aria-label="Bot description"
        />
      </Stack>

      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Theme</Tab>
          <Tab>Security</Tab>
          <Tab>Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Stack spacing={4}>
              <Switch
                label="Public Access"
                isChecked={bot.settings?.general.isPublic}
                onChange={e => handleSettingsChange('general', {
                  ...bot.settings?.general,
                  isPublic: e.target.checked
                })}
                aria-label="Make bot publicly accessible"
              />

              <Switch
                label="Closed"
                isChecked={bot.settings?.general.isClosed}
                onChange={e => handleSettingsChange('general', {
                  ...bot.settings?.general,
                  isClosed: e.target.checked
                })}
                aria-label="Close bot from accepting new responses"
              />

              <Switch
                label="Enable Typing Animation"
                isChecked={bot.settings?.typing.enabled}
                onChange={e => handleSettingsChange('typing', {
                  ...bot.settings?.typing,
                  enabled: e.target.checked
                })}
                aria-label="Enable typing animation"
              />
            </Stack>
          </TabPanel>

          <TabPanel>
            <BotThemeForm
              theme={bot.settings?.theme}
              onChange={theme => handleSettingsChange('theme', theme)}
            />
          </TabPanel>

          <TabPanel>
            <BotSecurityForm
              security={bot.settings?.security}
              onChange={security => handleSettingsChange('security', security)}
            />
          </TabPanel>

          <TabPanel>
            <BotAnalyticsForm
              analytics={bot.settings?.analytics}
              onChange={analytics => handleSettingsChange('analytics', analytics)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
} 