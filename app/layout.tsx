import "styles/tailwind.css"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "NexOps | Enterprise Cloud Observability",
  description: "Real-time infrastructure monitoring for scaling teams.",
  openGraph: {
    title: "NexOps | Enterprise Cloud Observability",
    description: "Real-time infrastructure monitoring for scaling teams.",
    images: [
      {
        url: "/dashboard-preview.png",
        alt: "Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NexOps | Enterprise Cloud Observability",
    description: "Real-time infrastructure monitoring for scaling teams.",
    images: ["/dashboard-preview.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
