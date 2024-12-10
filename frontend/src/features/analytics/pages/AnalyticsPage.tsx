import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Stack, Box, Text } from '@/components/ui'
import { useQuery } from '@tanstack/react-query'
import { getBotAnalytics } from '@/api/analytics'
import { AnalyticsOverview } from '../components/AnalyticsOverview'
import { AnalyticsCharts } from '../components/AnalyticsCharts'
import { AnalyticsFilter } from '../components/AnalyticsFilter'
import { AnalyticsExport } from '../components/AnalyticsExport'

export const AnalyticsPage: FC = () => {
  const { botId } = useParams<{ botId: string }>()
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  )
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const { data: analytics, isLoading } = useQuery(
    ['analytics', botId, startDate, endDate],
    () => getBotAnalytics(botId!, { startDate, endDate })
  )

  const handleFilter = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  if (isLoading) {
    return <Text>Loading analytics...</Text>
  }

  if (!analytics) {
    return <Text>No analytics data available</Text>
  }

  return (
    <Stack spacing={6}>
      <Stack direction="row" justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Analytics
        </Text>
        <AnalyticsExport
          botId={botId!}
          startDate={startDate}
          endDate={endDate}
        />
      </Stack>

      <AnalyticsFilter
        startDate={startDate}
        endDate={endDate}
        onFilter={handleFilter}
      />

      <Box bg="white" p={6} borderRadius="md" shadow="sm">
        <AnalyticsOverview data={analytics} />
      </Box>

      <Box bg="white" p={6} borderRadius="md" shadow="sm">
        <AnalyticsCharts data={analytics} />
      </Box>
    </Stack>
  )
} 