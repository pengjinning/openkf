import { useState, useEffect } from 'react'
import { User } from '@/types/user'
import { getCurrentUser } from '@/api/user'

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser()
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch user'))
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return {
    user,
    loading,
    error,
    setUser
  }
} 
