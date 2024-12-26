import { FC, useEffect, useRef } from 'react'
import G6, { Graph } from '@antv/g6'
import { Flow } from '@/types/flow'

interface FlowGraphProps {
  flow: Flow
}

export const FlowGraph: FC<FlowGraphProps> = ({ flow }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<Graph>()

  useEffect(() => {
    if (!containerRef.current) return

    // 注册自定义节点
    G6.registerNode('flow-block', {
      draw(cfg, group) {
        const keyShape = group.addShape('rect', {
          attrs: {
            x: 0,
            y: 0,
            width: 180,
            height: 40,
            radius: 4,
            fill: '#fff',
            stroke: '#e2e8f0',
            cursor: 'pointer',
          },
        })

        group.addShape('text', {
          attrs: {
            text: cfg.label,
            x: 12,
            y: 24,
            fontSize: 14,
            fill: '#000',
            cursor: 'pointer',
          },
        })

        return keyShape
      },
    })

    // 初始化图实例
    const graph = new G6.Graph({
      container: containerRef.current,
      width: containerRef.current.offsetWidth,
      height: containerRef.current.offsetHeight,
      modes: {
        default: ['drag-canvas', 'zoom-canvas', 'drag-node'],
      },
      defaultNode: {
        type: 'flow-block',
      },
      defaultEdge: {
        type: 'cubic-horizontal',
        style: {
          stroke: '#a8b3c2',
          lineWidth: 2,
          endArrow: true,
        },
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        nodesep: 30,
        ranksep: 50,
      },
    })

    graphRef.current = graph

    // 监听窗口大小变化
    const handleResize = () => {
      if (containerRef.current) {
        graph.changeSize(
          containerRef.current.offsetWidth,
          containerRef.current.offsetHeight
        )
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      graph.destroy()
    }
  }, [])

  // 更新数据
  useEffect(() => {
    if (!graphRef.current) return

    const nodes = flow.blocks?.map(block => ({
      id: block.id,
      label: block.type,
      type: 'flow-block',
    })) || []

    const edges = flow.edges?.map(edge => ({
      source: edge.source,
      target: edge.target,
    })) || []

    graphRef.current.data({ nodes, edges })
    graphRef.current.render()
  }, [flow])

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
} 