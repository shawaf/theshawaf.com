import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("feedsdb")
    const feeds = await db.collection("feeds").find({}).sort({ createdAt: -1 }).toArray()

    return NextResponse.json(feeds)
  } catch (error) {
    console.error("Error fetching feeds:", error)
    return NextResponse.json({ error: "Error fetching feeds" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { content } = await req.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("feedsdb")
    const result = await db.collection("feeds").insertOne({
      content,
      createdAt: new Date(),
    })

    return NextResponse.json({
      success: true,
      feed: {
        id: result.insertedId,
        content,
        createdAt: new Date(),
      },
    })
  } catch (error) {
    console.error("Error creating feed:", error)
    return NextResponse.json({ error: "Error creating feed" }, { status: 500 })
  }
}

