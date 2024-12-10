import { FC, memo } from 'react'
import { Handle, Position, NodeProps } from 'reactflow'
import { Box, Text, Icon } from '@/components/ui'
import {
  TextIcon,
  InputIcon,
  ButtonIcon,
  ApiIcon,
  WebhookIcon,
  BranchIcon
} from '@/components/icons'
import { Block } from '@/types/flow'

const nodeIcons = {
  text: TextIcon,
  input: InputIcon,
  button: ButtonIcon,
  condition: BranchIcon,
  api: ApiIcon,
  webhook: WebhookIcon
}

export const FlowNode: FC<NodeProps<Block>> = memo(({ data, selected }) => {
  const NodeIcon = nodeIcons[data.type]

  return (
    <Box
      bg="white"
      borderWidth={1}
      borderColor={selected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      p={3}
      minW="200px"
      shadow="sm"
    >
      <Handle type="target" position={Position.Top} />

      <Stack direction="row" spacing={3} align="center">
        <Icon as={NodeIcon} color="gray.500" boxSize={5} />
        <Stack spacing={0}>
          <Text fontWeight="medium">{data.type}</Text>
          <Text fontSize="sm" color="gray.500">
            {data.label || data.id}
          </Text>
        </Stack>
      </Stack>

      <Handle type="source" position={Position.Bottom} />
    </Box>
  )
})

FlowNode.displayName = 'FlowNode' 