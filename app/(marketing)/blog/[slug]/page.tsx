


// import React from 'react';
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import BlogCard from "@/components/sections/blog/BlogCard";
// import { blogPosts } from "@/lib/blogData";
// import Section from '@/components/layout/Section';
// import { Container } from '@/components/layout/Container';

// interface PageProps {
//   params: Promise<{ slug: string }>;
// }

// export default async function BlogPost({ params }: PageProps) {
//   const { slug } = await params;
//   const post = blogPosts.find((p) => p.slug === slug);

//   if (!post) {
//     notFound();
//   }

//   // Get 6 suggestions, excluding the current post
//   const latestInsights = blogPosts
//     .filter((p) => p.slug !== slug)
//     .slice(0, 6);

//   return (
//     <div className="relative min-h-screen text-white  selection:bg-[#AD9463] selection:text-black font-bai overflow-x-hidden">

//       {/* 1. GLOBAL BACKGROUND LAYER - Optimized */}
//       {/* <div className="absolute inset-0 z-0 pointer-events-none w-screen left-1/2 -translate-x-1/2 opacity-10 md:opacity-30">
//         <Image
//           src="/images/about/ledlumline.png"
//           alt="background texture"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div> */}

//       {/* --- BACK BUTTON --- */}
//       {/* Reduced z-index to z-30 so it sits under the Header (usually z-50) and Hamburger menu */}
//       <div className="absolute top-[20px] md:top-[130px] min-w-[140px] left-1 md:left-12 lg:left-16 z-30 pointer-events-none font-pop">
//         <Link
//           href="/blog"
//           className="pointer-events-auto group flex items-center gap-3 px-2 py-2 rounded-full border border-white/10 bg-[#111111]/30 backdrop-blur-md transition-all duration-500 "
//         >
//           <div className="w-10 h-10 rounded-full bg-black  flex items-center justify-center transition-colors">
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//               <path d="M19 12H5M12 19l-7-7 7-7" />
//             </svg>
//           </div>
//           <span className="text-body text-black font-pop font-medium pl-2">Back</span>
//         </Link>
//       </div>

//       {/* --- HERO SECTION --- */}
//       <section className="w-full pt-[80px] md:pt-[90px] relative">
//         <div className="w-full h-[40vh] md:h-[65vh] relative overflow-hidden">
//           <Image
//             src={post.image}
//             fill
//             priority
//             sizes="100vw"
//             className="object-cover"
//             alt={post.title}
//           />
//         </div>
//       </section>

//     <Section>
//       <Container>
//       <main className="w-full mx-auto relative z-10">
//         <article className="pt-4 md:pt-32">

//           <header className=" mb-16 md:mb-24">
//             <h1 className="text-tab-h1 lg:text-desk-h1 font-pop font-semibold mb-2 md:mb-12 capitalize">
//               {post.title}
//             </h1>
//             <p className="text-body-sm md:text-body font-pop font-regular text-content ">
//               {post.description}
//             </p>
//           </header>

        

//           {/* --- DYNAMIC MIDDLE SECTION --- */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center mb-24 md:mb-40">
//             <div className="space-y-8 md:space-y-10">
//               <h3 className="font-pop text-body-md md:text-desk-section capitalize">
//                 {post.midSectionTitle}
//               </h3>
//               <ul className="space-y-4 md:space-y-5">
//                 {post.midSectionList.map((item, i) => (
//                   <li key={i} className="flex items-start gap-4">
//                     <span className="w-1.5 h-1.5 rounded-full bg-white mt-2 shrink-0" />
//                     <span className="text-body-sm font-pop font-regular text-content">{item}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl rounded-sm">
//               <Image
//                 src={post.midSectionImage}
//                 fill
//                 sizes="(max-width: 1024px) 100vw, 50vw"
//                 className="object-cover"
//                 alt="Detail View"
//               />
//             </div>
//           </div>

//           {/* --- DYNAMIC OUTCOME SECTION --- */}
//           <div className="space-y-12 md:space-y-16 pb-16 ">
//             <div className="space-y-6">
//               <h5 className="text-body-xs text-content font-pop capitalize font-regular">The Outcome</h5>
//               <p className="text-body-md md:text-desk-section text-content font-pop capitalize font-regular">
//                 {post.outcomeDescription}
//               </p>
//             </div>
//             <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-zinc-900  rounded-sm">
//               <Image
//                 src={post.outcomeImage}
//                 fill
//                 sizes="100vw"
//                 className="object-cover"
//                 alt="Project Result"
//               />
//             </div>
//           </div>
//         </article>

//         {/* --- LATEST INSIGHTS SECTION --- */}
//         <section className="pt-16">
//           <h2 className="text-desk-section md:text-tab-h1 font-pop font-semibold capitalize mb-12 md:mb-16">
//             Latest insights & innovations.
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16 md:gap-y-20">
//             {latestInsights.map((insight) => (
//               <Link key={insight.slug} href={`/blog/${insight.slug}`}>
//                 <BlogCard
//                   category={insight.category}
//                   description={insight.description}
//                   image={insight.image}
//                 />
//               </Link>
//             ))}
//           </div>
//         </section>
//       </main>
//       </Container>
//     </Section>
//     </div>
//   );
// }




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
    <div className="relative min-h-screen text-white selection:bg-[#AD9463] selection:text-black font-bai overflow-x-hidden">
      
      <BackButton />

      {/* --- HERO SECTION --- */}
      <section className="w-full pt-[80px] md:pt-[90px] relative">
        <div className="w-full h-[40vh] md:h-[65vh] relative overflow-hidden">
          <Image src={post.image} fill priority sizes="100vw" className="object-cover" alt={post.title} />
        </div>
      </section>

      <Section>
        <Container>
          <main className="w-full mx-auto relative z-10">
            <article className="pt-4 md:pt-32">
              <header className="mb-16 md:mb-24">
                <h1 className="text-tab-h1 lg:text-desk-h1 font-pop font-semibold mb-2 md:mb-12 capitalize">
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
            <section className="pt-16">
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