"use client";

import Image from "next/image";
import Link from "next/link";
import { Post } from "../lib/posts";

export default function BlogCard({ post }: { post: Post }) {
  const d = new Date(post.date);
  const fmt = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block relative right-8"
      aria-label={`Read post: ${post.title}`}
    >
      {/* Image */}
      <Image
        src={post.image}
        alt={post.title}
        width={600}
        height={360}
        className="w-full h-auto object-cover transition-transform group-hover:scale-[1.02] rounded-lg"
        priority={false}
      />

      {/* Date overlay - absolute so it sticks to image */}
      <div className="absolute bottom-21 left-15 text-medium text-[#454525]">
        {fmt}
      </div>
    </Link>
  );
}