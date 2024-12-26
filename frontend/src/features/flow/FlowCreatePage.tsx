import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react'
import { flowApi } from '@/api/flow'

export const FlowCreatePage: FC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    try {
      const flow = await flowApi.createFlow({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        groups: [],
        edges: [],
        variables: [],
      })

      toast({
        title: 'Flow created',
        status: 'success',
      })

      navigate(`/flows/${flow.id}`)
    } catch (error) {
      toast({
        title: 'Failed to create flow',
        status: 'error',
      })
    }
  }

  return (
    <Container maxW="container.sm" py={10}>
      <Stack spacing={8}>
        <Heading size="lg">Create New Flow</Heading>

        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" placeholder="My awesome flow" />
            </FormControl>

            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input name="description" placeholder="This flow does..." />
            </FormControl>

            <Button type="submit" colorScheme="blue">
              Create Flow
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  )
} 