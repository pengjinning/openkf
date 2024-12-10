import { FC } from 'react'
import { Stack, Box, Text, Table, Thead, Tbody, Tr, Th, Td } from '@/components/ui'
import { BlockStats } from '@/types/analytics'

interface BlockAnalyticsProps {
  stats: BlockStats[]
}

export const BlockAnalytics: FC<BlockAnalyticsProps> = ({ stats }) => {
  return (
    <Stack spacing={4}>
      <Text fontSize="lg" fontWeight="medium">
        Block Performance
      </Text>

      <Table>
        <Thead>
          <Tr>
            <Th>Block</Th>
            <Th isNumeric>Average Time (s)</Th>
            <Th isNumeric>Drop Rate (%)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {stats.map(stat => (
            <Tr key={stat.blockId}>
              <Td>{stat.blockName}</Td>
              <Td isNumeric>{(stat.averageTime / 1000).toFixed(2)}</Td>
              <Td isNumeric>{stat.dropRate.toFixed(1)}%</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
} 