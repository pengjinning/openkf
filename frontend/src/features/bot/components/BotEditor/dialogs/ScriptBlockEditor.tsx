import { FC } from 'react'
import { Stack, Input, Select, Switch } from '@/components/ui'
import { Block, ScriptBlockData } from '@/types/block'
import { CodeEditor } from '@/components/CodeEditor'

interface ScriptBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const ScriptBlockEditor: FC<ScriptBlockEditorProps> = ({ block, onChange }) => {
  const handleChange = (field: keyof ScriptBlockData, value: any) => {
    onChange({
      ...block,
      data: {
        ...block.data,
        [field]: value
      }
    })
  }

  return (
    <Stack spacing={4}>
      <Select
        label="Script Language"
        value={block.data?.language || 'javascript'}
        onChange={e => handleChange('language', e.target.value)}
        title="Select script language"
      >
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
      </Select>

      <CodeEditor
        label="Code"
        value={block.data?.code || ''}
        onChange={value => handleChange('code', value)}
        language={block.data?.language || 'javascript'}
        minHeight="200px"
      />

      <Switch
        label="Run Asynchronously"
        isChecked={block.data?.async}
        onChange={e => handleChange('async', e.target.checked)}
      />

      <Input
        label="Store Result In Variable"
        value={block.data?.resultVariable || ''}
        onChange={e => handleChange('resultVariable', e.target.value)}
        placeholder="Enter variable name"
      />
    </Stack>
  )
} 