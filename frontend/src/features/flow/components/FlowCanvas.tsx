import { FC, useCallback } from 'react'
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Connection,
  Edge,
  useNodesState,
  useEdgesState
} from 'reactflow'
import { Box } from '@/components/ui'
import { Flow } from '@/types/flow'
import { nodeTypes } from '../constants/nodeTypes'
import { validateConnection, getConnectionStyle } from '../utils/connectionValidation'
import { snapToGrid } from '../utils/gridAlignment'
import { AlignmentGuides } from './AlignmentGuides'
import 'reactflow/dist/style.css'

interface FlowCanvasProps {
  flow: Flow
  onChange: (flow: Flow) => void
  onNodeSelect?: (nodeId: string) => void
  readOnly?: boolean
}

export const FlowCanvas: FC<FlowCanvasProps> = ({
  flow,
  onChange,
  onNodeSelect,
  readOnly = false
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(flow.blocks)
  const [edges, setEdges, onEdgesChange] = useEdgesState(flow.edges)

  const handleConnect = useCallback(
    (params: Connection) => {
      const validation = validateConnection(params, nodes, edges)
      if (!validation.isValid) return

      const newEdge: Edge = {
        id: `${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        style: getConnectionStyle(true)
      }

      setEdges(eds => [...eds, newEdge])
      onChange({
        ...flow,
        edges: [...flow.edges, newEdge]
      })
    },
    [flow, nodes, edges, onChange, setEdges]
  )

  const handleNodeDragStop = useCallback(
    (event: any, node: any) => {
      const position = snapToGrid(node.position)
      setNodes(nds =>
        nds.map(n => {
          if (n.id === node.id) {
            return { ...n, position }
          }
          return n
        })
      )
    },
    [setNodes]
  )

  return (
    <Box h="full" bg="gray.50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeDragStop={handleNodeDragStop}
        onNodeClick={(_, node) => onNodeSelect?.(node.id)}
        nodeTypes={nodeTypes}
        snapToGrid
        snapGrid={[20, 20]}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        minZoom={0.1}
        maxZoom={2}
        fitView
        attributionPosition="bottom-left"
      >
        <Background />
        <Controls />
        <MiniMap
          nodeStrokeColor="#666"
          nodeColor="#fff"
          nodeBorderRadius={2}
        />
        <AlignmentGuides guides={{ vertical: [], horizontal: [] }} />
      </ReactFlow>
    </Box>
  )
} 