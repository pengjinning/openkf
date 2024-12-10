import { FC, useState } from 'react'
import { Box, Stack, Text, Badge, IconButton, Select } from '@/components/ui'
import { CloseIcon, ExpandIcon, CollapseIcon } from '@/components/icons'
import { Flow } from '@/types/flow'

interface DebugLog {
  timestamp: number
  nodeId: string
  type: 'info' | 'warning' | 'error'
  message: string
  data?: any
}

interface FlowDebuggerProps {
  flow: Flow
  onClose?: () => void
}

export const FlowDebugger: FC<FlowDebuggerProps> = ({ flow, onClose }) => {
  const [logs, setLogs] = useState<DebugLog[]>([])
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error'>('all')
  const [isExpanded, setIsExpanded] = useState(false)

  const filteredLogs = logs.filter(log => {
    if (filter === 'all') return true
    return log.type === filter
  })

  const logTypeColors = {
    info: 'blue',
    warning: 'yellow',
    error: 'red'
  }

  return (
    <Box
      position="fixed"
      left={0}
      right={0}
      bottom={0}
      height={isExpanded ? '50vh' : '200px'}
      bg="white"
      shadow="xl"
      zIndex={1000}
      transition="height 0.2s"
    >
      <Stack h="full">
        <Stack
          direction="row"
          justify="space-between"
          align="center"
          p={2}
          borderBottomWidth={1}
          borderColor="gray.200"
        >
          <Stack direction="row" align="center" spacing={4}>
            <Text fontWeight="medium">调试器</Text>
            <Select
              value={filter}
              onChange={e => setFilter(e.target.value as any)}
              width="120px"
              size="sm"
            >
              <option value="all">全部</option>
              <option value="info">信息</option>
              <option value="warning">警告</option>
              <option value="error">错误</option>
            </Select>
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconButton
              icon={isExpanded ? <CollapseIcon /> : <ExpandIcon />}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-label={isExpanded ? 'Collapse' : 'Expand'}
              size="sm"
            />
            <IconButton
              icon={<CloseIcon />}
              onClick={onClose}
              aria-label="Close"
              size="sm"
            />
          </Stack>
        </Stack>

        <Box flex={1} overflowY="auto" p={2}>
          {filteredLogs.map((log, index) => (
            <Stack
              key={index}
              direction="row"
              align="flex-start"
              spacing={3}
              mb={2}
            >
              <Text fontSize="sm" color="gray.500" whiteSpace="nowrap">
                {new Date(log.timestamp).toLocaleTimeString()}
              </Text>
              <Badge colorScheme={logTypeColors[log.type]}>
                {log.type.toUpperCase()}
              </Badge>
              <Stack spacing={1} flex={1}>
                <Text fontSize="sm">{log.message}</Text>
                {log.data && (
                  <Box
                    fontSize="sm"
                    fontFamily="mono"
                    bg="gray.50"
                    p={2}
                    borderRadius="md"
                    whiteSpace="pre-wrap"
                  >
                    {JSON.stringify(log.data, null, 2)}
                  </Box>
                )}
              </Stack>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )
} 