import { FC } from 'react'
import { Handle, Position } from 'reactflow'
import { Box, Text } from '@/components/ui'

interface WebhookBlockProps {
  data: {
    label?: string;
  };
}

export const WebhookBlock: FC<WebhookBlockProps> = ({ data }) => {
  return (
    <Box bg="white" p={3} borderRadius="md" shadow="sm">
      <Handle type="target" position={Position.Left} />
      <Text>{data.label || 'Webhook'}</Text>
      <Handle type="source" position={Position.Right} />
    </Box>
  );
} 