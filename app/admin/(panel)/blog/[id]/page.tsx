"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { EMPTY_POST, slugify, type PostInput } from "@/lib/cms/posts";
import { CMS_DEFAULTS } from "@/lib/cms/defaults";
import {
  Button,
  Card,
  Label,
  MediaInput,
  MoveButtons,
  Notice,
  PageHeader,
  StringListInput,
  inputClass,
  swap,
} from "@/components/admin/ui";

export default function AdminPostEditor({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const isNew = id === "new";
  const router = useRouter();

  const [post, setPost] = useState<PostInput | null>(isNew ? EMPTY_POST : null);
  const [saved, setSaved] = useState(isNew ? "" : null as string | null);
  const [slugTouched, setSlugTouched] = useState(!isNew);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [categories, setCategories] = useState<string[]>(CMS_DEFAULTS["blog.page"].categories);

  useEffect(() => {
    fetch("/api/admin/content/blog.page")
      .then((r) => r.json())
      .then((d) => Array.isArray(d.data?.categories) && setCategories(d.data.categories))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (isNew) return;
    fetch(`/api/admin/posts/${id}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        const p = data.post;
        const loaded: PostInput = {
          slug: p.slug,
          title: p.title,
          category: p.category || "",
          description: p.description || "",
          image: p.image || "",
          mid_section_title: p.mid_section_title || "",
          paragraphs: p.paragraphs?.length ? p.paragraphs : [""],
          mid_section_image: p.mid_section_image || "",
          outcome_sections: (p.outcome_sections || []).map((s: any) => ({ heading: s.heading || "", text: s.text || "" })),
          date: p.date,
          is_featured: p.is_featured,
          status: p.status,
          seo_title: p.seo_title || "",
          seo_description: p.seo_description || "",
        };
        setPost(loaded);
        setSaved(JSON.stringify(loaded));
      })
      .catch((err) => setMessage({ tone: "error", text: err.message }));
  }, [id, isNew]);

  if (!post) {
    return <div className="p-8">{message ? <Notice tone="error">{message.text}</Notice> : <p className="text-sm text-neutral-500">Loading…</p>}</div>;
  }

  const dirty = JSON.stringify(post) !== saved;
  const set = <K extends keyof PostInput>(key: K, value: PostInput[K]) => setPost((p) => (p ? { ...p, [key]: value } : p));

  const save = async (status?: PostInput["status"]) => {
    const body = { ...post, status: status ?? post.status };
    setBusy(true);
    setMessage(null);
    try {
      const res = await fetch(isNew ? "/api/admin/posts" : `/api/admin/posts/${id}`, {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      if (isNew) {
        router.replace(`/admin/blog/${data.post.id}`);
        return;
      }
      const next = { ...body, slug: data.post.slug };
      setPost(next);
      setSaved(JSON.stringify(next));
      setMessage({
        tone: "success",
        text: next.status === "published" ? "Saved and live on the website." : "Saved as draft (not visible on the website).",
      });
    } catch (err: any) {
      setMessage({ tone: "error", text: err.message });
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${post.title}" permanently?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/blog");
    } else {
      const data = await res.json().catch(() => ({}));
      setMessage({ tone: "error", text: data.error || "Delete failed" });
      setBusy(false);
    }
  };

  const sections = post.outcome_sections;

  return (
    <div className="p-4 md:p-8 max-w-4xl" data-dirty={dirty ? "true" : undefined}>
      <Link href="/admin/blog" className="text-sm text-neutral-400 hover:text-white">← All posts</Link>
      <PageHeader
        title={isNew ? "New post" : post.title || "Untitled"}
        description={
          post.status === "published"
            ? "Published — visible on the website."
            : "Draft — only visible in the admin."
        }
        actions={
          <>
            {!isNew && post.status === "published" && (
              <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                <Button variant="secondary" type="button">View ↗</Button>
              </a>
            )}
            {post.status === "published" ? (
              <>
                <Button variant="secondary" disabled={busy} onClick={() => save("draft")}>Unpublish</Button>
                <Button disabled={busy || !dirty} onClick={() => save()}>{busy ? "Saving…" : "Save"}</Button>
              </>
            ) : (
              <>
                <Button variant="secondary" disabled={busy || (!dirty && !isNew)} onClick={() => save("draft")}>Save draft</Button>
                <Button disabled={busy} onClick={() => save("published")}>{busy ? "Saving…" : "Publish"}</Button>
              </>
            )}
          </>
        }
      />

      {message && <div className="mb-4"><Notice tone={message.tone}>{message.text}</Notice></div>}

      <div className="flex flex-col gap-6">
        <Card className="p-5 flex flex-col gap-5">
          <div>
            <Label>Title</Label>
            <input
              value={post.title}
              onChange={(e) => {
                const title = e.target.value;
                setPost((p) => (p ? { ...p, title, slug: slugTouched ? p.slug : slugify(title) } : p));
              }}
              className={inputClass}
            />
          </div>
          <div>
            <Label help="The post's web address: /blog/your-slug. Changing it breaks old links.">URL slug</Label>
            <input
              value={post.slug}
              onChange={(e) => {
                setSlugTouched(true);
                set("slug", e.target.value);
              }}
              onBlur={() => set("slug", slugify(post.slug))}
              className={inputClass}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Category</Label>
              <select value={post.category} onChange={(e) => set("category", e.target.value)} className={inputClass}>
                <option value="">—</option>
                {[...new Set([...categories, post.category].filter(Boolean))].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>Date</Label>
              <input type="date" value={post.date} onChange={(e) => set("date", e.target.value)} className={inputClass} />
            </div>
          </div>
          <label className="flex items-center gap-2 text-sm text-neutral-300 cursor-pointer">
            <input type="checkbox" checked={post.is_featured} onChange={(e) => set("is_featured", e.target.checked)} className="w-4 h-4 accent-white" />
            Featured post
          </label>
          <div>
            <Label help="Shown on blog cards and at the top of the article.">Short description</Label>
            <textarea rows={3} value={post.description} onChange={(e) => set("description", e.target.value)} className={inputClass} />
          </div>
          <div>
            <Label>Cover image</Label>
            <MediaInput kind="image" value={post.image} onChange={(v) => set("image", v)} />
          </div>
        </Card>

        <Card className="p-5 flex flex-col gap-5">
          <h2 className="font-semibold">Introduction</h2>
          <div>
            <Label>Intro heading</Label>
            <input value={post.mid_section_title} onChange={(e) => set("mid_section_title", e.target.value)} className={inputClass} />
          </div>
          <div>
            <Label>Intro paragraphs</Label>
            <StringListInput multiline itemLabel="Paragraph" value={post.paragraphs} onChange={(v) => set("paragraphs", v)} />
          </div>
          <div>
            <Label>Intro image</Label>
            <MediaInput kind="image" value={post.mid_section_image} onChange={(v) => set("mid_section_image", v)} />
          </div>
        </Card>

        <Card className="p-5 flex flex-col gap-4">
          <h2 className="font-semibold">Article sections</h2>
          {sections.map((s, i) => (
            <div key={i} className="border border-neutral-800 rounded-lg p-3 flex flex-col gap-3">
              <div className="flex gap-2">
                <input
                  placeholder="Heading (optional)"
                  value={s.heading}
                  onChange={(e) => set("outcome_sections", sections.map((x, j) => (j === i ? { ...x, heading: e.target.value } : x)))}
                  className={inputClass}
                />
                <MoveButtons
                  onUp={i > 0 ? () => set("outcome_sections", swap(sections, i, i - 1)) : undefined}
                  onDown={i < sections.length - 1 ? () => set("outcome_sections", swap(sections, i, i + 1)) : undefined}
                  onRemove={() => set("outcome_sections", sections.filter((_, j) => j !== i))}
                />
              </div>
              <textarea
                rows={6}
                placeholder="Text"
                value={s.text}
                onChange={(e) => set("outcome_sections", sections.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                className={inputClass}
              />
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            className="self-start"
            onClick={() => set("outcome_sections", [...sections, { heading: "", text: "" }])}
          >
            + Add section
          </Button>
        </Card>

        <Card className="p-5 flex flex-col gap-5">
          <h2 className="font-semibold">SEO</h2>
          <div>
            <Label help="Leave empty to use the post title.">SEO title</Label>
            <input value={post.seo_title} onChange={(e) => set("seo_title", e.target.value)} className={inputClass} />
          </div>
          <div>
            <Label help="Leave empty to use the short description.">SEO description</Label>
            <textarea rows={3} value={post.seo_description} onChange={(e) => set("seo_description", e.target.value)} className={inputClass} />
          </div>
        </Card>

        {!isNew && (
          <div className="flex justify-end">
            <Button variant="danger" onClick={remove} disabled={busy}>Delete post</Button>
          </div>
        )}
      </div>
    </div>
  );
}
