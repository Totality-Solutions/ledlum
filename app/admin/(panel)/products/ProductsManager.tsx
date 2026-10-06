"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { PageHeader, Button } from "@/components/admin/ui";
import ProductDetailsForm, { EMPTY_PRODUCT, rowToEditable } from "./ProductDetailsForm";

type Product = {
  id: number;
  model: string;
  collection: string;
  category: string | null;
  group_name: string | null;
  hero_image: string | null;
  gallery_images: string[];
  website?: string | null;
};

export default function ProductsManager({ canDelete }: { canDelete: boolean }) {
  const [tab, setTab] = useState<"details" | "images">("details");
  const [creating, setCreating] = useState(false);
  const [details, setDetails] = useState<ReturnType<typeof rowToEditable> | null>(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [uploading, setUploading] = useState(false);
  const [busyUrl, setBusyUrl] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const runSearch = useCallback(async (q: string) => {
    setSearching(true);
    try {
      const res = await fetch(`/api/admin/products?search=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults(data.products || []);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => runSearch(search), 250);
    return () => clearTimeout(t);
  }, [search, runSearch]);

  // Full row (all spec columns) for the details tab.
  useEffect(() => {
    if (!selected) {
      setDetails(null);
      return;
    }
    let cancelled = false;
    setDetails(null);
    fetch(`/api/admin/products/${selected.id}`)
      .then((res) => res.json())
      .then((data) => !cancelled && data.product && setDetails(rowToEditable(data.product)))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [selected?.id]);

  const selectProduct = (p: Product | null) => {
    setCreating(false);
    setMessage(null);
    setSelected(p);
  };

  const handleUpload = async (files: FileList | null) => {
    if (!selected || !files || files.length === 0) return;
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append("files", f));

      const res = await fetch(`/api/admin/products/${selected.id}/images`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setSelected(data.product);
      setMessage(`Uploaded ${files.length} image(s).`);
    } catch (err: any) {
      setMessage(err.message || "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSetHero = async (url: string) => {
    if (!selected) return;
    setBusyUrl(url);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/products/${selected.id}/images`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ heroUrl: url }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to set hero image");
      setSelected(data.product);
    } catch (err: any) {
      setMessage(err.message || "Failed to set hero image");
    } finally {
      setBusyUrl(null);
    }
  };

  const handleRemove = async (url: string) => {
    if (!selected) return;
    if (!confirm("Remove this image from the product?")) return;
    setBusyUrl(url);
    setMessage(null);
    try {
      const res = await fetch(
        `/api/admin/products/${selected.id}/images?url=${encodeURIComponent(url)}`,
        { method: "DELETE" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to remove image");
      setSelected(data.product);
    } catch (err: any) {
      setMessage(err.message || "Failed to remove image");
    } finally {
      setBusyUrl(null);
    }
  };

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-[calc(100vh-56px)]">
        {/* Left: search + results */}
        <div className="border-r border-neutral-800 p-4 flex flex-col gap-3 md:h-[calc(100vh-56px)] md:overflow-y-auto">
          <Button onClick={() => { setSelected(null); setCreating(true); }}>+ New product</Button>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model..."
            className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 text-sm placeholder-neutral-500 focus:outline-none focus:border-neutral-500 md:sticky md:top-0 md:z-10"
          />
          {searching && <p className="text-xs text-neutral-500">Searching...</p>}
          <div className="flex flex-col gap-1">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => selectProduct(p)}
                className={`text-left px-3 py-2 rounded-md text-sm flex items-center gap-3 ${
                  selected?.id === p.id ? "bg-neutral-800" : "hover:bg-neutral-900"
                }`}
              >
                <div className="w-10 h-10 rounded bg-neutral-800 overflow-hidden shrink-0">
                  {p.hero_image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.hero_image} alt="" className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">
                    {p.model}
                    {p.website !== "W" && <span className="ml-2 text-[10px] text-amber-400">hidden</span>}
                  </div>
                  <div className="text-xs text-neutral-500">
                    {p.collection} · {p.gallery_images?.length || 0} image(s)
                  </div>
                </div>
              </button>
            ))}
            {!searching && results.length === 0 && (
              <p className="text-sm text-neutral-500 px-3 py-2">No products found.</p>
            )}
          </div>
        </div>

        {/* Right: selected product image manager */}
        <div className="p-6 md:sticky md:top-0 md:h-[calc(100vh-56px)] md:overflow-y-auto">
          {creating ? (
            <div className="max-w-3xl">
              <PageHeader title="New product" description="Create the product first, then add its images." />
              <ProductDetailsForm
                productId={null}
                initial={EMPTY_PRODUCT}
                canDelete={false}
                onSaved={(row) => {
                  setCreating(false);
                  setSelected(row);
                  setTab("images");
                  runSearch(search);
                }}
              />
            </div>
          ) : !selected ? (
            <p className="text-neutral-500">Select a product on the left, or create a new one.</p>
          ) : (
            <div className="flex flex-col gap-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-semibold">{selected.model}</h2>
                <p className="text-sm text-neutral-500">
                  {selected.collection} {selected.category ? `· ${selected.category}` : ""}
                </p>
              </div>

              <div className="flex gap-1 border-b border-neutral-800">
                {(["details", "images"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-4 py-2 text-sm capitalize -mb-px border-b-2 ${tab === t ? "border-white text-white" : "border-transparent text-neutral-400 hover:text-white"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {tab === "details" ? (
                details ? (
                  <ProductDetailsForm
                    productId={selected.id}
                    initial={details}
                    canDelete={canDelete}
                    onSaved={(row) => {
                      setSelected((prev) => (prev ? { ...prev, ...row } : row));
                      runSearch(search);
                    }}
                    onDeleted={() => {
                      setSelected(null);
                      runSearch(search);
                    }}
                  />
                ) : (
                  <p className="text-sm text-neutral-500">Loading…</p>
                )
              ) : (
              <>

              {message && <p className="text-sm text-amber-400">{message}</p>}

              <div>
                <label className="block text-sm text-neutral-400 mb-2">
                  Upload new images (first upload becomes the hero image if none is set)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={uploading}
                  onChange={(e) => handleUpload(e.target.files)}
                  className="text-sm"
                />
                {uploading && <p className="text-xs text-neutral-500 mt-2">Uploading...</p>}
              </div>

              <div>
                <h3 className="text-sm text-neutral-400 mb-2">
                  Gallery ({selected.gallery_images?.length || 0})
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {(selected.gallery_images || []).map((url) => {
                    const isHero = url === selected.hero_image;
                    const isBusy = busyUrl === url;
                    return (
                      <div key={url} className="relative group">
                        <div className="aspect-square rounded-md overflow-hidden bg-neutral-900 border border-neutral-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </div>
                        {isHero && (
                          <span className="absolute top-1 left-1 text-[10px] bg-white text-black px-1.5 py-0.5 rounded font-medium">
                            Hero
                          </span>
                        )}
                        <div className="absolute inset-x-0 bottom-0 flex justify-between gap-1 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!isHero && (
                            <button
                              disabled={isBusy}
                              onClick={() => handleSetHero(url)}
                              className="flex-1 text-[10px] bg-neutral-800/90 hover:bg-neutral-700 rounded px-1 py-1"
                            >
                              Set hero
                            </button>
                          )}
                          <button
                            disabled={isBusy}
                            onClick={() => handleRemove(url)}
                            className="text-[10px] bg-red-900/90 hover:bg-red-800 rounded px-1.5 py-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {(selected.gallery_images || []).length === 0 && (
                    <p className="text-sm text-neutral-600 col-span-full">No images yet.</p>
                  )}
                </div>
              </div>
              </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
