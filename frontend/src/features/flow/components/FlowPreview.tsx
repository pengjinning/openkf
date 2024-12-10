import { FC, useState, useCallback } from 'react'
import { Box, Stack, Text, Button, IconButton, Badge } from '@/components/ui'
import { PlayIcon, PauseIcon, StopIcon, StepIcon } from '@/components/icons'
import { Flow } from '@/types/flow'

interface FlowPreviewProps {
  flow: Flow
  onClose?: () => void
}

export const FlowPreview: FC<FlowPreviewProps> = ({ flow, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [executionPath, setExecutionPath] = useState<string[]>([])
  const [speed, setSpeed] = useState(1000) // 执行速度(ms)

  const handlePlay = useCallback(() => {
    setIsPlaying(true)
    // 从起始节点开始执行
    const startNode = flow.blocks.find(block => block.type === 'start')
    if (startNode) {
      setCurrentNodeId(startNode.id)
      setExecutionPath([startNode.id])
    }
  }, [flow.blocks])

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleStop = () => {
    setIsPlaying(false)
    setCurrentNodeId(null)
    setExecutionPath([])
  }

  const handleStep = useCallback(() => {
    if (!currentNodeId) {
      handlePlay()
      return
    }

    // 获取下一个节点
    const currentNode = flow.blocks.find(block => block.id === currentNodeId)
    const nextEdge = flow.edges.find(edge => edge.source === currentNodeId)
    
    if (nextEdge) {
      const nextNode = flow.blocks.find(block => block.id === nextEdge.target)
      if (nextNode) {
        setCurrentNodeId(nextNode.id)
        setExecutionPath(prev => [...prev, nextNode.id])
      }
    } else {
      // 到达终点
      setIsPlaying(false)
    }
  }, [currentNodeId, flow.blocks, flow.edges])

  return (
    <Box
      position="fixed"
      right={0}
      top={0}
      bottom={0}
      width="400px"
      bg="white"
      shadow="xl"
      zIndex={1000}
      p={4}
    >
      <Stack spacing={4} h="full">
        <Stack direction="row" justify="space-between" align="center">
          <Text fontSize="lg" fontWeight="medium">流程预览</Text>
          <Stack direction="row" spacing={2}>
            <IconButton
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={isPlaying ? handlePause : handlePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
            />
            <IconButton
              icon={<StopIcon />}
              onClick={handleStop}
              aria-label="Stop"
            />
            <IconButton
              icon={<StepIcon />}
              onClick={handleStep}
              aria-label="Step"
              isDisabled={isPlaying}
            />
          </Stack>
        </Stack>

        <Box flex={1} overflowY="auto">
          {flow.blocks.map(block => (
            <Box
              key={block.id}
              p={3}
              mb={2}
              borderRadius="md"
              borderWidth={1}
              borderColor={block.id === currentNodeId ? 'blue.500' : 'gray.200'}
              bg={executionPath.includes(block.id) ? 'blue.50' : 'white'}
            >
              <Stack direction="row" justify="space-between" align="center">
                <Stack spacing={1}>
                  <Text fontWeight="medium">{block.data?.label || block.type}</Text>
                  <Text fontSize="sm" color="gray.500">{block.id}</Text>
                </Stack>
                {block.id === currentNodeId && (
                  <Badge colorScheme="blue">当前</Badge>
                )}
              </Stack>
            </Box>
          ))}
        </Box>

        <Button onClick={onClose} variant="ghost">
          关闭预览
        </Button>
      </Stack>
    </Box>
  )
} 