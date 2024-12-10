import { FC, useCallback, useState } from 'react'
import ReactFlow, {
  Background,
  Controls,
  Edge,
  Node,
  NodeTypes,
  addEdge,
  useEdgesState,
  useNodesState,
  Connection,
  OnConnect
} from 'reactflow'
import { Group, Edge as BotEdge } from '@/types/bot'
import { Block, BlockType } from '@/types/block'
import { BlockNode } from './nodes/BlockNode'
import { GroupNode } from './nodes/GroupNode'
import { BlockEditor } from './dialogs/BlockEditor'
import { Button } from '@/components/ui'
import { PlusIcon } from '@/components/icons'
import 'reactflow/dist/style.css'

interface FlowEditorProps {
  groups: Group[]
  edges: BotEdge[]
  onChange: (groups: Group[], edges: BotEdge[]) => void
}

const nodeTypes = {
  block: BlockNode,
  group: GroupNode
}

export const FlowEditor: FC<FlowEditorProps> = ({ groups, edges, onChange }) => {
  const [isBlockEditorOpen, setIsBlockEditorOpen] = useState(false)
  const [editingBlock, setEditingBlock] = useState<Block | undefined>()
  const [selectedGroupId, setSelectedGroupId] = useState<string>()

  // Convert groups and blocks to ReactFlow nodes
  const initialNodes = groups.flatMap(group => [
    {
      id: group.id,
      type: 'group',
      position: { x: group.graphCoordinates, y: 0 },
      data: { title: group.title }
    },
    ...group.blocks.map((block, index) => ({
      id: block.id,
      type: 'block',
      position: { x: 0, y: index * 100 },
      parentNode: group.id,
      data: block
    }))
  ])

  // Convert edges to ReactFlow edges
  const initialEdges = edges.map(edge => ({
    id: edge.id,
    source: edge.from,
    target: edge.to,
    sourceHandle: edge.fromPortId,
    targetHandle: edge.toPortId
  }))

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [flowEdges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: any) => {
      const newEdge = {
        id: `${params.source}-${params.target}`,
        from: params.source,
        to: params.target,
        fromPortId: params.sourceHandle,
        toPortId: params.targetHandle
      }
      setEdges(eds => addEdge(params, eds))
      onChange(
        groups,
        [...edges, newEdge]
      )
    },
    [groups, edges, onChange]
  )

  const handleAddBlock = () => {
    setEditingBlock(undefined)
    setIsBlockEditorOpen(true)
  }

  const handleEditBlock = (block: Block) => {
    setEditingBlock(block)
    setIsBlockEditorOpen(true)
  }

  const handleSaveBlock = (block: Block) => {
    if (selectedGroupId) {
      const updatedGroups = groups.map(group => {
        if (group.id === selectedGroupId) {
          return {
            ...group,
            blocks: editingBlock
              ? group.blocks.map(b => b.id === block.id ? block : b)
              : [...group.blocks, block]
          }
        }
        return group
      })
      onChange(updatedGroups, edges)
    }
  }

  return (
    <>
      <div style={{ height: '70vh' }}>
        <Button
          leftIcon={<PlusIcon />}
          onClick={handleAddBlock}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 4 }}
        >
          Add Block
        </Button>

        <ReactFlow
          nodes={nodes}
          edges={flowEdges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => {
            if (node.type === 'block') {
              const group = groups.find(g => g.id === node.parentNode)
              const block = group?.blocks.find(b => b.id === node.id)
              if (block) {
                setSelectedGroupId(group?.id)
                handleEditBlock(block)
              }
            }
          }}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      <BlockEditor
        isOpen={isBlockEditorOpen}
        onClose={() => setIsBlockEditorOpen(false)}
        block={editingBlock}
        onSave={handleSaveBlock}
      />
    </>
  )
} 