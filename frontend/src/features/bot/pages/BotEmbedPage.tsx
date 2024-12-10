import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Text } from '@/components/ui'
import { Bot } from '@/types/bot'
import { BotPreview } from '../components/BotPreview'
import { getBot, trackBotView } from '@/api/bot'
import { useQuery } from '@tanstack/react-query'

export const BotEmbedPage: FC = () => {
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
      height="100vh"
      bg={bot.settings.theme.general.background}
      style={{
        fontFamily: bot.settings.theme.general.font
      }}
    >
      <BotPreview 
        bot={bot}
        isEmbedded
      />
    </Box>
  )
} 