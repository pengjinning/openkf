import { FC } from 'react';
import { Handle, Position } from 'reactflow';
import { Box, Text } from '@/components/ui';

interface ApiBlockProps {
  data: {
    label?: string;
  };
}

export const ApiBlock: FC<ApiBlockProps> = ({ data }) => {
  return (
    <Box bg="white" p={3} borderRadius="md" shadow="sm">
      <Handle type="target" position={Position.Left} />
      <Text>{data.label || 'API'}</Text>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
}; 