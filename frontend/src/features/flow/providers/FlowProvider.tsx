import { FC, createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { useFlowStore } from '../store/flowStore'
import { flowApi } from '@/api/flow'

const FlowContext = createContext<null>(null)

export const FlowProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { flowId } = useParams()
  const toast = useToast()
  const setFlow = useFlowStore((state) => state.setFlow)

  useEffect(() => {
    if (!flowId) return

    const fetchFlow = async () => {
      try {
        const flow = await flowApi.getFlow(flowId)
        setFlow(flow)
      } catch (error) {
        toast({
          title: 'Failed to load flow',
          status: 'error',
        })
      }
    }

    fetchFlow()
  }, [flowId, setFlow, toast])

  return <FlowContext.Provider value={null}>{children}</FlowContext.Provider>
}

export const useFlow = () => {
  const context = useContext(FlowContext)
  if (context === undefined) {
    throw new Error('useFlow must be used within a FlowProvider')
  }
  return context
} 