import { FC } from 'react'
import { Stack, Box, Text, SimpleGrid, Stat, StatLabel, StatNumber } from '@/components/ui'
import { Bot } from '@/types/bot'
import { useQuery } from '@tanstack/react-query'
import { getBotStats } from '@/api/bot'

interface BotStatsProps {
  bot: Bot
}

export const BotStats: FC<BotStatsProps> = ({ bot }) => {
  const { data: stats, isLoading } = useQuery(['botStats', bot.id], () => getBotStats(bot.id))

  if (isLoading) {
    return <Text>Loading stats...</Text>
  }

  return (
    <SimpleGrid columns={3} spacing={4}>
      <Stat
        p={4}
        bg="white"
        borderRadius="md"
        borderWidth={1}
      >
        <StatLabel>Total Views</StatLabel>
        <StatNumber>{stats?.views || 0}</StatNumber>
      </Stat>

      <Stat
        p={4}
        bg="white"
        borderRadius="md"
        borderWidth={1}
      >
        <StatLabel>Total Starts</StatLabel>
        <StatNumber>{stats?.starts || 0}</StatNumber>
      </Stat>

      <Stat
        p={4}
        bg="white"
        borderRadius="md"
        borderWidth={1}
      >
        <StatLabel>Total Completions</StatLabel>
        <StatNumber>{stats?.completions || 0}</StatNumber>
      </Stat>
    </SimpleGrid>
  )
} 