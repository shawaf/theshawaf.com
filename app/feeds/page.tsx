import { format } from "date-fns"
import Image from "next/image"
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function getFeeds() {
  const result = await pool.query("SELECT * FROM feeds ORDER BY created_at DESC");
  return result.rows;
}

export default async function FeedsPage() {
  const feeds = await getFeeds()

  // Sort by date DESC (newest first)
  const sortedFeeds = feeds.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      <div className="container mx-auto  h-full">
        <div className="flex flex-col xl:flex-col items-start gap-20 xl:pt-8 xl:ph-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <h3 className="h3 mb-6">
              What&apos;s New
            </h3>
          </div>
          {sortedFeeds.map((feed) => (
            <div key={feed.id} className="rounded-lg p-6">
              <div className="mb-4 text-sm text-[#00ff9d]" p-6>
                <span className="text-accent">
                  {format(new Date(feed.created_at), "MMMM d, yyyy")}
                </span>
              </div>
              <p className="mb-4 text-lg p-6">{feed.content}</p>
              {feed.image_url && (
                <Image
                  src={feed.image_url || "/placeholder.svg"}
                  alt="Feed image"
                  height={200}
                  width={200}
                  className="rounded-lg object-cover p-6"
                />
              )}
              {feed.video_url && <video src={feed.video_url} controls className="w-full rounded-lg mb-4 p-6" />}
              <hr className="border-t border-gray-600 mt-10" /> {/* Line after */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

