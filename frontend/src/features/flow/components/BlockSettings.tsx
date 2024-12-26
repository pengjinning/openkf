import { FC } from 'react'
import {
  Box,
  Stack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react'
import { useFlowStore } from '../store/flowStore'

export const BlockSettings: FC = () => {
  const selectedBlockId = useFlowStore((state) => state.selectedBlockId)
  const flow = useFlowStore((state) => state.flow)
  const updateBlock = useFlowStore((state) => state.updateBlock)
  const deleteBlock = useFlowStore((state) => state.deleteBlock)
  const setSelectedBlock = useFlowStore((state) => state.setSelectedBlock)

  if (!selectedBlockId || !flow) return null

  const block = flow.groups
    .flatMap((g) => g.blocks)
    .find((b) => b.id === selectedBlockId)

  if (!block) return null

  const handleDelete = () => {
    deleteBlock(block.id)
    setSelectedBlock(null)
  }

  return (
    <Box w="300px" h="full" borderLeftWidth={1} bg="white" p={4}>
      <Stack spacing={4}>
        <Text fontSize="lg" fontWeight="medium">
          Block Settings
        </Text>

        <FormControl>
          <FormLabel>Block Type</FormLabel>
          <Input value={block.type} isReadOnly />
        </FormControl>

        {block.type === 'text' && (
          <FormControl>
            <FormLabel>Text Content</FormLabel>
            <Textarea
              value={block.content?.text || ''}
              onChange={(e) =>
                updateBlock(block.id, {
                  content: { ...block.content, text: e.target.value },
                })
              }
              rows={4}
            />
          </FormControl>
        )}

        {block.type === 'input' && (
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Placeholder</FormLabel>
              <Input
                value={block.content?.placeholder || ''}
                onChange={(e) =>
                  updateBlock(block.id, {
                    content: { ...block.content, placeholder: e.target.value },
                  })
                }
              />
            </FormControl>
            <FormControl>
              <FormLabel>Variable Name</FormLabel>
              <Input
                value={block.options?.variableId || ''}
                onChange={(e) =>
                  updateBlock(block.id, {
                    options: { ...block.options, variableId: e.target.value },
                  })
                }
              />
            </FormControl>
          </Stack>
        )}

        <Button
          colorScheme="red"
          variant="ghost"
          onClick={handleDelete}
        >
          Delete Block
        </Button>
      </Stack>
    </Box>
  )
}