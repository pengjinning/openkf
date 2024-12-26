import create from 'zustand'
import { Flow, Block, Group, FlowEdge } from '@/types/flow'

interface HistoryState {
  past: Flow[]
  future: Flow[]
}

interface FlowState {
  flow: Flow | null
  selectedBlockId: string | null
  isDragging: boolean
  history: HistoryState
  
  setFlow: (flow: Flow) => void
  addGroup: (group: Group) => void
  updateGroup: (groupId: string, updates: Partial<Group>) => void
  deleteGroup: (groupId: string) => void
  
  addBlock: (groupId: string, block: Block) => void
  updateBlock: (blockId: string, updates: Partial<Block>) => void
  deleteBlock: (blockId: string) => void
  
  addEdge: (edge: FlowEdge) => void
  deleteEdge: (edgeId: string) => void
  
  setSelectedBlock: (blockId: string | null) => void
  setIsDragging: (isDragging: boolean) => void

  // History actions
  undo: () => void
  redo: () => void
  pushToHistory: (flow: Flow) => void
}

export const useFlowStore = create<FlowState>((set, get) => ({
  flow: null,
  selectedBlockId: null,
  isDragging: false,

  setFlow: (flow) => set({ flow }),
  
  addGroup: (group) => {
    const { flow } = get()
    if (!flow) return
    set({ flow: { ...flow, groups: [...flow.groups, group] } })
  },

  updateGroup: (groupId, updates) => {
    const { flow } = get()
    if (!flow) return
    set({
      flow: {
        ...flow,
        groups: flow.groups.map((g) =>
          g.id === groupId ? { ...g, ...updates } : g
        ),
      },
    })
  },

  deleteGroup: (groupId) => {
    const { flow } = get()
    if (!flow) return
    set({
      flow: {
        ...flow,
        groups: flow.groups.filter((g) => g.id !== groupId),
      },
    })
  },

  // ... 其他方法实现
})) 