import { FC } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Stack, Button, Text, useToast, Tabs, TabList, Tab, TabPanels, TabPanel } from '@/components/ui'
import { ArrowLeftIcon } from '@/components/icons'
import { Bot } from '@/types/bot'
import { BotForm } from '../components/BotForm'
import { BotPreview } from '../components/BotPreview'
import { FlowEditor } from '@/features/flow/FlowEditor'
import { getBot, updateBot, publishBot } from '@/api/bot'
import { useQuery, useMutation } from '@tanstack/react-query'
import { AnalyticsPage } from '@/features/analytics/pages/AnalyticsPage'

export const BotDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const toast = useToast()

  const { data: bot, isLoading } = useQuery<Bot>(['bot', id], () => getBot(id!))

  const { mutate: updateMutation } = useMutation(
    (data: Partial<Bot>) => updateBot(id!, data),
    {
      onSuccess: () => {
        toast({
          title: 'Bot updated successfully',
          status: 'success'
        })
      },
      onError: () => {
        toast({
          title: 'Failed to update bot',
          status: 'error'
        })
      }
    }
  )

  const { mutate: publishMutation } = useMutation(
    () => publishBot(id!),
    {
      onSuccess: () => {
        toast({
          title: 'Bot published successfully',
          status: 'success'
        })
      },
      onError: () => {
        toast({
          title: 'Failed to publish bot',
          status: 'error'
        })
      }
    }
  )

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!bot) {
    return <Text>Bot not found</Text>
  }

  return (
    <Stack spacing={6}>
      <Stack direction="row" spacing={4} align="center" justify="space-between">
        <Stack direction="row" spacing={4} align="center">
          <Button
            leftIcon={<ArrowLeftIcon />}
            variant="ghost"
            onClick={() => navigate('/bots')}
            aria-label="Back to bots list"
          >
            Back
          </Button>
          <Text fontSize="2xl" fontWeight="bold">
            {bot.name}
          </Text>
        </Stack>
        <Button
          colorScheme="green"
          onClick={() => publishMutation()}
          isDisabled={!bot.flow.blocks.length}
          aria-label="Publish bot"
        >
          Publish
        </Button>
      </Stack>

      <Tabs>
        <TabList>
          <Tab>Flow</Tab>
          <Tab>Preview</Tab>
          <Tab>Analytics</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0} pt={4}>
            <FlowEditor
              flow={bot.flow}
              onChange={flow => updateMutation({ ...bot, flow })}
            />
          </TabPanel>

          <TabPanel p={0} pt={4}>
            <BotPreview bot={bot} />
          </TabPanel>

          <TabPanel p={0} pt={4}>
            <AnalyticsPage />
          </TabPanel>

          <TabPanel p={0} pt={4}>
            <BotForm bot={bot} onChange={updateMutation} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Stack>
  )
} 