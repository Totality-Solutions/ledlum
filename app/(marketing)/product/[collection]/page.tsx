"use client"

import { useParams } from "next/navigation"
import { useState, useMemo } from "react"

import Hero from "@/components/sections/product/Hero"
import ProductFilters from "@/components/sections/product/ProductFilters"
import ProductGrid from "@/components/sections/product/ProductGrid"

import { PRODUCT_DATABASE } from "@/content/data/products"

export default function CollectionPage() {

  const params = useParams()
  const collection = params.collection as string

  const [filters, setFilters] = useState({
    collection: "All",
    group: "All",
    dimming: "All"
  })

// Inside CollectionPage component
const products = useMemo(() => {
  const seenSeries = new Set();
  const uniqueProducts: any[] = [];

  Object.entries(PRODUCT_DATABASE).forEach(([id, product]: [string, any]) => {
    if (product.collection === collection) {
      if (!seenSeries.has(product.series)) {
        seenSeries.add(product.series);

        uniqueProducts.push({
          id,
          title: product.hero.name,
          image: product.hero.image,

          // ✅ ADD THIS
          heroBannerImage: product.bannerImage,

          collection: product.collection,
          category: product.category,
          group: product.group,
          dimming: product.dimming,
          series: product.series,
        });
      }
    }
  });

  return uniqueProducts;
}, [collection]);

const COLLECTION_HERO_DATA = {
  indoor: {
    name: "Indoor Collection",
    image: "/images/home/product/Indoor.jpeg",
    description: "The Indoor Series focuses on refined illumination for interiors—delivering ambient, task, and accent lighting that blends seamlessly into modern architectural spaces.",
  },
  outdoor: {
    name: "Outdoor Collection",
    image: "/images/home/product/Outdoor.jpeg",
    description: "Designed to enhance exteriors, the Outdoor Series combines durability with design—offering weather-resistant lighting solutions that elevate facades, landscapes, and open spaces with precision illumination.",
  },
  artizan: {
    name: "Artizan Collection",
    image: "/images/home/product/Artizan.jpeg",
    description: "Artizan represents bespoke, design-led lighting—where craftsmanship meets technology to create statement fixtures that enhance aesthetic storytelling.",
  },
  astara: {
    name: "Astara Collection",
    image: "/images/home/product/Astara.jpeg",
    description: "Astara is LEDLUM’s precision-driven lighting range, built around sleek linear systems and high-performance fixtures for clean, contemporary visual experiences",
  },
  klewe: {
    name: "Klewe Collection",
    image: "/images/home/product/Klewe.jpeg",
    description: "Klewe focuses on sustainability—delivering solar-powered and energy-efficient lighting solutions that reduce consumption while maintaining high performance.",
  },
  volaris: {
    name: "Volaris Collection",
    image: "/images/home/product/Volaris.jpeg",
    description: "Volaris blends air movement with design offering premium fans that function as both performance driven appliances and elegant interior elements.",
  },
}; 

console.log("products", collection)
const heroData = COLLECTION_HERO_DATA[collection as keyof typeof COLLECTION_HERO_DATA];

  return (
    <main className="relative bg-transparent min-h-screen">

      <Hero 
        heroBannerImage={heroData?.image}
      />

      <div className="mx-auto px-6 lg:px-12 pt-12">

        {/* <ProductFilters
          filters={filters}
          setFilters={setFilters}
          products={products}
          collection={collection}
        /> */}
          <p className="text-white font-bold text-4xl capitalize"><span className="text-logo font-bold text-4xl uppercase">{collection}</span> Series</p>
          <p className="text-white font-normal pt-3 text-xl">{heroData?.description}</p>

      </div>

      <div className="relative mx-auto px-6 lg:px-12 py-12">

        {/* <ProductGrid
          filters={filters}
          products={products}
          collection={collection}
        /> */}

<CollectionGrid collection={collection} />

      </div>



    </main>
  )
}

function CollectionGrid({ collection }: { collection: string }) {

  const data = {
    "artizan":{
    "1":"MICRO SPOT",
    "2":"EYEBALL / ANTI GLARE & ANTI GLARE TILTABLE SERIES",
    "3":"LINEAR LIGHT SERIES",
    "4":"LINEAR SERIES (TRIMLESS)",
    "5":"LINEAR PIN HOLE SERIES",
    "6":"ANTI GLARE TILTABLE DOWNWARD SERVICEABLE",
    "7":"RECESS LOW GLARE FIXED SERIES",
    "8":"LINEAR WALLWASHER SERIES",
    "9":"MICRO SPOT LIGHT SERIES",
    "10":"MICRO SPOT LIGHT SERIES LOW VOLTAGE (12V)",
    "11":"10MM MAGNETIC SERIES",
    "12":"MAGNETIC LINEAR SERIES",
    "13":"MAGNETIC SPOT / WALL WASHER / PENDANT SERIES",
    "14":"CIRCULAR MAGNETIC POWER TRACK SERIES",
    "15":"5MM 24V MINI MAGNETIC TRACK IN SURFACE AND CONCEALED LIGHT",
    "16":"3-IN-1 VALUE MAGNETIC TRACK SERIES",
    "17":"SOFT TRACK LIGHTING SYSTEM",
    "18":"GOLD MAGNETIC TRACK LIGHT SYSTEM",
    "19":"DISPLAY LIGHTS",
    "20":"LENS FLEXIBLE STRIP LIGHT"
},
"astara":{
    "1":"PROFILE WITH STRIP LIGHT",
    "2":"PREMIUM SERIES COB",
    "3":"RECSSED DIFFUSED DOWNLIGHTS (SMD)",
    "4":"RECESSED DIFFUSED DOWNLIGHTS (SMD)",
    "5":"RECESSED COB FIXTURES",
    "6":"RECESSED COB FIXTURES – 3W",
    "7":"RECESSED IP44/IP54/IP65 FIXTURES (COB)",
    "8":"RECESSED COB FIXTURES",
    "9":"RECSSED MATRIX FIXTURE",	
    "10":"TRACK FIXTURES",			
    "11":"TRACK FIXTURES", 
    "12":"SURFACE DIFFUSED FIXTURES (SMD)",
    "13":"RETAIL LIGHTING", 
    "14":"SURFACE COB FIXTURES",
    "15":"FLOOD LIGHT",
    "16":"SURFACE DIFFUSED FIXTURES (SMD)",
    "17":"STREET LIGHT",
    "18":"IP54 SURFACE FIXTURES – COB",
    "19":"SURFACE COB FIXTURE"
},

"indoor":{
    "1":"Led Cob Concealed Down Light Fixtures Special Series",
    "2":"Led Ip54,Ip65 Concealed Down Light Fixture",
    "3":"Led Smd Concealed Down Light Fixtures, Panels",
    "4":"Led Smd Concealed Down Light Fixtures, Special Series",
    "5":"Premium Series",
    "6":"Project And Retail Lights",
    "7":"Slim Magnetic Track,Fixtures,Accessories",
    "8":"Motion Sensors",
    "9":"Led Modules + Modular Down Lighters",
    "10":"Mr16 Module Down Lighters",
    "11":"Led Cob Surface Fixture",
    "12":"Led Smd Slim Surface Panel",
    "13":"Led Surface Panel",
    "14":"Led Indoor Wall Light",
    "15":"Led Gu10 And Mr16 Lamps",
    "16":"Led Lamps Filament",
    "17":"Led Linear Mirror Lights",
    "18":"Led Linear Mirror Lights - Tiltable",
    "19":"Led Linear Tube Lights",
    "20":"Led Linear Tube Lights High Wattages",
    "21":"24V Neon Strip Light - Ip 67",
    "22":"220V-Led Strip Lights-Ip 67",
    "23":"Led Strip Lights-12V(New Improved)",
    "24":"Led Strip Lights-24V",
    "25":"Led Strip Light Plus Series",
    "26":"Aluminium Empty Profiles",
    "27":"Led Strip Light Driver",
    "28":"Led Lum Luxe",
    "29":"Top Loading Flexible Track - Suspended,48V Up,Down Lighter",
    "30":"Flexible Track Accessories Top Loading 48V",
    "31":"Vision Series (Wireless Automation Drivers And Accessories)",
    "32":"LED COB CONCEALED DOWN LIGHT FIXTURES",
    "33":"Led Strip Light Driver",
    "34":"Led Lum Luxe",
    "35":"Top Loading Flexible Track - Suspended,48V Up,Down Lighter",
    "36":"Flexible Track Accessories Top Loading 48V",
    "37":"Vision Series (Wireless Automation Drivers And Accessories)",
    "38":"LED COB CONCEALED DOWN LIGHT FIXTURES"
},

"outdoor":{
    "1":"High Power Led Outdoor Wall Light Fixtures",
    "2":"Led Outdoor Surface Light Fixtures",
    "3":"Led Outdoor 220V Ac Wall Light Fixtures",
    "4":"Led Underground Light Fixtures",
    "5":"Led Outdoor White/Black Body Wall Light Fixtures (Pattern)",
    "6":"Led Outdoor Concealed Surface Step Light Fixtures",
    "7":"Led Garden Light Fixtures With Spike",
"8":"Led Outdoor Wall Lights",
"9":"Llo-24V Outdoor Series",
"10":"Led Outdoor Wall Lights Wooden Series",
"11":"Led Outdoor Wooden Series - Bollards",
"12":"E-27 Bollards",
"13":"Led Bollards",
"14":"Outdoor Underwater Lights - 24V",
"15":"Outdoor Wall Lights - Gu10 | E27",
"16":"Led Outdoor Stick Series Effect Lighting - Spikes - 24V",
"17":"Outdoor Linear Washers - Ip68",
"18":"Hand Rail Lights",
"19":"Pole Light Fixtures",
"20":"Led Foot Light Outdoor-Indoor",
"21":"Ledlum Linear Surface / Underground Lights",
"22":"Led Outdoor Lights - Economy Series",
"23":"LED GARDEN LIGHT FIXTURES WITH SPIKE / BASE - IP68 CONNECTOR FREE"
},

"volaris":{
    "1":"Ceiling Fans [DOWNROD]",
    "2":"Ceiling Fans [HUGGER]",
    "3":"Decorative Fan",
    "4":"Tower Fan",
    "5":"Bladeless Fans",
    "6":"Pedestials",
    "7":"Tripods",
    "8":"Wall Fans",
    "9":"Table Fans",
    "10":"Floor Fans",
    "11":"Exhaust Fans"
    
},
"klewe":{
    "1":"Radio Ground",
    "2":"Radio Mega",
    "3":"Radio Mini",
    "4":"Radio Maxi",
    "5":"Radio Moon Mini",
    "6":"Radio Moon Maxi",
    "7":"Milio Side",
    "8":"Milio Full",
    "9":"Ala Wall",
    "10":"Ala Mini",
    "11":"Ala Maxi",
    "12":"Axis Mini",
    "13":"Axis Maxi",
    "14":"Heliostepper",
    "15":"Scotty",
    "16":"Keope Wall",
    "17":"Keope Ground",
    "18":"Planet B",
    "19":"Link",
    "20":"Sundress",
    "21":"Alea",
    "22":"Swing",
    "23":"Ecostep"
}}

  const items = data[collection as keyof typeof data] ? Object.values(data[collection as keyof typeof data]) : [];

  console.log("products", collection);

  return (
    <div className="grid text-white grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((text, index) => (
        <div
          key={index}
          className="p-4 border border-white/20 rounded-lg shadow-sm hover:shadow-md transition"
        >
          <p className="text-sm font-medium">{text}</p>
        </div>
      ))}
    </div>
  );
}