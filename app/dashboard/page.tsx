"use client"
import React, { useEffect, useState } from "react"
import { MenuIcon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"

const LineChartComponent = dynamic(
  () => import("@/components/charts/LineChartComponent").then((mod) => mod.LineChartComponent),
  {
    ssr: false,
    loading: () => <p>Loading Line Chart...</p>,
  }
)

const BarChartComponent = dynamic(
  () => import("@/components/charts/BarChartComponent").then((mod) => mod.BarChartComponent),
  {
    ssr: false,
    loading: () => <p>Loading Bar Chart...</p>,
  }
)

import { AnalyticsData } from "@/types/analytics"

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 w-3/4 rounded bg-gray-300"></div>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="h-72 rounded-lg bg-gray-300 shadow-sm"></div>
      <div className="h-72 rounded-lg bg-gray-300 shadow-sm"></div>
    </div>
    <div className="h-48 rounded-lg bg-gray-300 shadow-sm"></div>
  </div>
)

/**
 * DashboardPage component for displaying analytics and server metrics.
 * Fetches data from the API, handles loading and error states, and displays charts and recent alerts.
 * @returns {JSX.Element} The dashboard page.
 */
export default function DashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loggedIn = localStorage.getItem("isLoggedIn")
      if (!loggedIn) {
        router.push("/login")
      }
    }

    /**
     * Fetches analytics data from the API.
     * Sets loading, data, and error states based on the API response.
     */
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/api/analytics")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const result: AnalyticsData = await response.json()
        setData(result)
      } catch (e: unknown) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="relative flex h-screen bg-gray-50">
        {/* Hamburger menu for mobile */}
        <div className="absolute top-4 left-4 z-50 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="rounded-md bg-gray-200 p-2 dark:bg-gray-800"
          >
            {isSidebarOpen ? (
              <XIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        <div
          className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:flex md:translate-x-0 md:flex-col`}
        >
          <nav className="space-y-2">
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              href="#"
            >
              Analytics
            </a>
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              href="#"
            >
              Reports
            </a>
            <a
              className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
              href="#"
            >
              Settings
            </a>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
            >
              Log Out
            </button>
          </nav>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <SkeletonLoader />
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="p-6 text-red-500">Failed to load data: {error}</div>
  }

  if (!data) {
    return <div className="p-6 text-gray-500">No data available.</div>
  }

  const { apiRequestsData, serverLoadData, recentAlertsData } = data

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    router.push("/")
  }

  return (
    <div className="relative flex h-screen bg-gray-50">
      {/* Hamburger menu for mobile */}
      <div className="absolute top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-md bg-gray-200 p-2 dark:bg-gray-800"
        >
          {isSidebarOpen ? (
            <XIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r bg-gray-100 p-4 dark:border-gray-800 dark:bg-gray-900 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:flex md:translate-x-0 md:flex-col`}
      >
        <nav className="space-y-2">
          <a
            className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-800"
            href="#"
          >
            Dashboard
          </a>
          <a
            className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
            href="#"
          >
            Analytics
          </a>
          <a
            className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
            href="#"
          >
            Reports
          </a>
          <a
            className="flex items-center gap-2 rounded-md px-3 py-2 font-medium text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-800"
            href="#"
          >
            Settings
          </a>
        </nav>
      </div>
      {/* Main Content Placeholder */}
      <div className="flex-1 overflow-y-auto p-6">
        <h1 className="mb-6 text-2xl font-bold">Dashboard Overview</h1>
        {/* Charts Section Placeholder */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Chart 1 */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">API Requests over last 24h</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChartComponent data={apiRequestsData || []} />
            </ResponsiveContainer>
          </div>
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-bold">Server Load</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChartComponent data={serverLoadData || []} />
            </ResponsiveContainer>
          </div>
        </div>
        {/* Recent Activity Table Placeholder */}
        <div className="rounded-lg bg-white p-4 shadow-sm">
          <h2 className="mb-4 text-lg font-bold">Recent Alerts</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Severity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Message
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Timestamp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {(recentAlertsData || []).map((alert) => (
                  <tr key={alert.id}>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{alert.id}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{alert.severity}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{alert.message}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{alert.timestamp}</td>
                    <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{alert.severity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
