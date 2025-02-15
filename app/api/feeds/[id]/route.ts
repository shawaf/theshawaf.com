import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("feedsdb")
    const feed = await db.collection("feeds").findOne({ _id: new ObjectId(params.id) })

    if (!feed) {
      return NextResponse.json({ error: "Feed not found" }, { status: 404 })
    }

    return NextResponse.json(feed)
  } catch (error) {
    console.error("Error fetching feed:", error)
    return NextResponse.json({ error: "Error fetching feed" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { content } = await request.json()

    if (!content) {
      return NextResponse.json({ error: "Content is required" }, { status: 400 })
    }

    const client = await clientPromise
    const db = client.db("feedsdb")
    const result = await db
      .collection("feeds")
      .updateOne({ _id: new ObjectId(params.id) }, { $set: { content, updatedAt: new Date() } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Feed not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating feed:", error)
    return NextResponse.json({ error: "Error updating feed" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await clientPromise
    const db = client.db("feedsdb")
    const result = await db.collection("feeds").deleteOne({ _id: new ObjectId(params.id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Feed not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting feed:", error)
    return NextResponse.json({ error: "Error deleting feed" }, { status: 500 })
  }
}

