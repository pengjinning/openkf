import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Box, Text } from '@/components/ui'
import { Bot } from '@/types/bot'
import { BotPreview } from '../components/BotPreview'
import { getBot, trackBotView } from '@/api/bot'
import { useQuery } from '@tanstack/react-query'

export const BotPublicPage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: bot, isLoading, error } = useQuery<Bot>(['bot', id], () => getBot(id!))

  useEffect(() => {
    if (bot?.id) {
      trackBotView(bot.id)
    }
  }, [bot?.id])

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error || !bot) {
    return <Text>Bot not found</Text>
  }

  if (!bot.settings.general.isPublic) {
    return <Text>This bot is not publicly accessible</Text>
  }

  return (
    <Box
      maxW="container.md"
      mx="auto"
      py={8}
      px={4}
    >
      <Stack spacing={6}>
        <Text fontSize="2xl" fontWeight="bold">
          {bot.name}
        </Text>

        {bot.description && (
          <Text color="gray.600">
            {bot.description}
          </Text>
        )}

        <BotPreview bot={bot} />
      </Stack>
    </Box>
  )
} 