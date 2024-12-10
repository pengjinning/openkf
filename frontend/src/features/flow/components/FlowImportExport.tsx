import { FC, useRef } from 'react'
import { Stack, Button, useToast } from '@/components/ui'
import { DownloadIcon, UploadIcon } from '@/components/icons'
import { Flow } from '@/types/flow'
import { exportFlow, importFlow } from '@/api/flow'

interface FlowImportExportProps {
  flow: Flow
  onImport: (flow: Flow) => void
}

export const FlowImportExport: FC<FlowImportExportProps> = ({ flow, onImport }) => {
  const toast = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleExport = async () => {
    try {
      const blob = await exportFlow(flow.id)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${flow.name.toLowerCase().replace(/\s+/g, '-')}.json`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      toast({
        title: 'Failed to export flow',
        status: 'error'
      })
    }
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const importedFlow = await importFlow(file)
      onImport(importedFlow)
      toast({
        title: 'Flow imported successfully',
        status: 'success'
      })
    } catch (err) {
      toast({
        title: 'Failed to import flow',
        status: 'error'
      })
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Stack direction="row" spacing={2}>
      <input
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
        ref={fileInputRef}
        aria-label="Import flow file"
      />
      <Button
        leftIcon={<UploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        aria-label="Import flow"
      >
        Import
      </Button>
      <Button
        leftIcon={<DownloadIcon />}
        onClick={handleExport}
        aria-label="Export flow"
      >
        Export
      </Button>
    </Stack>
  )
} 