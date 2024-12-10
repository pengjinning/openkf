import { FC } from 'react'
import { Box, Stack, Text, Button, Divider } from '@/components/ui'
import { nodeConfig } from '../constants/nodeTypes'

interface FlowSidebarProps {
  onAddNode: (type: string) => void
}

export const FlowSidebar: FC<FlowSidebarProps> = ({ onAddNode }) => {
  const nodeCategories = {
    basic: ['text', 'input', 'button'],
    logic: ['condition', 'switch'],
    integration: ['api', 'webhook', 'script']
  }

  return (
    <Box
      width="240px"
      bg="white"
      borderRightWidth={1}
      borderColor="gray.200"
      p={4}
    >
      <Stack spacing={4}>
        <Stack spacing={2}>
          <Text fontWeight="medium" color="gray.700">基础节点</Text>
          {nodeCategories.basic.map(type => (
            <Button
              key={type}
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={nodeConfig[type].icon}
              onClick={() => onAddNode(type)}
            >
              {nodeConfig[type].label}
            </Button>
          ))}
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Text fontWeight="medium" color="gray.700">逻辑节点</Text>
          {nodeCategories.logic.map(type => (
            <Button
              key={type}
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={nodeConfig[type].icon}
              onClick={() => onAddNode(type)}
            >
              {nodeConfig[type].label}
            </Button>
          ))}
        </Stack>

        <Divider />

        <Stack spacing={2}>
          <Text fontWeight="medium" color="gray.700">集成节点</Text>
          {nodeCategories.integration.map(type => (
            <Button
              key={type}
              variant="ghost"
              justifyContent="flex-start"
              leftIcon={nodeConfig[type].icon}
              onClick={() => onAddNode(type)}
            >
              {nodeConfig[type].label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
} 