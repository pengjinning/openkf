import { FC } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Text } from '@/components/ui'

interface ButtonBlockProps {
  data: {
    label?: string;
  };
}

export const ButtonBlock: FC<ButtonBlockProps> = ({ data }) => {
  return (
    <Box bg="white" p={3} borderRadius="md" shadow="sm">
      <Handle type="target" position={Position.Left} />
      <Text>{data.label || '按钮'}</Text>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
} 