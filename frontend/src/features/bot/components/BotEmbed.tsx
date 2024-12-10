import { FC } from 'react'
import { Stack, Textarea, Button, Text } from '@/components/ui'
import { CopyIcon } from '@/components/icons'
import { Bot } from '@/types/bot'

interface BotEmbedProps {
  bot: Bot
}

export const BotEmbed: FC<BotEmbedProps> = ({ bot }) => {
  const embedCode = `<iframe
  src="${window.location.origin}/bot/${bot.id}/embed"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
  }

  return (
    <Stack spacing={4}>
      <Text fontWeight="medium">Embed Code</Text>
      
      <Stack spacing={2}>
        <Textarea
          value={embedCode}
          readOnly
          rows={4}
          fontFamily="mono"
          aria-label="Embed code"
        />
        <Button
          leftIcon={<CopyIcon />}
          onClick={handleCopy}
          alignSelf="flex-end"
          aria-label="Copy embed code"
        >
          Copy Code
        </Button>
      </Stack>

      <Text fontSize="sm" color="gray.500">
        Add this code to your website to embed the bot
      </Text>
    </Stack>
  )
} 