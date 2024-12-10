import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { login, register, logout, setAuthToken } from '@/api/auth'
import { LoginCredentials, RegisterCredentials } from '@/types/auth'

export const useAuth = () => {
  const navigate = useNavigate()

  const { mutate: loginMutation, isLoading: isLoggingIn } = useMutation(
    (credentials: LoginCredentials) => login(credentials),
    {
      onSuccess: ({ token }) => {
        setAuthToken(token)
        navigate('/dashboard')
      }
    }
  )

  const { mutate: registerMutation, isLoading: isRegistering } = useMutation(
    (credentials: RegisterCredentials) => register(credentials),
    {
      onSuccess: ({ token }) => {
        setAuthToken(token)
        navigate('/onboarding')
      }
    }
  )

  const { mutate: logoutMutation } = useMutation(logout, {
    onSuccess: () => {
      setAuthToken('')
      navigate('/login')
    }
  })

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
    isLoggingIn,
    isRegistering
  }
} 