export interface Template {
  id: string
  name: string
  description?: string
  category: string
  settings?: {
    general?: {
      isPublic?: boolean;
    };
    theme?: {
      chat?: {
        hostBubbles?: {
          backgroundColor?: string;
          color?: string;
        };
      };
    };
  }
} 
