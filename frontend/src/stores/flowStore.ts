import { create } from 'zustand'
import { Flow } from '@/types/flow'

interface FlowState {
  currentFlow: Flow | null
  setCurrentFlow: (flow: Flow) => void
  clearCurrentFlow: () => void
}

export const useFlowStore = create<FlowState>((set) => ({
  currentFlow: null,
  setCurrentFlow: (flow) => set({ currentFlow: flow }),
  clearCurrentFlow: () => set({ currentFlow: null })
})) 