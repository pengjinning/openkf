/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-10 12:35:55
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-11 16:24:20
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
import { FC, useCallback, useEffect } from 'react'
import { Stack, Box, useToast } from '@chakra-ui/react'
import { useFlowStore } from './store/flowStore'
import { FlowToolbar } from './components/FlowToolbar'
import { FlowSidebar } from './components/FlowSidebar'
import { FlowBoard } from './components/FlowBoard'
import { BlockSettings } from './components/BlockSettings'
import { FlowProvider } from './providers/FlowProvider'
import { flowApi } from '@/api/flow'

export const FlowEditor: FC = () => {
  const toast = useToast()
  const flow = useFlowStore((state) => state.flow)
  const setFlow = useFlowStore((state) => state.setFlow)

  // 保存功能
  const handleSave = useCallback(async () => {
    if (!flow) return

    try {
      const updatedFlow = await flowApi.updateFlow(flow.id, flow)
      setFlow(updatedFlow)
      toast({
        title: 'Flow saved',
        status: 'success',
      })
    } catch (error) {
      toast({
        title: 'Failed to save flow',
        status: 'error',
      })
    }
  }, [flow, setFlow, toast])

  // 快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault()
            handleSave()
            break
          case 'z':
            e.preventDefault()
            if (e.shiftKey) {
              useFlowStore.getState().redo()
            } else {
              useFlowStore.getState().undo()
            }
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleSave])

  if (!flow) return null

  return (
    <FlowProvider>
      <Stack h="100vh" spacing={0}>
        <FlowToolbar flow={flow} onSave={handleSave} />
        <Stack direction="row" flex={1} spacing={0}>
          <FlowSidebar />
          <Box flex={1} bg="gray.50" position="relative">
            <FlowBoard />
          </Box>
          <BlockSettings />
        </Stack>
      </Stack>
    </FlowProvider>
  )
}
