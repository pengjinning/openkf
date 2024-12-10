import { FC } from 'react'
import { Stack, Button } from '@/components/ui'
import { BlockType } from '@/types/flow'

interface BlockToolbarProps {
  onAddBlock: (type: BlockType) => void
}

export const BlockToolbar: FC<BlockToolbarProps> = ({ onAddBlock }) => {
  return (
    <Stack 
      direction="row" 
      spacing={2} 
      p={2} 
      bg="white" 
      borderBottomWidth={1}
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Button size="sm" onClick={() => onAddBlock('text')}>
        Add Text
      </Button>
      <Button size="sm" onClick={() => onAddBlock('input')}>
        Add Input
      </Button>
      <Button size="sm" onClick={() => onAddBlock('choice')}>
        Add Choice
      </Button>
      <Button size="sm" onClick={() => onAddBlock('condition')}>
        Add Condition
      </Button>
      <Button size="sm" onClick={() => onAddBlock('api')}>
        Add API
      </Button>
    </Stack>
  )
} 