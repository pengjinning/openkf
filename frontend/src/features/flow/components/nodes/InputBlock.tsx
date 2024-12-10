import { FC } from 'react'
import { NodeProps } from 'reactflow'
import { Box, Stack, Text, Input, Select } from '@/components/ui'
import { InputBlockData } from '@/types/nodes'
import { BaseNode } from './BaseNode'

interface InputBlockProps extends Omit<NodeProps, 'data'> {
  data: InputBlockData
}

export const InputBlock: FC<InputBlockProps> = ({ data, type, ...props }) => {
  return (
    <BaseNode type="input" data={data} {...props}>
      <Box p={3}>
        <Stack spacing={3}>
          <Stack spacing={2}>
            <Text id="question-label" fontWeight="medium">
              问题
            </Text>
            <Input
              value={data.question || ''}
              placeholder="Enter your question..."
              isReadOnly
              aria-labelledby="question-label"
            />
          </Stack>

          <Stack spacing={2}>
            <Text id="input-type-label" fontWeight="medium">
              输入类型
            </Text>
            <Select
              value={data.inputType || 'text'}
              isReadOnly
              aria-labelledby="input-type-label"
              title="Select input type"
            >
              <option value="text">文本</option>
              <option value="number">数字</option>
              <option value="email">邮箱</option>
              <option value="url">网址</option>
              <option value="tel">电话</option>
            </Select>
          </Stack>

          <Stack spacing={2}>
            <Text id="variable-label" fontWeight="medium">
              变量名
            </Text>
            <Input
              value={data.variableName || ''}
              placeholder="Enter variable name..."
              isReadOnly
              aria-labelledby="variable-label"
            />
          </Stack>
        </Stack>
      </Box>
    </BaseNode>
  )
} 