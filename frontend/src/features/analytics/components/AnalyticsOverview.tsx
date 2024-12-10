import { FC } from 'react'
import { SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText } from '@/components/ui'
import { AnalyticsData } from '@/types/analytics'

interface AnalyticsOverviewProps {
  data: AnalyticsData
}

export const AnalyticsOverview: FC<AnalyticsOverviewProps> = ({ data }) => {
  return (
    <SimpleGrid columns={4} spacing={4}>
      <Stat>
        <StatLabel>Total Views</StatLabel>
        <StatNumber>{data.totalViews}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Total Starts</StatLabel>
        <StatNumber>{data.totalStarts}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Total Completions</StatLabel>
        <StatNumber>{data.totalCompletions}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Completion Rate</StatLabel>
        <StatNumber>{data.completionRate}%</StatNumber>
        <StatHelpText>Average time: {data.averageTime}s</StatHelpText>
      </Stat>
    </SimpleGrid>
  )
} 