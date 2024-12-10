import { FC } from 'react';
import { Stack, Text, Button } from '@/components/ui';
import { useNavigate } from 'react-router-dom';

export const DashboardPage: FC = () => {
  const navigate = useNavigate();

  return (
    <Stack p={8} spacing={6}>
      <Text fontSize="2xl" fontWeight="bold">
        欢迎使用 Typebot
      </Text>
      <Button onClick={() => navigate('/onboarding')}>
        开始使用
      </Button>
    </Stack>
  );
}; 
