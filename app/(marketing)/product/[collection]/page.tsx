import { notFound } from "next/navigation"
import CollectionClient from "@/components/sections/product/CollectionClient"
import { getContent } from "@/lib/cms/content"
import { buildMetadata } from "@/lib/seo"

type PageProps = { params: Promise<{ collection: string }> }

async function findCollection(slug: string) {
  const { items } = await getContent("collections")
  return items.find((c) => c.slug === slug)
}

export async function generateMetadata({ params }: PageProps) {
  const { collection } = await params
  const [entry, site] = await Promise.all([findCollection(collection), getContent("site.settings")])
  if (!entry) return {}
  return buildMetadata({
    site,
    title: entry.heroTitle || entry.name,
    description: entry.description || undefined,
    canonical: `/product/${entry.slug}`,
    ogImage: entry.bannerImage || undefined,
  })
}

export default async function CollectionPage({ params }: PageProps) {
  const { collection } = await params
  const entry = await findCollection(collection)
  // Hidden under Admin → Product collections.
  if (entry && !entry.visible) notFound()

  return <CollectionClient collection={collection} bannerImage={entry?.bannerImage} />
}
