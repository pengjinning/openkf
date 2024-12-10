import { FC } from 'react'
import { Stack, Input, Button, IconButton } from '@/components/ui'
import { PlusIcon, DeleteIcon } from '@/components/icons'
import { Block, Choice } from '@/types/block'

interface ChoiceBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
}

export const ChoiceBlockEditor: FC<ChoiceBlockEditorProps> = ({ block, onChange }) => {
  const choices = block.options?.choices || []

  const handleAddChoice = () => {
    const newChoice: Choice = {
      id: `choice-${Date.now()}`,
      content: '',
      value: ''
    }
    onChange({
      ...block,
      options: {
        ...block.options,
        choices: [...choices, newChoice]
      }
    })
  }

  const handleDeleteChoice = (id: string) => {
    onChange({
      ...block,
      options: {
        ...block.options,
        choices: choices.filter(c => c.id !== id)
      }
    })
  }

  const handleChangeChoice = (id: string, field: keyof Choice, value: string) => {
    onChange({
      ...block,
      options: {
        ...block.options,
        choices: choices.map(c => 
          c.id === id ? { ...c, [field]: value } : c
        )
      }
    })
  }

  return (
    <Stack spacing={4}>
      <Input
        label="Question"
        value={block.content}
        onChange={e => onChange({ ...block, content: e.target.value })}
        placeholder="Enter question..."
      />

      <Stack spacing={2}>
        {choices.map(choice => (
          <Stack key={choice.id} direction="row" spacing={2}>
            <Input
              value={choice.content}
              onChange={e => handleChangeChoice(choice.id, 'content', e.target.value)}
              placeholder="Choice text..."
            />
            <Input
              value={choice.value}
              onChange={e => handleChangeChoice(choice.id, 'value', e.target.value)}
              placeholder="Value..."
            />
            <IconButton
              aria-label="Delete choice"
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
      >
        Add Choice
      </Button>
    </Stack>
  )
} 