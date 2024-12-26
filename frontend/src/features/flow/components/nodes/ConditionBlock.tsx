import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Text } from '@/components/ui';

interface ConditionBlockProps {
  data: {
    label?: string;
  };
}

export const ConditionBlock: FC<ConditionBlockProps> = ({ data }) => {
  return (
    <Box bg="white" p={3} borderRadius="md" shadow="sm">
      <Handle type="target" position={Position.Left} />
      <Text>{data.label || '条件'}</Text>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
}; 