import { FC, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  NodeTypes,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Box } from '@chakra-ui/react'
import { useFlowStore } from '../store/flowStore'
import { TextBlock } from './nodes/TextBlock'
import { InputBlock } from './nodes/InputBlock'
import { ConditionBlock } from './nodes/ConditionBlock'
import { WebhookBlock } from './nodes/WebhookBlock'
import { snapToGrid } from '../utils/gridAlignment'

const nodeTypes: NodeTypes = {
  text: TextBlock,
  input: InputBlock,
  condition: ConditionBlock,
  webhook: WebhookBlock,
}

export const FlowBoard: FC = () => {
  const flow = useFlowStore((state) => state.flow)
  const addEdge = useFlowStore((state) => state.addEdge)
  const updateGroup = useFlowStore((state) => state.updateGroup)
  const setSelectedBlock = useFlowStore((state) => state.setSelectedBlock)

  // Convert Flow data to ReactFlow nodes and edges
  const initialNodes = flow?.groups.flatMap((group) =>
    group.blocks.map((block) => ({
      id: block.id,
      type: block.type,
      position: group.graphCoordinates,
      data: { block },
    }))
  ) || []

  const initialEdges = flow?.edges.map((edge) => ({
    id: edge.id,
    source: edge.from.blockId,
    target: edge.to.blockId,
    type: 'smoothstep',
  })) || []

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onNodeDragStop = useCallback(
    (event: any, node: any) => {
      const group = flow?.groups.find((g) =>
        g.blocks.some((b) => b.id === node.id)
      )
      if (!group) return

      updateGroup(group.id, {
        graphCoordinates: snapToGrid(node.position),
      })
    },
    [flow, updateGroup]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!connection.source || !connection.target) return

      addEdge({
        id: `${connection.source}-${connection.target}`,
        from: { blockId: connection.source },
        to: { blockId: connection.target },
      })
    },
    [addEdge]
  )

  const onNodeClick = useCallback(
    (event: any, node: any) => {
      setSelectedBlock(node.id)
    },
    [setSelectedBlock]
  )

  return (
    <Box h="full" bg="gray.50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeDragStop={onNodeDragStop}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        snapToGrid
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  )
} 