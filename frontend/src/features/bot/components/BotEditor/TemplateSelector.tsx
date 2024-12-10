import { FC, useEffect, useState } from 'react'
import { Stack, SimpleGrid, Card, Text, Button } from '@/components/ui'
import { getPublicTemplates } from '@/api/template'
import { Template } from '@/types/template'

interface TemplateSelectorProps {
  onSelect: (template: Template) => void
}

export const TemplateSelector: FC<TemplateSelectorProps> = ({ onSelect }) => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const data = await getPublicTemplates()
      setTemplates(data)
    } catch (error) {
      console.error('Failed to fetch templates:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div>Loading templates...</div>

  return (
    <Stack spacing={4}>
      <Text fontSize="lg" fontWeight="bold">
        Choose a template
      </Text>

      <SimpleGrid columns={3} spacing={4}>
        {templates.map(template => (
          <Card key={template.id} p={4}>
            <Stack>
              <Text fontWeight="bold">{template.name}</Text>
              <Text noOfLines={2} color="gray.500">
                {template.description}
              </Text>
              <Button onClick={() => onSelect(template)}>
                Use Template
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  )
} 