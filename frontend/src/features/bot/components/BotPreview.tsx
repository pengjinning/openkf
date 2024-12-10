import { FC, useState, useEffect } from 'react'
import { Stack, Box, Text, Input, Button } from '@/components/ui'
import { Bot } from '@/types/bot'
import { processBlock } from '@/features/flow/utils/blockProcessor'
import { trackBotStart, trackBotCompletion } from '@/api/bot'

interface BotPreviewProps {
  bot: Bot
  isEmbedded?: boolean
}

interface Message {
  type: 'bot' | 'user'
  content: string
}

export const BotPreview: FC<BotPreviewProps> = ({ bot, isEmbedded }) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentBlock, setCurrentBlock] = useState(bot.flow.blocks[0])
  const [input, setInput] = useState('')
  const [variables, setVariables] = useState<Record<string, any>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    if (currentBlock && !hasStarted) {
      setHasStarted(true)
      trackBotStart(bot.id)
    }
  }, [currentBlock, hasStarted, bot.id])

  const handleBotResponse = async (content: string) => {
    if (bot.settings.typing.enabled) {
      setIsTyping(true)
      await delay(bot.settings.typing.delay)
      setIsTyping(false)
    }
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
    const edge = bot.flow.edges.find(e => e.source === currentBlock.id)
    if (edge) {
      const nextBlock = bot.flow.blocks.find(b => b.id === edge.target)
      if (nextBlock) {
        setCurrentBlock(nextBlock)
        await processBlock(nextBlock, updatedVariables, handleBotResponse)
      } else {
        // No next block means conversation is complete
        trackBotCompletion(bot.id)
      }
    } else {
      // No edge means conversation is complete
      trackBotCompletion(bot.id)
    }
    
    setInput('')
  }

  return (
    <Stack spacing={4}>
      <Box
        height={isEmbedded ? '100vh' : '60vh'}
        overflowY="auto"
        p={4}
        borderWidth={isEmbedded ? 0 : 1}
        borderRadius={isEmbedded ? 0 : 'md'}
        bg={bot.settings.theme.general.background}
        style={{
          fontFamily: bot.settings.theme.general.font,
          maxWidth: bot.settings.theme.general.containerWidth,
          margin: '0 auto'
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
            bg={msg.type === 'user' 
              ? bot.settings.theme.chat.guestBubbles.backgroundColor 
              : bot.settings.theme.chat.hostBubbles.backgroundColor}
            color={msg.type === 'user'
              ? bot.settings.theme.chat.guestBubbles.color
              : bot.settings.theme.chat.hostBubbles.color}
            p={2}
            borderRadius="md"
            maxW="70%"
            mb={2}
          >
            <Text>{msg.content}</Text>
          </Box>
        ))}
        {isTyping && (
          <Box alignSelf="flex-start" p={2}>
            <Text fontSize="sm" color="gray.500">
              Typing...
            </Text>
          </Box>
        )}
      </Box>

      <Stack direction="row" spacing={2}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message..."
          onKeyPress={e => e.key === 'Enter' && handleUserInput()}
          bg={bot.settings.theme.chat.inputs.backgroundColor}
          color={bot.settings.theme.chat.inputs.color}
          _placeholder={{
            color: bot.settings.theme.chat.inputs.placeholderColor
          }}
          disabled={isTyping}
          aria-label="Message input"
        />
        <Button
          onClick={handleUserInput}
          bg={bot.settings.theme.chat.buttons.backgroundColor}
          color={bot.settings.theme.chat.buttons.color}
          disabled={isTyping}
          aria-label="Send message"
        >
          Send
        </Button>
      </Stack>
    </Stack>
  )
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)) 