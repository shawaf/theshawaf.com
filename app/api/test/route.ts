import { NextResponse } from "next/server"

export async function GET() {
  console.log("GET /api/test: Test API called")
  return NextResponse.json({ message: "Test API is working" })
}

