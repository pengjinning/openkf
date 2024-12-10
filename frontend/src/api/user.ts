import axios from 'axios';
import { User, OnboardingReplies } from '@/types/user';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCurrentUser = async (): Promise<User> => {
  const { data } = await axios.get(`${API_BASE_URL}/api/users/me`);
  return data;
};

export const updateUser = async (id: string, user: Partial<User>): Promise<User> => {
  const { data } = await axios.put(`${API_BASE_URL}/api/users/${id}`, user);
  return data;
};

export const updateOnboarding = async (replies: OnboardingReplies): Promise<User> => {
  const { data } = await axios.post(`${API_BASE_URL}/api/onboarding`, replies);
  return data;
}; 
