"use client";

import { emptyBlock, type ArticleBlock, type ArticleBlockType } from "@/lib/cms/posts";
import { Button, MediaInput, MoveButtons, inputClass, swap } from "./ui";

const BLOCK_LABELS: Record<ArticleBlockType, string> = {
  text: "Text",
  heading: "Heading",
  image: "Image",
  link: "Link",
};

// Editor for a blog post's article body: an ordered list of text, heading,
// image and link blocks.
export default function ArticleBlocksEditor({
  value,
  onChange,
}: {
  value: ArticleBlock[];
  onChange: (blocks: ArticleBlock[]) => void;
}) {
  const update = (i: number, patch: Partial<ArticleBlock>) =>
    onChange(value.map((b, j) => (j === i ? ({ ...b, ...patch } as ArticleBlock) : b)));

  const addButtons = (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(BLOCK_LABELS) as ArticleBlockType[]).map((type) => (
        <Button key={type} type="button" variant="secondary" onClick={() => onChange([...value, emptyBlock(type)])}>
          + {BLOCK_LABELS[type]}
        </Button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {value.length === 0 && <p className="text-sm text-neutral-500">No blocks yet — add one below.</p>}

      {value.map((block, i) => (
        <div key={i} className="border border-neutral-800 rounded-lg p-3 flex flex-col gap-3 bg-neutral-950/60">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] uppercase tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-neutral-800">
              {BLOCK_LABELS[block.type]}
            </span>
            <MoveButtons
              onUp={i > 0 ? () => onChange(swap(value, i, i - 1)) : undefined}
              onDown={i < value.length - 1 ? () => onChange(swap(value, i, i + 1)) : undefined}
              onRemove={() => onChange(value.filter((_, j) => j !== i))}
            />
          </div>

          {block.type === "text" && (
            <>
              <input
                placeholder="Heading (optional)"
                value={block.heading}
                onChange={(e) => update(i, { heading: e.target.value })}
                className={inputClass}
              />
              <textarea
                rows={6}
                placeholder="Text — leave a blank line between paragraphs"
                value={block.text}
                onChange={(e) => update(i, { text: e.target.value })}
                className={inputClass}
              />
            </>
          )}

          {block.type === "heading" && (
            <input
              placeholder="Heading text"
              value={block.text}
              onChange={(e) => update(i, { text: e.target.value })}
              className={`${inputClass} text-base font-semibold`}
            />
          )}

          {block.type === "image" && (
            <>
              <MediaInput kind="image" value={block.image} onChange={(url) => update(i, { image: url })} />
              <input
                placeholder="Caption (optional — also used as the image's alt text)"
                value={block.caption}
                onChange={(e) => update(i, { caption: e.target.value })}
                className={inputClass}
              />
            </>
          )}

          {block.type === "link" && (
            <div className="grid sm:grid-cols-2 gap-2">
              <input
                placeholder="Button text (e.g. Explore Indoor Collection)"
                value={block.label}
                onChange={(e) => update(i, { label: e.target.value })}
                className={inputClass}
              />
              <input
                placeholder="Link — /product/indoor or https://…"
                value={block.url}
                onChange={(e) => update(i, { url: e.target.value })}
                className={inputClass}
              />
            </div>
          )}
        </div>
      ))}

      {addButtons}
      <p className="text-xs text-neutral-500">Empty blocks are skipped when you save.</p>
    </div>
  );
}
