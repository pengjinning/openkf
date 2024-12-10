import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface OnboardingProgress {
  id: string;
  userId: string;
  currentStep: string;
  lastUpdated: string;
  completed: boolean;
}

export const onboardingApi = {
  updateProgress: async (
    userId: string, 
    step: string
  ): Promise<OnboardingProgress> => {
    const { data } = await axios.put(
      `${API_BASE_URL}/api/onboarding/${userId}/progress?step=${step}`
    );
    return data;
  },
  
  getProgress: async (userId: string): Promise<OnboardingProgress> => {
    const { data } = await axios.get(
      `${API_BASE_URL}/api/onboarding/${userId}/progress`
    );
    return data;
  }
}; 
