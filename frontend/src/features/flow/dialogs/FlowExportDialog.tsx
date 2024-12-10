import { FC, useState } from 'react'
import { 
  Box, 
  Stack, 
  Text, 
  Button, 
  Radio, 
  RadioGroup,
  Switch,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui'
import { Flow } from '@/types/flow'
import { exportFlow } from '../utils/flowIO'

interface FlowExportDialogProps {
  isOpen: boolean
  onClose: () => void
  flow: Flow
}

type ExportFormat = 'json' | 'yaml'

export const FlowExportDialog: FC<FlowExportDialogProps> = ({
  isOpen,
  onClose,
  flow
}) => {
  const [format, setFormat] = useState<ExportFormat>('json')
  const [includeMeta, setIncludeMeta] = useState(true)
  const [prettyPrint, setPrettyPrint] = useState(true)

  const handleExport = async () => {
    const result = await exportFlow(flow, {
      format,
      includeMeta,
      pretty: prettyPrint
    })

    if (result.success) {
      onClose()
    }
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>导出流程</DialogTitle>
        </DialogHeader>

        <Stack spacing={4} py={4}>
          <Stack spacing={2}>
            <Text fontWeight="medium">导出格式</Text>
            <RadioGroup value={format} onChange={value => setFormat(value as ExportFormat)}>
              <Stack spacing={2}>
                <Radio value="json">
                  <Text>JSON</Text>
                  <Text fontSize="sm" color="gray.500">
                    标准JSON格式，适用于大多数场景
                  </Text>
                </Radio>
                <Radio value="yaml">
                  <Text>YAML</Text>
                  <Text fontSize="sm" color="gray.500">
                    更易读的格式，适合手动编辑
                  </Text>
                </Radio>
              </Stack>
            </RadioGroup>
          </Stack>

          <Stack spacing={4}>
            <Stack direction="row" justify="space-between" align="center">
              <Box>
                <Text>包含元数据</Text>
                <Text fontSize="sm" color="gray.500">
                  导出创建时间、修改时间等信息
                </Text>
              </Box>
              <Switch
                isChecked={includeMeta}
                onChange={e => setIncludeMeta(e.target.checked)}
              />
            </Stack>

            <Stack direction="row" justify="space-between" align="center">
              <Box>
                <Text>美化输出</Text>
                <Text fontSize="sm" color="gray.500">
                  格式化导出的内容，使其更易读
                </Text>
              </Box>
              <Switch
                isChecked={prettyPrint}
                onChange={e => setPrettyPrint(e.target.checked)}
              />
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={3} justify="flex-end">
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" onClick={handleExport}>
            导出
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  )
} 