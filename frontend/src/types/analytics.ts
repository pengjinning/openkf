export interface AnalyticsData {
  totalViews: number
  totalStarts: number
  totalCompletions: number
  completionRate: number
  averageTime: number
  dailyStats: DailyStats[]
  blockStats: BlockStats[]
}

export interface DailyStats {
  date: string
  views: number
  starts: number
  completions: number
}

export interface BlockStats {
  blockId: string
  blockName: string
  totalTime: number
  averageTime: number
  dropRate: number
} 