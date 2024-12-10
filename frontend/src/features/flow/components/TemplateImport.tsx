import { FC, useRef } from 'react'
import { Stack, Button, Text } from '@/components/ui'
import { UploadIcon } from '@/components/icons'
import { importTemplate } from '@/api/template'

interface TemplateImportProps {
  onImport: (template: Template) => void
  onError?: (error: string) => void
}

export const TemplateImport: FC<TemplateImportProps> = ({ onImport, onError }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const template = await importTemplate(file)
      onImport(template)
    } catch (err) {
      console.error('Failed to import template:', err)
      onError?.('Failed to import template. Please check the file format.')
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Stack spacing={2}>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}
        ref={fileInputRef}
        aria-label="Import template file"
      />
      <Button
        leftIcon={<UploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        aria-label="Choose template file to import"
      >
        Import Template
      </Button>
      <Text fontSize="sm" color="gray.500">
        Accepts .json files
      </Text>
    </Stack>
  )
} 