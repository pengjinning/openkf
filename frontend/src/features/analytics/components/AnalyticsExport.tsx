import { FC } from 'react'
import { Stack, Button, Select, useToast } from '@/components/ui'
import { DownloadIcon } from '@/components/icons'
import { exportAnalytics } from '@/api/analytics'

interface AnalyticsExportProps {
  botId: string
  startDate?: string
  endDate?: string
}

export const AnalyticsExport: FC<AnalyticsExportProps> = ({ botId, startDate, endDate }) => {
  const toast = useToast()

  const handleExport = async (format: 'csv' | 'json') => {
    try {
      const blob = await exportAnalytics(botId, {
        startDate,
        endDate,
        format
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `analytics-${botId}.${format}`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      toast({
        title: 'Failed to export analytics',
        status: 'error'
      })
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <Button
        leftIcon={<DownloadIcon />}
        onClick={() => handleExport('csv')}
        aria-label="Export as CSV"
      >
        Export CSV
      </Button>
      <Button
        leftIcon={<DownloadIcon />}
        onClick={() => handleExport('json')}
        aria-label="Export as JSON"
      >
        Export JSON
      </Button>
    </Stack>
  )
} 