import { FC } from 'react'
import { Button } from '@/components/ui'
import { DownloadIcon } from '@/components/icons'
import { exportTemplate } from '@/api/template'

interface TemplateExportProps {
  templateId: string
  templateName: string
  onError?: (error: string) => void
}

export const TemplateExport: FC<TemplateExportProps> = ({
  templateId,
  templateName,
  onError
}) => {
  const handleExport = async () => {
    try {
      const blob = await exportTemplate(templateId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${templateName.toLowerCase().replace(/\s+/g, '-')}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error('Failed to export template:', err)
      onError?.('Failed to export template. Please try again.')
    }
  }

  return (
    <Button
      leftIcon={<DownloadIcon />}
      onClick={handleExport}
      aria-label={`Export template ${templateName}`}
    >
      Export
    </Button>
  )
} 