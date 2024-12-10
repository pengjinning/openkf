import { FC } from 'react'
import { Bot } from '@/types/bot'
import { Stack, Tabs, TabList, TabPanels, Tab, TabPanel } from '@/components/ui'
import { FlowEditor } from './FlowEditor'
import { TemplateSelector } from './TemplateSelector'
import { VariableManager } from './VariableManager'
import { ThemeEditor } from './ThemeEditor'
import { SettingsEditor } from './SettingsEditor'

interface BotEditorProps {
  bot: Bot
  onChange: (bot: Bot) => void
}

export const BotEditor: FC<BotEditorProps> = ({ bot, onChange }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Flow</Tab>
        <Tab>Templates</Tab>
        <Tab>Variables</Tab>
        <Tab>Theme</Tab>
        <Tab>Settings</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <FlowEditor 
            groups={bot.groups}
            edges={bot.edges}
            onChange={(groups, edges) => onChange({ ...bot, groups, edges })}
          />
        </TabPanel>

        <TabPanel>
          <TemplateSelector
            onSelect={template => {
              onChange({
                ...bot,
                groups: template.groups,
                edges: template.edges,
                variables: template.variables
              })
            }}
          />
        </TabPanel>

        <TabPanel>
          <VariableManager
            variables={bot.variables}
            onChange={variables => onChange({ ...bot, variables })}
          />
        </TabPanel>

        <TabPanel>
          <ThemeEditor
            theme={bot.theme}
            onChange={theme => onChange({ ...bot, theme })}
          />
        </TabPanel>

        <TabPanel>
          <SettingsEditor
            settings={bot.settings}
            onChange={settings => onChange({ ...bot, settings })}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
} 