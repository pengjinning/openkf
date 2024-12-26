import { FC } from 'react'
import { Box, Text, HStack, Icon } from '@chakra-ui/react'
import { Block } from '@/types/flow'
import { useFlowStore } from '../store/flowStore'
import { getBlockIcon } from '../utils/blockIcons'

interface FlowBlockProps {
  block: Block
  isFirst: boolean
  isLast: boolean
}

export const FlowBlock: FC<FlowBlockProps> = ({ block, isFirst, isLast }) => {
  const selectedBlockId = useFlowStore((state) => state.selectedBlockId)
  const setSelectedBlock = useFlowStore((state) => state.setSelectedBlock)

  const isSelected = selectedBlockId === block.id

  return (
    <Box
      bg={isSelected ? 'blue.50' : 'white'}
      borderWidth={1}
      borderColor={isSelected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      p={3}
      mb={2}
      cursor="pointer"
      onClick={() => setSelectedBlock(block.id)}
      _hover={{ borderColor: 'blue.500' }}
      position="relative"
    >
      <HStack spacing={3}>
        <Icon as={getBlockIcon(block.type)} />
        <Text fontSize="sm">
          {block.type === 'text' ? block.content?.text || 'Text block' : block.type}
        </Text>
      </HStack>

      {/* Connection Points */}
      {isFirst && (
        <Box
          position="absolute"
          top="-2px"
          left="50%"
          transform="translate(-50%, -50%)"
          w="12px"
          h="12px"
          borderRadius="full"
          border="2px solid"
          borderColor="gray.300"
          bg="white"
        />
      )}
      {isLast && (
        <Box
          position="absolute"
          bottom="-2px"
          left="50%"
          transform="translate(-50%, 50%)"
          w="12px"
          h="12px"
          borderRadius="full"
          border="2px solid"
          borderColor="gray.300"
          bg="white"
        />
      )}
    </Box>
  )
} 