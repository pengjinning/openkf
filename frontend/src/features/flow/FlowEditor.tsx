import { FC, useState, useCallback, useEffect } from 'react'
import { Stack, Box } from '@/components/ui'
import { Flow, Block, BlockType } from '@/types/flow'
import { FlowCanvas } from './components/FlowCanvas'
import { FlowToolbar } from './components/FlowToolbar'
import { TextBlockEditor } from './dialogs/TextBlockEditor'
import { InputBlockEditor } from './dialogs/InputBlockEditor'
import { ButtonBlockEditor } from './dialogs/ButtonBlockEditor'
import { WebhookBlockEditor } from './dialogs/WebhookBlockEditor'
import { ApiBlockEditor } from './dialogs/ApiBlockEditor'
import { ConditionBlockEditor } from './dialogs/ConditionBlockEditor'
import { useHistory } from '@/hooks/useHistory'

interface FlowEditorProps {
  flow: Flow
  onChange: (flow: Flow) => void
}

export const FlowEditor: FC<FlowEditorProps> = ({ flow: initialFlow, onChange }) => {
  const {
    state: flow,
    set: setFlow,
    undo,
    redo,
    canUndo,
    canRedo
  } = useHistory(initialFlow)

  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [editingBlock, setEditingBlock] = useState<Block | null>(null)

  useEffect(() => {
    onChange(flow)
  }, [flow, onChange])

  const handleAddNode = useCallback((type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      position: { x: 100, y: 100 },
      data: {}
    }
    setFlow({
      ...flow,
      blocks: [...flow.blocks, newBlock]
    })
  }, [flow, setFlow])

  const handleNodeSelect = useCallback((nodeId: string) => {
    const block = flow.blocks.find(b => b.id === nodeId)
    if (block) {
      setSelectedBlock(block)
      setEditingBlock(block)
    }
  }, [flow.blocks])

  const handleBlockSave = useCallback((updatedBlock: Block) => {
    setFlow({
      ...flow,
      blocks: flow.blocks.map(b => 
        b.id === updatedBlock.id ? updatedBlock : b
      )
    })
    setEditingBlock(null)
  }, [flow, setFlow])

  const handleDeleteBlock = useCallback(() => {
    if (!selectedBlock) return
    setFlow({
      ...flow,
      blocks: flow.blocks.filter(b => b.id !== selectedBlock.id),
      edges: flow.edges.filter(e => 
        e.source !== selectedBlock.id && e.target !== selectedBlock.id
      )
    })
    setSelectedBlock(null)
  }, [flow, selectedBlock, setFlow])

  const handleConnect = useCallback((params: Connection) => {
    const newEdge: Edge = {
      id: `${params.source}-${params.target}`,
      source: params.source!,
      target: params.target!,
      sourceHandle: params.sourceHandle,
      targetHandle: params.targetHandle
    }
    setFlow({
      ...flow,
      edges: [...flow.edges, newEdge]
    })
  }, [flow, setFlow])

  return (
    <Stack spacing={0} h="full">
      <FlowToolbar
        flow={flow}
        onAddNode={handleAddNode}
        onDelete={selectedBlock ? handleDeleteBlock : undefined}
        onUndo={canUndo ? undo : undefined}
        onRedo={canRedo ? redo : undefined}
        canUndo={canUndo}
        canRedo={canRedo}
      />

      <Box flex={1} position="relative">
        <FlowCanvas
          flow={flow}
          onChange={onChange}
          onNodeSelect={handleNodeSelect}
        />
      </Box>

      {editingBlock?.type === BlockType.TEXT && (
        <TextBlockEditor
          isOpen={true}
          onClose={() => setEditingBlock(null)}
          block={editingBlock}
          onSave={handleBlockSave}
        />
      )}

      {editingBlock?.type === BlockType.INPUT && (
        <InputBlockEditor
          isOpen={true}
          onClose={() => setEditingBlock(null)}
          block={editingBlock}
          onSave={handleBlockSave}
        />
      )}

      {editingBlock?.type === BlockType.BUTTON && (
        <ButtonBlockEditor
          isOpen={true}
          onClose={() => setEditingBlock(null)}
          block={editingBlock}
          onSave={handleBlockSave}
        />
      )}

      {editingBlock?.type === BlockType.WEBHOOK && (
        <WebhookBlockEditor
          isOpen={true}
          onClose={() => setEditingBlock(null)}
          block={editingBlock}
          onSave={handleBlockSave}
        />
      )}

      {editingBlock?.type === BlockType.API && (
        <ApiBlockEditor
          isOpen={true}
          onClose={() => setEditingBlock(null)}
          block={editingBlock}
          onSave={handleBlockSave}
        />
      )}

      {editingBlock?.type === BlockType.CONDITION && (
        <ConditionBlockEditor
          isOpen={true}
          onClose={() => setEditingBlock(null)}
          block={editingBlock}
          onSave={handleBlockSave}
        />
      )}
    </Stack>
  )
} 