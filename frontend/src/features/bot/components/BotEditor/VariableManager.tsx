import { FC } from 'react'
import { Stack, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, Input, Select } from '@/components/ui'
import { PlusIcon, DeleteIcon } from '@/components/icons'
import { Variable } from '@/types/bot'

interface VariableManagerProps {
  variables: Variable[]
  onChange: (variables: Variable[]) => void
}

export const VariableManager: FC<VariableManagerProps> = ({ variables, onChange }) => {
  const handleAdd = () => {
    const newVariable: Variable = {
      id: `var-${Date.now()}`,
      name: `variable${variables.length + 1}`,
      type: 'string',
      value: ''
    }
    onChange([...variables, newVariable])
  }

  const handleDelete = (id: string) => {
    onChange(variables.filter(v => v.id !== id))
  }

  const handleChange = (id: string, field: keyof Variable, value: any) => {
    onChange(
      variables.map(v => 
        v.id === id ? { ...v, [field]: value } : v
      )
    )
  }

  return (
    <Stack spacing={4}>
      <Button 
        leftIcon={<PlusIcon />} 
        alignSelf="flex-start"
        onClick={handleAdd}
      >
        Add Variable
      </Button>

      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Type</Th>
            <Th>Default Value</Th>
            <Th width="50px"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {variables.map(variable => (
            <Tr key={variable.id}>
              <Td>
                <Input
                  aria-label={`Variable name for ${variable.name}`}
                  placeholder="Enter variable name"
                  value={variable.name}
                  onChange={e => handleChange(variable.id, 'name', e.target.value)}
                />
              </Td>
              <Td>
                <Select
                  aria-label={`Variable type for ${variable.name}`}
                  value={variable.type}
                  onChange={e => handleChange(variable.id, 'type', e.target.value)}
                >
                  <option value="string">String</option>
                  <option value="number">Number</option>
                  <option value="boolean">Boolean</option>
                </Select>
              </Td>
              <Td>
                <Input
                  aria-label={`Default value for ${variable.name}`}
                  placeholder="Enter default value"
                  value={variable.value}
                  onChange={e => handleChange(variable.id, 'value', e.target.value)}
                />
              </Td>
              <Td>
                <IconButton
                  aria-label={`Delete variable ${variable.name}`}
                  icon={<DeleteIcon />}
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => handleDelete(variable.id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Stack>
  )
} 