import { FC } from 'react'
import { Box, VStack, Text } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'

export const Sidebar: FC = () => {
  const location = useLocation()

  const menuItems = [
    { label: 'Flows', path: '/flows' },
    { label: 'Templates', path: '/templates' },
    { label: 'Settings', path: '/settings' },
  ]

  return (
    <Box w="200px" borderRightWidth={1} p={4}>
      <VStack align="stretch" spacing={2}>
        {menuItems.map(({ label, path }) => (
          <Link key={path} to={path}>
            <Text
              p={2}
              borderRadius="md"
              bg={location.pathname.startsWith(path) ? 'blue.50' : 'transparent'}
              color={location.pathname.startsWith(path) ? 'blue.500' : 'inherit'}
            >
              {label}
            </Text>
          </Link>
        ))}
      </VStack>
    </Box>
  )
} 