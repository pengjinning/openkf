import { FC } from 'react'
import { Stack, Table, Thead, Tbody, Tr, Th, Td, Badge, IconButton } from '@/components/ui'
import { EditIcon, DeleteIcon, CopyIcon, EyeIcon } from '@/components/icons'
import { Bot } from '@/types/bot'

interface BotListProps {
  bots: Bot[]
  onEdit?: (bot: Bot) => void
  onDelete?: (bot: Bot) => void
  onDuplicate?: (bot: Bot) => void
  onPreview?: (bot: Bot) => void
}

export const BotList: FC<BotListProps> = ({
  bots,
  onEdit,
  onDelete,
  onDuplicate,
  onPreview
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Status</Th>
          <Th>Created</Th>
          <Th>Last Updated</Th>
          <Th width="100px" aria-label="Actions"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {bots.map(bot => (
          <Tr key={bot.id}>
            <Td>{bot.name}</Td>
            <Td>
              <Badge colorScheme={bot.publishedAt ? 'green' : 'gray'}>
                {bot.publishedAt ? 'Published' : 'Draft'}
              </Badge>
            </Td>
            <Td>{new Date(bot.createdAt).toLocaleDateString()}</Td>
            <Td>{new Date(bot.updatedAt).toLocaleDateString()}</Td>
            <Td>
              <Stack direction="row" spacing={1}>
                {onEdit && (
                  <IconButton
                    aria-label={`Edit bot ${bot.name}`}
                    icon={<EditIcon />}
                    size="sm"
                    onClick={() => onEdit(bot)}
                  />
                )}
                {onPreview && (
                  <IconButton
                    aria-label={`Preview bot ${bot.name}`}
                    icon={<EyeIcon />}
                    size="sm"
                    onClick={() => onPreview(bot)}
                  />
                )}
                {onDuplicate && (
                  <IconButton
                    aria-label={`Duplicate bot ${bot.name}`}
                    icon={<CopyIcon />}
                    size="sm"
                    onClick={() => onDuplicate(bot)}
                  />
                )}
                {onDelete && (
                  <IconButton
                    aria-label={`Delete bot ${bot.name}`}
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(bot)}
                  />
                )}
              </Stack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
} 