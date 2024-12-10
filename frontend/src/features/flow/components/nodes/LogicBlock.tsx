import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Badge, Divider } from '@/components/ui'
import { Block } from '@/types/flow'
import { BaseNode } from './BaseNode'

interface Condition {
  variable: string
  operator: string
  value: string
}

interface Case {
  value: string
  label?: string
}

interface LogicData {
  type: 'condition' | 'switch'
  conditions?: Condition[]
  logicalOperator?: 'and' | 'or'
  switchVariable?: string
  cases?: Case[]
}

export const LogicBlock: FC<NodeProps<Block>> = ({ data, ...props }) => {
  const logicData = data as LogicData

  return (
    <BaseNode type="logic" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={3}>
          <Stack direction="row" align="center" spacing={2}>
            <Text fontSize="sm" color="gray.500">
              Type
            </Text>
            <Badge colorScheme="purple">
              {logicData.type?.toUpperCase()}
            </Badge>
          </Stack>

          <Divider />

          {logicData.type === 'condition' && (
            <Stack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Conditions
              </Text>
              {logicData.conditions?.map((condition, index) => (
                <Box
                  key={index}
                  p={2}
                  borderRadius="md"
                  bg="gray.50"
                  fontSize="sm"
                >
                  <Text>
                    {condition.variable}{' '}
                    <Text as="span" color="blue.500">{condition.operator}</Text>{' '}
                    {condition.value}
                  </Text>
                </Box>
              ))}
              <Text fontSize="sm" fontWeight="medium" color="gray.600">
                {logicData.logicalOperator?.toUpperCase() || 'AND'}
              </Text>
            </Stack>
          )}

          {logicData.type === 'switch' && (
            <>
              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.500">
                  Switch Variable
                </Text>
                <Text fontSize="sm" fontWeight="medium">
                  {logicData.switchVariable}
                </Text>
              </Stack>

              <Divider />

              <Stack spacing={2}>
                <Text fontSize="sm" color="gray.500">
                  Cases
                </Text>
                {logicData.cases?.map((caseItem, index) => (
                  <Box
                    key={index}
                    p={2}
                    borderRadius="md"
                    bg="gray.50"
                    fontSize="sm"
                  >
                    <Text>
                      {caseItem.label || caseItem.value}
                    </Text>
                  </Box>
                ))}
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </BaseNode>
  )
} 