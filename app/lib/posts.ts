// app/lib/posts.ts
export type Post = {
    slug: string;
    title: string;
    date: string;          // ISO string: "2025-09-28"
    image: string;         // e.g. "/images/blog/post-1.png"
    excerpt?: string;
  };
  
  export const posts: Post[] = [
    {
      slug: "hello-fairy-world",
      title: "Hello Fairy World",
      date: "2025-09-29",
      image: "/images/blog-entry-header-1.png",
      excerpt: "A quick hello and what this blog will cover."
    },
    // add more posts above this comment as you publish
  ].sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first  