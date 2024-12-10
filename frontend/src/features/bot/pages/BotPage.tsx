import { FC, useState } from 'react'
import { Stack, Button, Text, useToast } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import { Bot } from '@/types/bot'
import { BotList } from '../components/BotList'
import { BotDialog } from '../dialogs/BotDialog'
import { useDialog } from '@/hooks/useDialog'
import { getBots, createBot, updateBot, deleteBot, duplicateBot } from '@/api/bot'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const BotPage: FC = () => {
  const toast = useToast()
  const queryClient = useQueryClient()
  const { isOpen, open, close } = useDialog()
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null)

  const { data: bots, isLoading } = useQuery<Bot[]>(['bots'], getBots)

  const { mutate: createMutation } = useMutation(createBot, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bots'])
      toast({
        title: 'Bot created successfully',
        status: 'success'
      })
      close()
    },
    onError: () => {
      toast({
        title: 'Failed to create bot',
        status: 'error'
      })
    }
  })

  const { mutate: updateMutation } = useMutation(
    ({ id, data }: { id: string; data: Partial<Bot> }) => updateBot(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['bots'])
        toast({
          title: 'Bot updated successfully',
          status: 'success'
        })
        close()
      },
      onError: () => {
        toast({
          title: 'Failed to update bot',
          status: 'error'
        })
      }
    }
  )

  const { mutate: deleteMutation } = useMutation(deleteBot, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bots'])
      toast({
        title: 'Bot deleted successfully',
        status: 'success'
      })
    },
    onError: () => {
      toast({
        title: 'Failed to delete bot',
        status: 'error'
      })
    }
  })

  const { mutate: duplicateMutation } = useMutation(duplicateBot, {
    onSuccess: () => {
      queryClient.invalidateQueries(['bots'])
      toast({
        title: 'Bot duplicated successfully',
        status: 'success'
      })
    },
    onError: () => {
      toast({
        title: 'Failed to duplicate bot',
        status: 'error'
      })
    }
  })

  const handleCreate = () => {
    setSelectedBot(null)
    open()
  }

  const handleEdit = (bot: Bot) => {
    setSelectedBot(bot)
    open()
  }

  const handleSave = (bot: Partial<Bot>) => {
    if (selectedBot) {
      updateMutation({ id: selectedBot.id, data: bot })
    } else {
      createMutation(bot)
    }
  }

  return (
    <Stack spacing={6}>
      <Stack direction="row" justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Bots
        </Text>
        <Button
          leftIcon={<PlusIcon />}
          onClick={handleCreate}
          aria-label="Create new bot"
        >
          Create Bot
        </Button>
      </Stack>

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <BotList
          bots={bots || []}
          onEdit={handleEdit}
          onDelete={deleteMutation}
          onDuplicate={duplicateMutation}
        />
      )}

      <BotDialog
        isOpen={isOpen}
        onClose={close}
        bot={selectedBot || undefined}
        onSave={handleSave}
      />
    </Stack>
  )
} 