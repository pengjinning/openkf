import { FC, useState, useCallback } from 'react'
import { Box, Stack, Text, Input, Button, IconButton } from '@/components/ui'
import { SendIcon, ReloadIcon, CloseIcon } from '@/components/icons'
import { Flow } from '@/types/flow'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: number
}

interface FlowSimulatorProps {
  flow: Flow
  onClose?: () => void
}

export const FlowSimulator: FC<FlowSimulatorProps> = ({ flow, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null)
  const [variables, setVariables] = useState<Record<string, any>>({})

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return

    // 添加用户消息
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])

    // 处理用户输入
    if (currentNodeId) {
      const currentNode = flow.blocks.find(block => block.id === currentNodeId)
      if (currentNode?.type === 'input') {
        setVariables(prev => ({
          ...prev,
          [currentNode.data.variableName]: inputValue
        }))
      }
    }

    // 清空输入
    setInputValue('')

    // 模拟机器人响应
    setTimeout(() => {
      const botMessage: Message = {
        id: `msg-${Date.now()}`,
        type: 'bot',
        content: '这是机器人的回复',
        timestamp: Date.now()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }, [inputValue, currentNodeId, flow.blocks])

  const handleReset = () => {
    setMessages([])
    setInputValue('')
    setCurrentNodeId(null)
    setVariables({})

    // 重新开始流程
    const startNode = flow.blocks.find(block => block.type === 'start')
    if (startNode) {
      setCurrentNodeId(startNode.id)
    }
  }

  return (
    <Box
      position="fixed"
      right={4}
      bottom={4}
      width="400px"
      height="600px"
      bg="white"
      borderRadius="lg"
      shadow="xl"
      zIndex={1000}
    >
      <Stack h="full">
        {/* 头部 */}
        <Stack
          direction="row"
          justify="space-between"
          align="center"
          p={3}
          borderBottomWidth={1}
          borderColor="gray.200"
        >
          <Text fontWeight="medium">流程模拟器</Text>
          <Stack direction="row" spacing={2}>
            <IconButton
              icon={<ReloadIcon />}
              onClick={handleReset}
              aria-label="Reset"
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

        {/* 消息列表 */}
        <Box flex={1} overflowY="auto" p={4}>
          <Stack spacing={4}>
            {messages.map(message => (
              <Stack
                key={message.id}
                align={message.type === 'user' ? 'flex-end' : 'flex-start'}
              >
                <Box
                  maxW="80%"
                  p={3}
                  bg={message.type === 'user' ? 'blue.500' : 'gray.100'}
                  color={message.type === 'user' ? 'white' : 'black'}
                  borderRadius="lg"
                >
                  <Text fontSize="sm">{message.content}</Text>
                </Box>
                <Text fontSize="xs" color="gray.500">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </Text>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* 变量状态 */}
        {Object.keys(variables).length > 0 && (
          <Box p={2} borderTopWidth={1} borderColor="gray.200">
            <Text fontSize="xs" color="gray.500" mb={1}>
              变量状态:
            </Text>
            <Box
              fontSize="xs"
              fontFamily="mono"
              bg="gray.50"
              p={2}
              borderRadius="md"
              maxH="100px"
              overflowY="auto"
            >
              {JSON.stringify(variables, null, 2)}
            </Box>
          </Box>
        )}

        {/* 输入区域 */}
        <Stack direction="row" p={3} spacing={2} borderTopWidth={1} borderColor="gray.200">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="输入消息..."
            onKeyPress={e => e.key === 'Enter' && handleSend()}
          />
          <IconButton
            icon={<SendIcon />}
            onClick={handleSend}
            aria-label="Send"
            colorScheme="blue"
          />
        </Stack>
      </Stack>
    </Box>
  )
} 