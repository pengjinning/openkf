import { FC, memo } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Text, Stack, IconButton } from '@/components/ui'
import { EditIcon, DeleteIcon } from '@/components/icons'
import { BlockData } from '@/types/flow'

interface BlockNodeProps {
  data: BlockData & {
    onEdit?: () => void
    onDelete?: () => void
  }
}

export const BlockNode: FC<BlockNodeProps> = memo(({ data }) => {
  const renderContent = () => {
    switch (data.type) {
      case 'text':
        return (
          <Text fontSize="sm" whiteSpace="pre-wrap">
            {data.content}
          </Text>
        )
      case 'input':
        return (
          <Stack spacing={1}>
            <Text fontSize="sm">{data.question}</Text>
            <Text color="gray.500" fontSize="xs">
              Variable: {data.variableName}
            </Text>
          </Stack>
        )
      case 'choice':
        return (
          <Stack spacing={1}>
            <Text fontSize="sm">{data.question}</Text>
            <Stack spacing={0.5}>
              {data.choices.map(choice => (
                <Text key={choice.id} fontSize="xs" color="gray.600">
                  • {choice.content}
                </Text>
              ))}
            </Stack>
          </Stack>
        )
      case 'condition':
        return (
          <Stack spacing={1}>
            <Text fontSize="xs" color="gray.500">
              {data.logicalOperator.toUpperCase()}
            </Text>
            {data.conditions.map(condition => (
              <Text key={condition.id} fontSize="xs">
                {condition.variableName} {condition.operator} {condition.value}
              </Text>
            ))}
          </Stack>
        )
      case 'api':
        return (
          <Stack spacing={1}>
            <Text fontSize="xs" color="gray.500">
              {data.method} {data.url}
            </Text>
            {data.resultVariable && (
              <Text fontSize="xs">
                → {data.resultVariable}
              </Text>
            )}
          </Stack>
        )
      default:
        return <Text>Unknown block type</Text>
    }
  }

  return (
    <Box
      bg="white"
      borderWidth={1}
      borderRadius="md"
      p={3}
      minWidth={200}
      position="relative"
      boxShadow="sm"
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        style={{ background: '#718096' }}
      />
      
      <Box mb={2}>
        <Text fontSize="xs" color="gray.500" textTransform="capitalize">
          {data.type}
        </Text>
      </Box>

      {renderContent()}

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

      <Handle 
        type="source" 
        position={Position.Bottom}
        style={{ background: '#718096' }}
      />
    </Box>
  )
}) 