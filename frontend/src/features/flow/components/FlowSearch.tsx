import { FC, useState, useCallback, useEffect } from 'react'
import { 
  Box,
  Stack,
  Input,
  Text,
  Badge,
  IconButton,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  useDisclosure
} from '@/components/ui'
import { SearchIcon, CloseIcon } from '@/components/icons'
import { Block } from '@/types/flow'
import { useReactFlow } from 'reactflow'
import { nodeConfig } from '../constants/nodeTypes'

interface FlowSearchProps {
  isOpen: boolean
  onClose: () => void
  nodes: Block[]
  onNodeSelect: (nodeId: string) => void
}

interface SearchResult {
  node: Block
  matches: {
    field: string
    value: string
    highlight: string[]
  }[]
}

export const FlowSearch: FC<FlowSearchProps> = ({
  isOpen,
  onClose,
  nodes,
  onNodeSelect
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const { setCenter } = useReactFlow()

  // 搜索字段配置
  const searchFields = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: '类型' },
    { key: 'data.label', label: '标签' },
    { key: 'data.content', label: '内容' },
    { key: 'data.variable', label: '变量' }
  ]

  // 搜索逻辑
  const searchNodes = useCallback((term: string) => {
    if (!term.trim()) {
      setResults([])
      return
    }

    const searchResults: SearchResult[] = nodes.map(node => {
      const matches = searchFields.reduce<SearchResult['matches']>((acc, field) => {
        const value = field.key.split('.').reduce((obj, key) => obj?.[key], node as any)
        if (typeof value === 'string' && value.toLowerCase().includes(term.toLowerCase())) {
          const highlight = value.split(new RegExp(`(${term})`, 'gi'))
          acc.push({
            field: field.label,
            value,
            highlight
          })
        }
        return acc
      }, [])

      return {
        node,
        matches
      }
    }).filter(result => result.matches.length > 0)

    setResults(searchResults)
  }, [nodes])

  // 处理节点选择
  const handleNodeSelect = useCallback((node: Block) => {
    setCenter(node.position.x, node.position.y, { zoom: 1.5, duration: 800 })
    onNodeSelect(node.id)
    onClose()
  }, [setCenter, onNodeSelect, onClose])

  // 快捷键支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogContent maxW="600px">
        <DialogHeader>
          <DialogTitle>搜索节点</DialogTitle>
        </DialogHeader>

        <Stack spacing={4}>
          <Input
            placeholder="搜索节点..."
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value)
              searchNodes(e.target.value)
            }}
            leftElement={<SearchIcon color="gray.500" />}
            rightElement={
              searchTerm && (
                <IconButton
                  icon={<CloseIcon />}
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setSearchTerm('')
                    setResults([])
                  }}
                  aria-label="Clear search"
                />
              )
            }
            autoFocus
          />

          <Box maxH="400px" overflowY="auto">
            {results.length > 0 ? (
              <Stack spacing={2}>
                {results.map(({ node, matches }) => (
                  <Box
                    key={node.id}
                    p={3}
                    borderWidth={1}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: 'gray.50' }}
                    onClick={() => handleNodeSelect(node)}
                  >
                    <Stack spacing={2}>
                      <Stack direction="row" align="center" spacing={2}>
                        <Badge colorScheme={nodeConfig[node.type]?.color || 'gray'}>
                          {nodeConfig[node.type]?.label || node.type}
                        </Badge>
                        <Text fontSize="sm" color="gray.500">
                          {node.id}
                        </Text>
                      </Stack>

                      {matches.map((match, index) => (
                        <Stack key={index} spacing={1}>
                          <Text fontSize="xs" color="gray.500">
                            {match.field}:
                          </Text>
                          <Text fontSize="sm">
                            {match.highlight.map((part, i) => (
                              part.toLowerCase() === searchTerm.toLowerCase() ? (
                                <Box
                                  key={i}
                                  as="span"
                                  bg="yellow.200"
                                  px={1}
                                  rounded="sm"
                                >
                                  {part}
                                </Box>
                              ) : part
                            ))}
                          </Text>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            ) : searchTerm ? (
              <Stack align="center" spacing={2} py={8}>
                <Text color="gray.500">未找到匹配的节点</Text>
              </Stack>
            ) : null}
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  )
} 