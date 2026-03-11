import React from 'react';
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BlogCard from "@/components/sections/blog/BlogCard";
import { blogPosts } from "@/lib/blogData";
import Section from '@/components/layout/Section';
import { Container } from '@/components/layout/Container';
import { MidSection, OutcomeSection, BackButton } from '@/components/sections/blog/BlogPostContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const latestInsights = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 6);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      
      <BackButton />

      {/* --- HERO SECTION --- */}
      <section className="w-full relative">
        <div className="w-full h-[40vh] md:h-[65vh] relative overflow-hidden">
          <Image src={post.image} fill priority sizes="100vw" className="object-cover" alt={post.title} />
        </div>
      </section>

      <Section>
        <Container>
          <main className="w-full mx-auto relative z-10">
            <article className=" ">
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
                list={post.midSectionList} 
                image={post.midSectionImage} 
              />

              <OutcomeSection 
                description={post.outcomeDescription} 
                image={post.outcomeImage} 
              />
            </article>

            {/* --- LATEST INSIGHTS SECTION --- */}
            <section className="">
              <h2 className="text-desk-section md:text-tab-h1 font-pop font-semibold capitalize mb-12 md:mb-16">
                Latest insights & innovations.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
                {latestInsights.map((insight) => (
                  <Link key={insight.slug} href={`/blog/${insight.slug}`}>
                    <BlogCard
                      category={insight.category}
                      description={insight.description}
                      image={insight.image}
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