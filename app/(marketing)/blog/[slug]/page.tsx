import React from 'react';
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/sections/blog/BlogCard";
import { getPublishedPosts } from "@/lib/cms/content";
import { buildMetadata } from "@/lib/seo";
import { getContent } from "@/lib/cms/content";
import Section from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { MidSection, OutcomeSection, BackButton } from '@/components/sections/blog/BlogPostContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const [posts, site] = await Promise.all([getPublishedPosts(), getContent("site.settings")]);
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    site,
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.description,
    canonical: `/blog/${post.slug}`,
    ogImage: post.image || undefined,
    type: "article",
  });
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const blogPosts = await getPublishedPosts();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const latestInsights = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 6);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <BackButton />
      <section className="w-full relative">
        <div className="w-full h-[40vh] md:h-[65vh] relative overflow-hidden">
          {post.image && <Image src={post.image} fill priority sizes="100vw" className="object-cover" alt={post.title} />}
        </div>
      </section>

      <Section>
        <Container>
          <main className="w-full mx-auto relative z-10">
            <article>
              <header className="mb-16 md:mb-24">
                <h1 className="text-tab-h1 lg:text-desk-h1 font-pop font-semibold mb-4 capitalize">
                  {post.title}
                </h1>
                <p className="text-body-sm md:text-body font-pop font-regular text-content">
                  {post.description}
                </p>
              </header>

              <MidSection
                title={post.midSectionTitle}
                paragraph={post.paragraph}
                image={post.midSectionImage}
              />

              <OutcomeSection content={post.outcomeSections} />
            </article>

            <section>
              <h2 className="text-desk-section md:text-tab-h1 font-pop font-semibold capitalize mb-12 md:mb-16">
                Latest insights & innovations.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
                {latestInsights.map((insight) => (
                  <Link key={insight.slug} href={`/blog/${insight.slug}`}>
                    <BlogCard
                      title={insight.title}
                      category={insight.category}
                      description={insight.description}
                      image={insight.image}
                      date={insight.date}
                    />
                  </Link>
                ))}
              </div>
            </section>
          </main>
        </Container>
      </Section>
    </div>
  );
}
