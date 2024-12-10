import { Flow } from './flow'

export interface Bot {
  id: string
  name: string
  description?: string
  flow: Flow
  settings: BotSettings
  publishedAt?: string
  createdAt: string
  updatedAt: string
}

export interface BotSettings {
  general: {
    isPublic: boolean
    isClosed: boolean
    isArchived: boolean
  }
  typing: {
    enabled: boolean
    speed: number
    delay: number
  }
  theme: BotTheme
  security: {
    reCaptcha?: {
      enabled: boolean
      siteKey?: string
      secretKey?: string
    }
  }
  analytics: {
    enabled: boolean
    provider?: string
    trackingId?: string
  }
}

export interface BotTheme {
  general: {
    font: string
    background: string
    containerWidth: string
  }
  chat: {
    hostBubbles: {
      backgroundColor: string
      color: string
    }
    guestBubbles: {
      backgroundColor: string
      color: string
    }
    inputs: {
      backgroundColor: string
      color: string
      placeholderColor: string
    }
    buttons: {
      backgroundColor: string
      color: string
    }
  }
  customCss?: string
}

export type ThemePath = Array<keyof BotTheme | string> 
