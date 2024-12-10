import { FC } from 'react'
import { Stack, Table, Thead, Tbody, Tr, Th, Td, Button, Text } from '@/components/ui'
import { Flow } from '@/types/flow'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFlowVersions, restoreFlowVersion } from '@/api/flow'

interface FlowVersionHistoryProps {
  flow: Flow
}

export const FlowVersionHistory: FC<FlowVersionHistoryProps> = ({ flow }) => {
  const queryClient = useQueryClient()
  const { data: versions, isLoading } = useQuery(['flowVersions', flow.id], () => getFlowVersions(flow.id))

  const { mutate: restoreMutation } = useMutation(
    (versionId: string) => restoreFlowVersion(flow.id, versionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['flow', flow.id])
        queryClient.invalidateQueries(['flowVersions', flow.id])
      }
    }
  )

  if (isLoading) {
    return <Text>Loading versions...</Text>
  }

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Version</Th>
          <Th>Created At</Th>
          <Th width="100px" aria-label="Actions"></Th>
        </Tr>
      </Thead>
      <Tbody>
        {versions?.map((version, index) => (
          <Tr key={version.id}>
            <Td>Version {versions.length - index}</Td>
            <Td>{new Date(version.createdAt).toLocaleString()}</Td>
            <Td>
              <Button
                size="sm"
                onClick={() => restoreMutation(version.id)}
                aria-label={`Restore version ${versions.length - index}`}
              >
                Restore
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
} 