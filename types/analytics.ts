export interface ApiRequestData {
  name: string
  uv: number
  pv: number
}

export interface ServerLoadData {
  name: string
  uv: number
  pv: number
}

export interface RecentAlert {
  id: string
  message: string
  timestamp: string
  severity: "High" | "Medium" | "Low"
}

export interface AnalyticsData {
  apiRequestsData: ApiRequestData[]
  serverLoadData: ServerLoadData[]
  recentAlertsData: RecentAlert[]
}
