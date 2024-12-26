import { FC } from 'react'
import { Box, HStack, Text, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export const Header: FC = () => {
  return (
    <Box px={4} py={2} borderBottomWidth={1}>
      <HStack justify="space-between">
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">
            Bytedesk Flow
          </Text>
        </Link>
        <HStack spacing={4}>
          <Button as={Link} to="/flows/create" colorScheme="blue">
            Create Flow
          </Button>
        </HStack>
      </HStack>
    </Box>
  )
} 