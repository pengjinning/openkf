import { FC, memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Text, IconButton } from '@/components/ui'
import { EditIcon, DeleteIcon } from '@/components/icons'

interface BlockNodeProps {
  data: {
    id: string
    type: string
    content: string
    onEdit?: () => void
    onDelete?: () => void
  }
}

export const BlockNode: FC<BlockNodeProps> = memo(({ data }) => {
  return (
    <Box
      bg="white"
      borderWidth={1}
      borderRadius="md"
      p={2}
      minWidth={200}
      position="relative"
    >
      <Handle type="target" position={Position.Top} />
      
      <Box mb={2}>
        <Text fontSize="xs" color="gray.500">
          {data.type}
        </Text>
      </Box>

      <Text noOfLines={2}>{data.content}</Text>

      <Box position="absolute" right={2} top={2}>
        {data.onEdit && (
          <IconButton
            aria-label="Edit block"
            icon={<EditIcon />}
            size="sm"
            variant="ghost"
            onClick={data.onEdit}
          />
        )}
        {data.onDelete && (
          <IconButton
            aria-label="Delete block"
            icon={<DeleteIcon />}
            size="sm"
            variant="ghost"
            colorScheme="red"
            onClick={data.onDelete}
          />
        )}
      </Box>

      <Handle type="source" position={Position.Bottom} />
    </Box>
  )
}) 