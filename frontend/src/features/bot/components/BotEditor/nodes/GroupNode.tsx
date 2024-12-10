import { FC, memo } from 'react'
import { Box, Text, IconButton } from '@/components/ui'
import { EditIcon } from '@/components/icons'

interface GroupNodeProps {
  data: {
    title: string
    onEdit?: () => void
  }
}

export const GroupNode: FC<GroupNodeProps> = memo(({ data }) => {
  return (
    <Box
      bg="gray.50"
      borderWidth={1}
      borderRadius="lg"
      p={4}
      minWidth={300}
      minHeight={200}
    >
      <Box 
        bg="white" 
        borderWidth={1}
        borderRadius="md"
        p={2}
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="bold">{data.title}</Text>
        {data.onEdit && (
          <IconButton
            aria-label="Edit group"
            icon={<EditIcon />}
            size="sm"
            variant="ghost"
            onClick={data.onEdit}
          />
        )}
      </Box>
    </Box>
  )
}) 