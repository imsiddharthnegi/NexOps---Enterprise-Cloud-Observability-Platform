import { NextResponse } from "next/server"
import { AnalyticsData } from "@/types/analytics"

/**
 * Handles GET requests for analytics data.
 * Returns mock API request data, server load data, and recent alerts.
 * @returns {NextResponse} JSON response with analytics data or an error message.
 */
export async function GET() {
  try {
    const apiRequestsData = [
      { name: "00:00", uv: 120, pv: 100 },
      { name: "03:00", uv: 80, pv: 120 },
      { name: "06:00", uv: 40, pv: 80 },
      { name: "09:00", uv: 180, pv: 150 },
      { name: "12:00", uv: 240, pv: 200 },
      { name: "15:00", uv: 210, pv: 180 },
      { name: "18:00", uv: 160, pv: 140 },
      { name: "21:00", uv: 190, pv: 160 },
    ]

    const serverLoadData = [
      { name: "Server 1", uv: 75, pv: 80 },
      { name: "Server 2", uv: 45, pv: 50 },
      { name: "Server 3", uv: 60, pv: 65 },
      { name: "Server 4", uv: 90, pv: 85 },
    ]

    const recentAlertsData = [
      {
        id: "1",
        message: "Server 1 is experiencing high CPU usage",
        timestamp: "2024-07-01T14:30:00Z",
        severity: "High",
      },
      {
        id: "2",
        message: "Disk space is running low on Server 3",
        timestamp: "2024-07-01T13:00:00Z",
        severity: "Medium",
      },
      {
        id: "3",
        message: "Database service on Server 2 is unresponsive",
        timestamp: "2024-07-01T12:15:00Z",
        severity: "High",
      },
    ]

    const data: AnalyticsData = {
      apiRequestsData,
      serverLoadData,
      recentAlertsData,
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics data" }, { status: 500 })
  }
}
