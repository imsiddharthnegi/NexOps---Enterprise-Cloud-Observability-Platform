export default function DashboardLoading() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      {/* Skeleton for Header */}
      <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200"></div>

      {/* Skeleton for Charts Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-80 animate-pulse rounded-lg bg-white p-4 shadow"></div>
        <div className="h-80 animate-pulse rounded-lg bg-white p-4 shadow"></div>
      </div>

      {/* Skeleton for Recent Alerts Table */}
      <div className="animate-pulse rounded-lg bg-white p-4 shadow">
        <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
        <div className="space-y-2">
          <div className="h-10 rounded bg-gray-100"></div>
          <div className="h-10 rounded bg-gray-100"></div>
          <div className="h-10 rounded bg-gray-100"></div>
          <div className="h-10 rounded bg-gray-100"></div>
          <div className="h-10 rounded bg-gray-100"></div>
        </div>
      </div>
    </div>
  )
}
