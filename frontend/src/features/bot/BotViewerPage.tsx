import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Bot } from '@/types/bot'
import { getBot } from '@/api/bot'
import { BotViewer } from './components/BotViewer'

export const BotViewerPage = () => {
  const { id } = useParams()
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

  if (loading) return <div>Loading...</div>
  if (!bot) return <div>Bot not found</div>

  return <BotViewer bot={bot} />
} 