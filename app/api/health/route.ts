import { NextResponse } from "next/server"

/**
 * Handles GET requests for health check.
 * Returns a JSON response with status 'ok'.
 * @returns {NextResponse} JSON response with health status.
 */
export async function GET() {
  return NextResponse.json({ status: "ok" })
}
