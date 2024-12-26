import { FC, memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, HStack, Icon, Text } from '@chakra-ui/react'
import { getBlockIcon } from '../../utils/blockIcons'
import { Block } from '@/types/flow'

interface BaseNodeProps {
  data: {
    block: Block
  }
  selected: boolean
}

export const BaseNode: FC<BaseNodeProps> = memo(({ data: { block }, selected }) => {
  const BlockIcon = getBlockIcon(block.type)

  return (
    <Box
      bg="white"
      borderWidth={1}
      borderColor={selected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      p={3}
      minW="200px"
      position="relative"
      _hover={{ borderColor: 'blue.500' }}
    >
      <Handle type="target" position={Position.Top} />
      
      <HStack spacing={3}>
        <Icon as={BlockIcon} />
        <Text fontSize="sm">{block.content?.text || block.type}</Text>
      </HStack>

      <Handle type="source" position={Position.Bottom} />
    </Box>
  )
})

BaseNode.displayName = 'BaseNode'