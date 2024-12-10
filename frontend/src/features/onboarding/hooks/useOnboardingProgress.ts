import { useState, useEffect } from 'react';
import { onboardingApi, OnboardingProgress } from '@/api/onboarding';
import { useUser } from '@/hooks/useUser';

export const useOnboardingProgress = () => {
  const { user } = useUser();
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;
    loadProgress();
  }, [user?.id]);

  const loadProgress = async () => {
    if (!user?.id) return;
    try {
      const data = await onboardingApi.getProgress(user.id);
      setProgress(data);
    } catch (err) {
      console.error('Failed to load onboarding progress:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (step: string) => {
    if (!user?.id) return;
    try {
      const data = await onboardingApi.updateProgress(user.id, step);
      setProgress(data);
    } catch (err) {
      console.error('Failed to update onboarding progress:', err);
    }
  };

  return { progress, loading, updateProgress };
}; 
