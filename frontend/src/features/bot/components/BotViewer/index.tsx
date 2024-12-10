import { FC, useEffect, useState } from 'react'
import { Bot } from '@/types/bot'
import { Stack, Box, Text, Input, Button } from '@/components/ui'
import { processFlow } from './flowProcessor'

interface BotViewerProps {
  bot: Bot
}

interface Message {
  type: 'user' | 'bot'
  content: string
}

export const BotViewer: FC<BotViewerProps> = ({ bot }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [currentGroup, setCurrentGroup] = useState(bot.groups[0])
  const [variables, setVariables] = useState<Record<string, any>>({})

  useEffect(() => {
    // 处理初始消息
    const startGroup = bot.groups.find(g => g.blocks[0]?.type === 'start')
    if (startGroup) {
      setCurrentGroup(startGroup)
      processFlow(startGroup, variables, handleBotResponse)
    }
  }, [])

  const handleBotResponse = (response: string) => {
    setMessages(prev => [...prev, { type: 'bot', content: response }])
  }

  const handleUserInput = async () => {
    if (!input.trim()) return

    // 添加用户消息
    setMessages(prev => [...prev, { type: 'user', content: input }])
    
    // 更新变量
    const updatedVariables = { ...variables, userInput: input }
    setVariables(updatedVariables)
    
    // 处理下一个组
    const nextGroup = findNextGroup(currentGroup, input)
    if (nextGroup) {
      setCurrentGroup(nextGroup)
      await processFlow(nextGroup, updatedVariables, handleBotResponse)
    }
    
    setInput('')
  }

  const findNextGroup = (currentGroup: Group, input: string) => {
    const edge = bot.edges.find(e => 
      e.from === currentGroup.id && 
      matchesCondition(e, input)
    )
    return edge ? bot.groups.find(g => g.id === edge.to) : null
  }

  return (
    <Stack spacing={4}>
      <Box 
        height="60vh" 
        overflowY="auto" 
        p={4} 
        borderWidth={1}
        borderRadius="md"
      >
        {messages.map((msg, i) => (
          <Box 
            key={i}
            alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
            bg={msg.type === 'user' ? 'blue.500' : 'gray.100'}
            color={msg.type === 'user' ? 'white' : 'black'}
            p={2}
            borderRadius="md"
            maxW="70%"
            mb={2}
          >
            <Text>{msg.content}</Text>
          </Box>
        ))}
      </Box>

      <Stack direction="row" spacing={2}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={e => e.key === 'Enter' && handleUserInput()}
        />
        <Button onClick={handleUserInput}>Send</Button>
      </Stack>
    </Stack>
  )
} 