import { FC } from 'react'
import { Stack, Box, Text } from '@/components/ui'
import { AnalyticsData } from '@/types/analytics'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface AnalyticsChartsProps {
  data: AnalyticsData
}

export const AnalyticsCharts: FC<AnalyticsChartsProps> = ({ data }) => {
  return (
    <Stack spacing={6}>
      <Box height="400px">
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          Daily Statistics
        </Text>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.dailyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#8884d8" name="Views" />
            <Line type="monotone" dataKey="starts" stroke="#82ca9d" name="Starts" />
            <Line type="monotone" dataKey="completions" stroke="#ffc658" name="Completions" />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box height="400px">
        <Text fontSize="lg" fontWeight="medium" mb={4}>
          Block Performance
        </Text>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.blockStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="blockName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="averageTime" stroke="#8884d8" name="Average Time (s)" />
            <Line type="monotone" dataKey="dropRate" stroke="#82ca9d" name="Drop Rate (%)" />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Stack>
  )
} 