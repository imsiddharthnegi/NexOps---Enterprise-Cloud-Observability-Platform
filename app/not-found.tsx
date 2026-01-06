"use client"
import Button from "@/components/Button/Button.tsx"
import { useRouter } from "next/navigation"

export default function NotFoundPage() {
  const router = useRouter()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
      <p className="mb-8 max-w-md text-lg">
        We couldn't find the page you're looking for. It may have been moved or deleted.
      </p>
      <Button onClick={() => router.push("/dashboard")} className="px-6 py-2">
        Go Back to Dashboard
      </Button>
    </div>
  )
}
