import "../globals.css";
import BlogCard from "../components/BlogCard";
import { posts } from "../lib/posts";
import Link from "next/link";

export const metadata = {
  title: "Blog",
};

export default function BlogIndexPage() {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundColor: '#b6b992', color: '#454525'}}
    >
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 flex items-end justify-between">
          <h1 className="text-3xl font-bold font-[BirkaSemiBold]">BLOG</h1>
          <Link
            href="/"
            className="font-[DidotBoldItalic] text-sm underline underline-offset-4 hover:opacity-80"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="font-[DidotBoldItalic] grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </main>
  );
}