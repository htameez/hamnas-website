import "../../globals.css";
import Image from "next/image";
import { notFound } from "next/navigation";
import { posts } from "../../lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? post.title : "Blog",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const d = new Date(post.date);
  const fmt = d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/blog-background.png')", color: "#454525" }}
    >
      {/* decorative images positioned relative to the page */}
      <Image
        src="/images/fairy3.png"
        alt="Fairy"
        width={400}
        height={100}
        className="absolute left-0 top-0"
        priority={false}
      />
      <Image
        src="/images/heart.png"
        alt="Heart"
        width={300}
        height={100}
        className="absolute right-0 bottom-[50px]"
        priority={false}
      />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <article>
          <header className="mb-6">
            <h1 className="text-3xl font-bold font-[BirkaSemiBold]">{post.title}</h1>
            <p className="text-sm text-neutral-500 font-[DidotBoldItalic]">{fmt}</p>
          </header>

          {/* Blog content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none font-[DidotBoldItalic] leading-loose">
            <p>
              Hi! My name is Hamna. Welcome to my little world! This is the first of many blog
              posts, and I&apos;m excited to keep you updated on my life and the things I&apos;ve
              learned! I started my Fall semester classes about a month ago, and things have been
              going pretty well! This semester, I&apos;m taking Cloud Computing, Artificial
              Intelligence, Algorithm Engineering, Stats for Engineers, Philosophy, and Real Estate.
              This past weekend, I went to a networking event and served with Engage Dallas at
              Legacy Cares. Legacy Cares provides affordable and quality holistic care for people
              affected by HIV and AIDS. I am grateful to have helped them out with setting up their
              annual Angel Dinner.
            </p>

            <p>Well, I&apos;ll see you in the next blog post!</p>

            <p>H.T.</p>
          </div>
        </article>
      </div>
    </main>
  );
}