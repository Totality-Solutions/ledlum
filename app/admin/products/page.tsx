"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  model: string;
  collection: string;
  category: string | null;
  group_name: string | null;
  hero_image: string | null;
  gallery_images: string[];
};

export default function AdminProductsPage() {
  const router = useRouter();
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

  const refreshSelected = async (id: number) => {
    const res = await fetch(`/api/admin/products/${id}/images`);
    const data = await res.json();
    if (res.ok) setSelected(data.product);
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

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
        <h1 className="text-lg font-semibold">Product Image Manager</h1>
        <button onClick={handleLogout} className="text-sm text-neutral-400 hover:text-white">
          Log out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] min-h-[calc(100vh-57px)]">
        {/* Left: search + results */}
        <div className="border-r border-neutral-800 p-4 flex flex-col gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by model..."
            className="w-full px-3 py-2 rounded-md bg-neutral-900 border border-neutral-700 text-sm placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
          />
          {searching && <p className="text-xs text-neutral-500">Searching...</p>}
          <div className="flex flex-col gap-1 overflow-y-auto">
            {results.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
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
                  <div className="truncate font-medium">{p.model}</div>
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
        <div className="p-6">
          {!selected ? (
            <p className="text-neutral-500">Select a product on the left to manage its images.</p>
          ) : (
            <div className="flex flex-col gap-6 max-w-3xl">
              <div>
                <h2 className="text-xl font-semibold">{selected.model}</h2>
                <p className="text-sm text-neutral-500">
                  {selected.collection} {selected.category ? `· ${selected.category}` : ""}
                </p>
              </div>

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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
