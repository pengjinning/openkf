import { FC } from 'react'
import { Stack, Input, Button, IconButton } from '@/components/ui'
import { PlusIcon, DeleteIcon } from '@/components/icons'
import { Block } from '@/types/flow'

interface ChoiceBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const ChoiceBlockEditor: FC<ChoiceBlockEditorProps> = ({ block, onChange }) => {
  const handleChange = (field: string, value: any) => {
    onChange({
      ...block,
      data: {
        ...block.data,
        [field]: value
      }
    })
  }

  const handleAddChoice = () => {
    const choices = block.data.choices || []
    handleChange('choices', [
      ...choices,
      {
        id: `choice-${Date.now()}`,
        content: '',
        value: ''
      }
    ])
  }

  const handleDeleteChoice = (id: string) => {
    const choices = block.data.choices || []
    handleChange('choices', choices.filter(c => c.id !== id))
  }

  const handleChoiceChange = (id: string, field: string, value: string) => {
    const choices = block.data.choices || []
    handleChange(
      'choices',
      choices.map(c => (c.id === id ? { ...c, [field]: value } : c))
    )
  }

  return (
    <Stack spacing={4}>
      <Input
        label="Question"
        value={block.data.question || ''}
        onChange={e => handleChange('question', e.target.value)}
        placeholder="Enter your question..."
        aria-label="Choice question text"
      />

      <Input
        label="Variable Name"
        value={block.data.variableName || ''}
        onChange={e => handleChange('variableName', e.target.value)}
        placeholder="Enter variable name..."
        aria-label="Variable name to store choice"
      />

      <Stack spacing={2}>
        {(block.data.choices || []).map(choice => (
          <Stack key={choice.id} direction="row" spacing={2}>
            <Input
              value={choice.content}
              onChange={e => handleChoiceChange(choice.id, 'content', e.target.value)}
              placeholder="Choice text..."
              aria-label={`Choice ${choice.id} text`}
            />
            <Input
              value={choice.value}
              onChange={e => handleChoiceChange(choice.id, 'value', e.target.value)}
              placeholder="Value..."
              aria-label={`Choice ${choice.id} value`}
            />
            <IconButton
              aria-label={`Delete choice ${choice.content || choice.id}`}
              icon={<DeleteIcon />}
              onClick={() => handleDeleteChoice(choice.id)}
            />
          </Stack>
        ))}
      </Stack>

      <Button
        leftIcon={<PlusIcon />}
        variant="ghost"
        onClick={handleAddChoice}
        aria-label="Add new choice"
      >
        Add Choice
      </Button>
    </Stack>
  )
} 