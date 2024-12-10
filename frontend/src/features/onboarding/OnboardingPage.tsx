import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Text, Button, SimpleGrid, Card } from '@/components/ui';
import { PlusIcon } from '@/components/icons';
import { Flow } from '@/types/flow';
import { Template } from '@/types/template';
import { getPublicTemplates } from '@/api/template';
import { getBots, createBot } from '@/api/bot';
import { Bot } from '@/types/bot';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const [flows, setFlows] = useState<Bot[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [flowsData, templatesData] = await Promise.all([
        getBots(),
        getPublicTemplates()
      ]);
      setFlows(flowsData);
      setTemplates(templatesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFromTemplate = async (template: Template) => {
    try {
      const defaultTheme = {
        general: {
          font: 'Inter',
          background: '#ffffff',
          containerWidth: '600px'
        },
        chat: {
          hostBubbles: {
            backgroundColor: '#f7f8ff',
            color: '#303235'
          },
          guestBubbles: {
            backgroundColor: '#ff8e21',
            color: '#ffffff'
          },
          inputs: {
            backgroundColor: '#ffffff',
            color: '#303235',
            placeholderColor: '#9095a0'
          },
          buttons: {
            backgroundColor: '#0042da',
            color: '#ffffff'
          }
        }
      };

      const newBot = await createBot({
        name: `Copy of ${template.name}`,
        description: template.description,
        settings: {
          general: {
            isPublic: template.settings?.general?.isPublic ?? false,
            isClosed: false,
            isArchived: false
          },
          typing: {
            enabled: true,
            speed: 300,
            delay: 1000
          },
          theme: template.settings?.theme ?? defaultTheme,
          security: {},
          analytics: {
            enabled: false
          }
        }
      });
      navigate(`/bot/${newBot.id}/edit`);
    } catch (error) {
      console.error('Failed to create bot:', error);
    }
  };

  return (
    <Stack spacing={8} p={8}>
      {/* 已创建的流程 */}
      <Box>
        <Stack direction="row" justify="space-between" align="center" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">我的流程</Text>
          <Button 
            leftIcon={<PlusIcon />}
            onClick={() => navigate('/bot/new')}
          >
            创建新流程
          </Button>
        </Stack>

        {flows.length > 0 ? (
          <SimpleGrid columns={3} spacing={4}>
            {flows.map(flow => (
              <Card key={flow.id} p={4}>
                <Stack>
                  <Text fontWeight="bold">{flow.name}</Text>
                  {flow.description && (
                    <Text color="gray.500" noOfLines={2}>
                      {flow.description}
                    </Text>
                  )}
                  <Button 
                    onClick={() => navigate(`/bot/${flow.id}/edit`)}
                    size="sm"
                  >
                    编辑
                  </Button>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text color="gray.500">还没有创建任何流程</Text>
        )}
      </Box>

      {/* 模板列表 */}
      <Box>
        <Text fontSize="2xl" fontWeight="bold" mb={4}>
          从模板创建
        </Text>
        
        <SimpleGrid columns={3} spacing={4}>
          {templates.map(template => (
            <Card key={template.id} p={4}>
              <Stack>
                <Text fontWeight="bold">{template.name}</Text>
                {template.description && (
                  <Text color="gray.500" noOfLines={2}>
                    {template.description}
                  </Text>
                )}
                <Button
                  onClick={() => handleCreateFromTemplate(template)}
                  size="sm"
                >
                  使用此模板
                </Button>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </Stack>
  );
};
