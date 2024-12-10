import { FC, PropsWithChildren } from 'react'
import { NodeProps } from 'reactflow'
import { Box } from '@/components/ui'

export interface BaseNodeProps extends Omit<NodeProps, 'type'> {
  type: string
  data: any
}

export const BaseNode: FC<PropsWithChildren<BaseNodeProps>> = ({
  type,
  data,
  children,
  selected,
  ...props
}) => {
  return (
    <Box
      bg="white"
      borderWidth={1}
      borderColor={selected ? 'blue.500' : 'gray.200'}
      borderRadius="md"
      shadow="sm"
      data-type={type}
      {...props}
    >
      {children}
    </Box>
  )
} 