import { FC } from 'react'
import { Stack, Table, Thead, Tbody, Tr, Th, Td, IconButton } from '@/components/ui'
import { EditIcon, DeleteIcon, CopyIcon } from '@/components/icons'
import { Template } from '@/types/template'

interface TemplateListProps {
  templates: Template[]
  onEdit?: (template: Template) => void
  onDelete?: (template: Template) => void
  onDuplicate?: (template: Template) => void
}

export const TemplateList: FC<TemplateListProps> = ({
  templates,
  onEdit,
  onDelete,
  onDuplicate
}) => {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Category</Th>
          <Th>Public</Th>
          <Th>Last Updated</Th>
          <Th width="100px" aria-label="Actions"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {templates.map(template => (
          <Tr key={template.id}>
            <Td>{template.name}</Td>
            <Td>{template.category}</Td>
            <Td>{template.isPublic ? 'Yes' : 'No'}</Td>
            <Td>{new Date(template.updatedAt).toLocaleDateString()}</Td>
            <Td>
              <Stack direction="row" spacing={1}>
                {onEdit && (
                  <IconButton
                    aria-label={`Edit template ${template.name}`}
                    icon={<EditIcon />}
                    size="sm"
                    onClick={() => onEdit(template)}
                  />
                )}
                {onDuplicate && (
                  <IconButton
                    aria-label={`Duplicate template ${template.name}`}
                    icon={<CopyIcon />}
                    size="sm"
                    onClick={() => onDuplicate(template)}
                  />
                )}
                {onDelete && (
                  <IconButton
                    aria-label={`Delete template ${template.name}`}
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => onDelete(template)}
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