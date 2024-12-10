import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Bot } from '@/types/bot'
import { getBot, updateBot } from '@/api/bot'
import { Button, Stack, Input, Textarea } from '@/components/ui'
import { BotEditor } from './components/BotEditor'

export const BotEditPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [bot, setBot] = useState<Bot | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (id) fetchBot()
  }, [id])

  const fetchBot = async () => {
    try {
      const data = await getBot(id!)
      setBot(data)
    } catch (error) {
      console.error('Failed to fetch bot:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (updatedBot: Partial<Bot>) => {
    try {
      const data = await updateBot(id!, updatedBot)
      setBot(data)
    } catch (error) {
      console.error('Failed to update bot:', error)
    }
  }

  if (loading) return <div>Loading...</div>
  if (!bot) return <div>Bot not found</div>

  return (
    <Stack spacing={4}>
      <Stack direction="row" justify="space-between">
        <Stack>
          <Input
            value={bot.name}
            onChange={e => setBot({ ...bot, name: e.target.value })}
            placeholder="Bot name"
          />
          <Textarea
            value={bot.description || ''}
            onChange={e => setBot({ ...bot, description: e.target.value })}
            placeholder="Bot description"
          />
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button onClick={() => handleSave(bot)}>Save</Button>
          <Button onClick={() => navigate(`/viewer/${bot.id}`)}>Preview</Button>
        </Stack>
      </Stack>

      <BotEditor bot={bot} onChange={setBot} />
    </Stack>
  )
} 