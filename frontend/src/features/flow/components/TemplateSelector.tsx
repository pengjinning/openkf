import { FC, useEffect, useState } from 'react'
import { Stack, SimpleGrid, Card, Text, Button, Skeleton } from '@/components/ui'
import { getPublicTemplates } from '@/api/template'
import { Template } from '@/types/template'

interface TemplateSelectorProps {
  onSelect: (template: Template) => void
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>()

  useEffect(() => {
    loadTemplates()
  }, [])

  const loadTemplates = async () => {
    try {
      setLoading(true)
      const data = await getPublicTemplates()
      setTemplates(data)
    } catch (err) {
      setError('Failed to load templates')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Stack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">Choose a Template</Text>
        <SimpleGrid columns={3} spacing={4}>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} height="200px" borderRadius="md" />
          ))}
        </SimpleGrid>
      </Stack>
    )
  }

  if (error) {
    return (
      <Stack align="center" spacing={4}>
        <Text color="red.500">{error}</Text>
        <Button onClick={loadTemplates} aria-label="Retry loading templates">
          Retry
        </Button>
      </Stack>
    )
  }

  return (
    <Stack spacing={4}>
      <Text fontSize="lg" fontWeight="bold">
        Choose a Template
      </Text>

      <SimpleGrid columns={3} spacing={4}>
        {templates.map(template => (
          <Card 
            key={template.id} 
            p={4} 
            cursor="pointer" 
            onClick={() => onSelect(template)}
            role="button"
            aria-label={`Select ${template.name} template`}
          >
            <Stack>
              <Text fontWeight="bold">{template.name}</Text>
              <Text noOfLines={2} color="gray.500">
                {template.description}
              </Text>
              <Text fontSize="sm" color="gray.400">
                {template.category}
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
} 