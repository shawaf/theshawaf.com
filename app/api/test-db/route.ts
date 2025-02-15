import { NextResponse } from "next/server"
import { sql } from "@vercel/postgres"

export async function GET() {
  try {
    const result = await sql`SELECT NOW()`
    return NextResponse.json({ success: true, timestamp: result.rows[0].now })
  } catch (error) {
    console.error("Database connection error:", error)
    return NextResponse.json(
      {
        error: "Database connection error",
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}

