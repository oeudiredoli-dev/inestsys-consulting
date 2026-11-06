import { NextResponse } from "next/server";
import { ACTUAL_TECH_NEWS } from "@/lib/news-data";

export const revalidate = 1800; // Cache for 30 minutes

const RSS_FEEDS = [
  { url: "https://www.theverge.com/rss/index.xml", source: "The Verge", color: "#E05A47" },
  { url: "https://techcrunch.com/feed/", source: "TechCrunch", color: "#029E60" },
  { url: "https://www.wired.com/feed/rss", source: "Wired", color: "#000000" },
  { url: "https://feeds.arstechnica.com/arstechnica/index", source: "Ars Technica", color: "#FF4500" },
];

/** Extract simple tag content from XML string */
function getTagContent(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  if (!match) return "";
  return match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

/** Extract thumbnail or media url from XML item */
function extractImage(itemXml: string): string {
  const mediaMatch = itemXml.match(/url=["'](https?:\/\/[^"']+\.(jpg|jpeg|png|webp)[^"']*)["']/i);
  if (mediaMatch?.[1]) return mediaMatch[1];
  const imgMatch = itemXml.match(/<img[^>]+src=["'](https?:\/\/[^"']+)["']/i);
  if (imgMatch?.[1]) return imgMatch[1];
  return "";
}

export async function GET() {
  try {
    const fetchedArticles: any[] = [];

    // Attempt to fetch live feeds directly with a short timeout
    const results = await Promise.allSettled(
      RSS_FEEDS.map(async (feed) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000);
        const res = await fetch(feed.url, {
          signal: controller.signal,
          headers: { "User-Agent": "iNestSysNews/1.0" },
          next: { revalidate: 1800 },
        });
        clearTimeout(timeoutId);
        if (!res.ok) return [];
        const xml = await res.text();

        // Simple XML items extraction
        const items = xml.split(/<item[\s>]/i).slice(1);
        return items.slice(0, 4).map((raw, i) => {
          const title = getTagContent(raw, "title");
          const link = getTagContent(raw, "link") || raw.match(/<link>(https?:\/\/[^\s<]+)<\/link>/i)?.[1] || "";
          const pubDate = getTagContent(raw, "pubDate");
          const desc = getTagContent(raw, "description")
            .replace(/<[^>]+>/g, " ")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/\s+/g, " ")
            .trim();
          const image = extractImage(raw);

          const categories = ["AI & ML", "Cybersecurity", "Cloud & Infra", "Big Tech", "Hardware"];
          const category = categories[i % categories.length];

          return {
            id: `live-${feed.source.toLowerCase().replace(/\s+/g, "-")}-${i}`,
            source: feed.source,
            sourceBadgeColor: feed.color,
            category,
            title,
            excerpt: desc.slice(0, 160) + (desc.length > 160 ? "…" : ""),
            date: pubDate ? new Date(pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent",
            readTime: `${Math.max(3, Math.round(desc.split(" ").length / 30))} min read`,
            link: link || "https://techcrunch.com",
            thumbnail: image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
            accent: "linear-gradient(135deg, #0D1A1F 0%, #142028 60%, rgba(20,100,140,0.15) 100%)",
            featured: i === 0 && feed.source === "The Verge",
          };
        }).filter((item) => item.title && item.link);
      })
    );

    for (const r of results) {
      if (r.status === "fulfilled" && Array.isArray(r.value)) {
        fetchedArticles.push(...r.value);
      }
    }

    // Deduplicate items by title
    const seen = new Set<string>();
    const uniqueLive = fetchedArticles.filter((item) => {
      if (!item.title || seen.has(item.title)) return false;
      seen.add(item.title);
      return true;
    });

    // If live articles fetched successfully, combine with curated list, otherwise fallback to curated
    const finalArticles = uniqueLive.length >= 4 ? uniqueLive : ACTUAL_TECH_NEWS;

    return NextResponse.json({ articles: finalArticles });
  } catch (err) {
    console.error("RSS fetch failed, serving curated list", err);
    return NextResponse.json({ articles: ACTUAL_TECH_NEWS });
  }
}
