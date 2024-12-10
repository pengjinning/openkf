export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OnboardingReplies {
  name?: string;
  role?: string;
  company?: string;
  useCase?: string;
} 
