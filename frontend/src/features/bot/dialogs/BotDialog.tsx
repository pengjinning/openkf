import { FC, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, Stack, Button } from '@/components/ui'
import { Bot } from '@/types/bot'
import { BotForm } from '../components/BotForm'

interface BotDialogProps {
  isOpen: boolean
  onClose: () => void
  bot?: Bot
  onSave: (bot: Partial<Bot>) => void
}

export const BotDialog: FC<BotDialogProps> = ({
  isOpen,
  onClose,
  bot,
  onSave
}) => {
  const [editingBot, setEditingBot] = useState<Partial<Bot>>(
    bot || {
      name: '',
      description: '',
      settings: {
        general: {
          isPublic: false,
          isClosed: false,
          isArchived: false
        },
        typing: {
          enabled: true,
          speed: 300,
          delay: 1000
        },
        theme: defaultTheme,
        security: {},
        analytics: {
          enabled: false
        }
      }
    }
  )

  const handleSave = () => {
    onSave(editingBot)
    onClose()
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {bot ? 'Edit Bot' : 'Create Bot'}
          </DialogTitle>
        </DialogHeader>

        <Stack spacing={4}>
          <BotForm
            bot={editingBot}
            onChange={setEditingBot}
          />

          <Stack direction="row" justify="flex-end" spacing={2}>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  )
}

const defaultTheme = {
  general: {
    font: 'Inter',
    background: '#ffffff',
    containerWidth: '600px'
  },
  chat: {
    hostBubbles: {
      backgroundColor: '#f7f7f7',
      color: '#303235'
    },
    guestBubbles: {
      backgroundColor: '#ff8e21',
      color: '#ffffff'
    },
    inputs: {
      backgroundColor: '#ffffff',
      color: '#303235',
      placeholderColor: '#9095a0'
    },
    buttons: {
      backgroundColor: '#0042da',
      color: '#ffffff'
    }
  }
} 