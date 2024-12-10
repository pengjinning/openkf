import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Badge, Divider } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

interface IntegrationConfig {
  service: string
  action: string
  params: Record<string, any>
}

export const IntegrationBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  const config = data.config as IntegrationConfig

  return (
    <BaseNode type="integration" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={3}>
          <Stack direction="row" align="center" spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Service
            </Text>
            <Badge colorScheme="blue">
              {config?.service || 'Not configured'}
            </Badge>
          </Stack>

          <Divider />

          <Stack spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Action
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              {config?.action || 'Not set'}
            </Text>
          </Stack>

          {config?.params && Object.keys(config.params).length > 0 && (
            <>
              <Divider />
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.500">
                  Parameters
                </Text>
                {Object.entries(config.params).map(([key, value]) => (
                  <Stack key={key} direction="row" spacing={2} fontSize="sm">
                    <Text color="gray.500">{key}:</Text>
                    <Text fontWeight="medium">{value}</Text>
                  </Stack>
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </BaseNode>
  )
} 