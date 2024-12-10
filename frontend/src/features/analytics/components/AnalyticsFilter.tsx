import { FC } from 'react'
import { Stack, Input, Button } from '@/components/ui'
import { FilterIcon } from '@/components/icons'

interface AnalyticsFilterProps {
  startDate: string
  endDate: string
  onFilter: (startDate: string, endDate: string) => void
}

export const AnalyticsFilter: FC<AnalyticsFilterProps> = ({
  startDate,
  endDate,
  onFilter
}) => {
  return (
    <Stack direction="row" spacing={2} align="flex-end">
      <Input
        type="date"
        label="Start Date"
        value={startDate}
        onChange={e => onFilter(e.target.value, endDate)}
        aria-label="Filter start date"
      />
      <Input
        type="date"
        label="End Date"
        value={endDate}
        onChange={e => onFilter(startDate, e.target.value)}
        aria-label="Filter end date"
      />
      <Button
        leftIcon={<FilterIcon />}
        onClick={() => onFilter(startDate, endDate)}
        aria-label="Apply date filter"
      >
        Filter
      </Button>
    </Stack>
  )
} 