import { FC } from 'react'
import { Stack, Input, Button, Text } from '@/components/ui'
import { CopyIcon } from '@/components/icons'
import { Bot } from '@/types/bot'

interface BotShareProps {
  bot: Bot
}

export const BotShare: FC<BotShareProps> = ({ bot }) => {
  const shareUrl = `${window.location.origin}/bot/${bot.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <Stack spacing={4}>
      <Text fontWeight="medium">Share Link</Text>
      
      <Stack direction="row" spacing={2}>
        <Input
          value={shareUrl}
          readOnly
          aria-label="Share URL"
        />
        <Button
          leftIcon={<CopyIcon />}
          onClick={handleCopy}
          aria-label="Copy share link"
        >
          Copy
        </Button>
      </Stack>

      <Text fontSize="sm" color="gray.500">
        Share this link to let others interact with your bot
      </Text>
    </Stack>
  )
} 