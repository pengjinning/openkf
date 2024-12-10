import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@/components/ui'

export const BaseLayout: FC = () => {
  return (
    <Box minH="100vh" bg="gray.50">
      <Outlet />
    </Box>
  )
} 