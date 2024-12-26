import { FC } from 'react'
import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Sidebar } from './Sidebar'

export const Layout: FC = () => {
  return (
    <Box h="100vh" display="flex" flexDirection="column">
      <Header />
      <Box flex={1} display="flex">
        <Sidebar />
        <Box flex={1} overflow="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
} 