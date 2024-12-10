import { FC, useState, useRef } from 'react'
import { 
  Box, 
  Stack, 
  Text, 
  Button,
  Input,
  Alert,
  AlertIcon,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui'
import { UploadIcon } from '@/components/icons'
import { importFlow } from '../utils/flowIO'
import { Flow } from '@/types/flow'

interface FlowImportDialogProps {
  isOpen: boolean
  onClose: () => void
  onImport: (flow: Flow) => void
}

export const FlowImportDialog: FC<FlowImportDialogProps> = ({
  isOpen,
  onClose,
  onImport
}) => {
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsLoading(true)
    setError(undefined)

    try {
      const result = await importFlow(file)
      if (result.success && result.flow) {
        onImport(result.flow)
        onClose()
      } else {
        setError(result.error || '导入失败')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '导入失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>导入流程</DialogTitle>
        </DialogHeader>

        <Stack spacing={4} py={4}>
          <Box
            p={6}
            borderWidth={2}
            borderStyle="dashed"
            borderRadius="md"
            borderColor="gray.200"
            textAlign="center"
            cursor="pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Stack spacing={2} align="center">
              <UploadIcon size={24} color="gray.400" />
              <Text>点击或拖拽文件到此处</Text>
              <Text fontSize="sm" color="gray.500">
                支持 .json 和 .yaml 格式
              </Text>
            </Stack>
          </Box>

          <Input
            ref={fileInputRef}
            type="file"
            accept=".json,.yaml,.yml"
            onChange={handleFileSelect}
            display="none"
          />

          {error && (
            <Alert status="error">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </Stack>

        <Stack direction="row" spacing={3} justify="flex-end">
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button
            colorScheme="blue"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={() => fileInputRef.current?.click()}
          >
            选择文件
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
} 