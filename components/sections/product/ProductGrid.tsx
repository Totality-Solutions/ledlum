"use client";
import { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import productImg1 from "@/public/images/home/product-1.png";

export default function ProductGrid({ filters }: any) {
  const [activeProduct, setActiveProduct] = useState<any>(null);

  // Expanded Mock Data - Removed "All" from properties to treat it as a wildcard logic
  const allProducts = useMemo(() => [
    // --- INDOOR COLLECTION ---
    { id: 1, title: "Apex Fixed COB", category: "INDOOR", group: "Led Cob Concealed", dimming: "Dali", image: productImg1 },
    { id: 2, title: "Iris Slim Panel", category: "INDOOR", group: "Led Smd Concealed", dimming: "Non - Dimming", image: productImg1 },
    { id: 3, title: "Zenith Deep Spot", category: "INDOOR", group: "Premium Series", dimming: "DP", image: productImg1 },
    { id: 4, title: "Vortex Adjustable", category: "INDOOR", group: "Led Cob Concealed", dimming: "Paste Cut - Out", image: productImg1 },
    
    // --- OUTDOOR COLLECTION ---
    { id: 5, title: "Terra Spike Light", category: "OUTDOOR", group: "Premium Series", dimming: "Non - Dimming", image: productImg1 },
    { id: 6, title: "Luna Wall Washer", category: "OUTDOOR", group: "Led Smd Concealed", dimming: "Dali", image: productImg1 },
    { id: 7, title: "Solaris Flood 50W", category: "OUTDOOR", group: "Led Smd Concealed", dimming: "Non - Dimming", image: productImg1 },

    // --- TRACKS/ MAGNETIC TRACKS ---
    { id: 8, title: "Mag-Linear 12W", category: "TRACKS/ MAGNETIC TRACKS", group: "Premium Series", dimming: "Dali", image: productImg1 },
    { id: 9, title: "Mag-Spot 10W", category: "TRACKS/ MAGNETIC TRACKS", group: "Premium Series", dimming: "Non - Dimming", image: productImg1 },
    { id: 10, title: "Track-Zoom 15W", category: "TRACKS/ MAGNETIC TRACKS", group: "Led Cob Concealed", dimming: "DP", image: productImg1 },

    // --- SENSORS ---
    { id: 11, title: "PIR Motion Ceiling", category: "SENSORS", group: "Led Smd Concealed", dimming: "Non - Dimming", image: productImg1 },
    { id: 12, title: "Daylight Harvest", category: "SENSORS", group: "Premium Series", dimming: "Dali", image: productImg1 },
  ], []);

  // Filter Logic: "All" acts as a wildcard
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      // If filter is "All", match is true. Else, match must be exact.
      const matchCategory = filters.category === "All" || p.category === filters.category;
      const matchGroup = filters.group === "All" || p.group === filters.group;
      const matchDimming = filters.dimming === "All" || p.dimming === filters.dimming;
      
      return matchCategory && matchGroup && matchDimming;
    });
  }, [filters, allProducts]);

  return (
    <div className="relative z-0">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id}
              title={product.title}
              category={product.group}
              image={product.image}
              onClick={() => setActiveProduct(product)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-white/40 text-center py-32 border border-white/5 rounded-[30px] uppercase text-xs tracking-[0.2em]">
          No products match these specific filters
        </div>
      )}

      <ProductModal 
        product={activeProduct} 
        onClose={() => setActiveProduct(null)} 
      />
    </div>
  );
}