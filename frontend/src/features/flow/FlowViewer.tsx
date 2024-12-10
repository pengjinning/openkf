import { FC, useState, useEffect } from 'react'
import { Flow, Block, Variable } from '@/types/flow'
import { Stack, Box, Text, Input, Button } from '@/components/ui'
import { processBlock } from './utils/blockProcessor'

interface FlowViewerProps {
  flow: Flow
  onComplete?: (variables: Record<string, any>) => void
}

interface Message {
  type: 'bot' | 'user'
  content: string
}

export const FlowViewer: FC<FlowViewerProps> = ({ flow, onComplete }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentBlock, setCurrentBlock] = useState<Block | null>(null)
  const [variables, setVariables] = useState<Record<string, any>>({})
  const [input, setInput] = useState('')

  useEffect(() => {
    // Start with the first block
    const startBlock = flow.blocks.find(b => !flow.edges.some(e => e.target === b.id))
    if (startBlock) {
      setCurrentBlock(startBlock)
      processBlock(startBlock, variables, handleBotResponse)
    }
  }, [])

  const handleBotResponse = (content: string) => {
    setMessages(prev => [...prev, { type: 'bot', content }])
  }

  const handleUserInput = async () => {
    if (!input.trim() || !currentBlock) return

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: input }])
    
    // Update variables
    const updatedVariables = {
      ...variables,
      [currentBlock.data.variableName]: input
    }
    setVariables(updatedVariables)
    
    // Find next block
    const edge = flow.edges.find(e => e.source === currentBlock.id)
    if (edge) {
      const nextBlock = flow.blocks.find(b => b.id === edge.target)
      if (nextBlock) {
        setCurrentBlock(nextBlock)
        await processBlock(nextBlock, updatedVariables, handleBotResponse)
      } else {
        onComplete?.(updatedVariables)
      }
    }
    
    setInput('')
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