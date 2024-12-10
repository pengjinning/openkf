import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bot } from '@/types/bot'
import { getWorkspaceBots, deleteBot } from '@/api/bot'
import { Button, Stack, Card, Text } from '@/components/ui'
import { PlusIcon, TrashIcon } from '@/components/icons'

export const BotListPage = () => {
  const navigate = useNavigate()
  const [bots, setBots] = useState<Bot[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBots()
  }, [])

  const fetchBots = async () => {
    try {
      const workspaceId = 'current-workspace-id' // TODO: Get from context
      const data = await getWorkspaceBots(workspaceId)
      setBots(data)
    } catch (error) {
      console.error('Failed to fetch bots:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateBot = () => {
    navigate('/bots/new')
  }

  const handleDeleteBot = async (id: string) => {
    try {
      await deleteBot(id)
      setBots(bots.filter(bot => bot.id !== id))
    } catch (error) {
      console.error('Failed to delete bot:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <Stack spacing={4}>
      <Button leftIcon={<PlusIcon />} onClick={handleCreateBot}>
        Create Bot
      </Button>

      <Stack spacing={2}>
        {bots.map(bot => (
          <Card key={bot.id}>
            <Stack direction="row" justify="space-between" align="center">
              <Stack>
                <Text fontWeight="bold">{bot.name}</Text>
                <Text color="gray.500">{bot.description}</Text>
              </Stack>
              
              <Stack direction="row" spacing={2}>
                <Button onClick={() => navigate(`/bots/${bot.id}`)}>
                  Edit
                </Button>
                <Button 
                  leftIcon={<TrashIcon />}
                  variant="ghost" 
                  colorScheme="red"
                  onClick={() => handleDeleteBot(bot.id)}
                >
                  Delete
                </Button>
              </Stack>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Stack>
  )
} 