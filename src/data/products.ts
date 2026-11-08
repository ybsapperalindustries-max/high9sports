import { Product } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_athlete_motion_1794156525881.jpg';
export const MEN_CATEGORY_IMAGE = '/src/assets/images/category_men_activewear_1794156527175.jpg';
export const WOMEN_CATEGORY_IMAGE = '/src/assets/images/category_women_activewear_1794156526649.jpg';
export const ACCESSORIES_CATEGORY_IMAGE = '/src/assets/images/category_accessories_gear_1794156527542.jpg';
export const COMPRESSION_TOP_IMAGE = '/src/assets/images/product_compression_top_1794156528119.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'h9-top-01',
    name: 'ApexFlex™ Velocity Compression Top',
    slug: 'apexflex-velocity-compression-top',
    tagline: 'Targeted muscular support with laser-perforated thermal release zones.',
    category: 'men',
    activity: 'training',
    price: 88,
    originalPrice: 110,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    images: [
      COMPRESSION_TOP_IMAGE,
      MEN_CATEGORY_IMAGE
    ],
    colors: [
      { name: 'Obsidian / Volt', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Stealth Black', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Electric Cyan', hex: '#00E5FF', bgClass: 'bg-[#00E5FF]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Engineered for maximal power output and lactic acid mitigation. The ApexFlex™ Velocity Compression Top features our proprietary dual-density weave that stabilizes deltoid and core muscle groups while micro-venting excess body heat during peak exertion.',
    features: [
      'Graduated bio-mechanical compression reduces muscle oscillation',
      'Laser-welded seams prevent chafing under repetitive sprint loads',
      'Anti-odor silver ion thread integration for multi-session freshness',
      'High-visibility reflective 3M accents for low-light road training'
    ],
    fabricSpecs: {
      composition: '78% Recycled Polyamide, 22% X-Fit Spandex',
      weight: '195 GSM Ultra-Dense Weave',
      compression: 'High',
      thermalRating: 'Optimal between 45°F - 85°F',
      care: 'Machine wash cold inside out. Air dry recommended.'
    },
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'h9-bottom-02',
    name: 'AeroVent™ Pro Performance Shorts 5"',
    slug: 'aerovent-pro-performance-shorts-5',
    tagline: 'Featherlight 4-way stretch with bounce-free integrated media holster.',
    category: 'men',
    activity: 'running',
    price: 64,
    badge: 'NEW ARRIVAL',
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    images: [
      MEN_CATEGORY_IMAGE,
      COMPRESSION_TOP_IMAGE
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Stealth Slate', hex: '#52525B', bgClass: 'bg-[#52525B]' },
      { name: 'Volt Accent', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Uncompromising range of motion for sprints, box jumps, and distance tempo runs. Built with a supportive breathable internal brief and a water-resistant outer membrane that glides seamlessly without friction.',
    features: [
      'Ergonomic split-leg hem for unrestricted stride clearance',
      'Waterproof zippered rear pocket fits up to 6.8" smartphones',
      'Sweat-wicking HydroFast waistband with silicone interior grip',
      'Anti-snag ripstop fabric withstands bar contact during deadlifts'
    ],
    fabricSpecs: {
      composition: '86% Recycled Micro-Polyester, 14% Elastane',
      weight: '110 GSM Featherlight',
      compression: 'Light',
      thermalRating: 'High-heat ventilation',
      care: 'Machine wash cold. Tumble dry low.'
    },
    isNewArrival: true,
    isTrending: true
  },
  {
    id: 'h9-women-01',
    name: 'VaporSculpt™ High-Impact Sports Bra',
    slug: 'vaporsculpt-high-impact-sports-bra',
    tagline: 'Zero-bounce encapsulation system for sprinting, HIIT, and heavy lifting.',
    category: 'women',
    activity: 'training',
    price: 62,
    originalPrice: 75,
    badge: 'ESSENTIAL',
    rating: 5.0,
    reviewCount: 218,
    inStock: true,
    images: [
      WOMEN_CATEGORY_IMAGE,
      HERO_IMAGE
    ],
    colors: [
      { name: 'Carbon Black', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Volt Lime', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Glacier White', hex: '#E4E4E7', bgClass: 'bg-[#E4E4E7]' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Engineered in collaboration with elite track athletes to eliminate breast motion without constricting the diaphragm. Contoured molded cups disperse vertical and lateral g-forces, while the open-back racerback design maximizes scapular freedom.',
    features: [
      'Anatomically engineered compression cups for zero vertical drift',
      'Wide brushed underband stays anchor-locked without digging',
      'Perforated front chest zone for rapid core heat dissipation',
      'Reinforced strap tensioners with bonded seamless edging'
    ],
    fabricSpecs: {
      composition: '75% Polyamide, 25% High-Recovery Elastane',
      weight: '240 GSM Compressive Form',
      compression: 'High',
      thermalRating: 'Multi-season high exertion',
      care: 'Machine wash gentle. Lay flat to dry.'
    },
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'h9-women-02',
    name: 'KinetiK™ Seamless 7/8 Tights',
    slug: 'kinetik-seamless-78-tights',
    tagline: 'Second-skin compressive contour with squat-proof zero-sheer density.',
    category: 'women',
    activity: 'training',
    price: 94,
    badge: 'BEST SELLER',
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    images: [
      WOMEN_CATEGORY_IMAGE,
      HERO_IMAGE
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Electric Cyan', hex: '#00E5FF', bgClass: 'bg-[#00E5FF]' },
      { name: 'Slate Gray', hex: '#3F3F46', bgClass: 'bg-[#3F3F46]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'The standard by which athletic tights are measured. KinetiK™ 7/8 Tights utilize circular warp-knit technology to offer targeted stabilization across hamstrings, glutes, and IT bands while maintaining 100% opacity in every squat angle.',
    features: [
      'High-rise double-bonded waistband stays fixed without rolling',
      'Deep dual drop-in side pockets for secure phone and gel storage',
      'Seamless interior gusset minimizes friction points on 20+ mile runs',
      'UV 50+ protection for intense outdoor summer sessions'
    ],
    fabricSpecs: {
      composition: '80% Nylon, 20% Lycra Black Elastane',
      weight: '235 GSM Squat-Proof',
      compression: 'Medium',
      thermalRating: 'All-weather versatility',
      care: 'Machine wash cold with like colors. Air dry.'
    },
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'h9-gear-01',
    name: 'Apex 40L Modular Athlete Duffel',
    slug: 'apex-40l-modular-athlete-duffel',
    tagline: 'Ballistic waterproof nylon with ventilated footwear isolation bay.',
    category: 'accessories',
    activity: 'training',
    price: 135,
    originalPrice: 160,
    badge: 'GEAR LAB',
    rating: 4.9,
    reviewCount: 97,
    inStock: true,
    images: [
      ACCESSORIES_CATEGORY_IMAGE,
      COMPRESSION_TOP_IMAGE
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Volt Accent', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' }
    ],
    sizes: ['40 Liters'],
    description: 'Designed for the athlete who transitions seamlessly from gym to travel. Features military-grade 1000D ballistic nylon, YKK AquaGuard® waterproof zippers, dedicated shoe isolation compartment with odor-neutralizing mesh, and modular gear organizers.',
    features: [
      'Dedicated isolated shoe chamber with antimicrobial ventilation',
      'Padded 16" laptop sleeve and waterproof document section',
      'Ergonomic shoulder harness converts from duffel to backpack',
      'Reinforced abrasion-resistant TPU base resists wet locker floors'
    ],
    fabricSpecs: {
      composition: '1000D Ballistic Cordura® Nylon + TPU Laminate',
      weight: '1.2 kg Dry Weight',
      compression: 'N/A',
      thermalRating: 'Weatherproof Shield',
      care: 'Wipe clean with damp cloth.'
    },
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'h9-gear-02',
    name: 'HydroLock™ 36oz Vacuum Insulated Flask',
    slug: 'hydrolock-36oz-insulated-flask',
    tagline: 'Triple-wall cryo-vacuum insulation keeping fluids icy for 36 hours.',
    category: 'accessories',
    activity: 'running',
    price: 42,
    badge: 'POPULAR',
    rating: 4.8,
    reviewCount: 164,
    inStock: true,
    images: [
      ACCESSORIES_CATEGORY_IMAGE,
      MEN_CATEGORY_IMAGE
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Volt Lime', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Steel Ice', hex: '#D4D4D8', bgClass: 'bg-[#D4D4D8]' }
    ],
    sizes: ['36 oz (1065 ml)'],
    description: 'Zero sweat, indestructible durability. Fabricated from medical-grade 18/8 pro-grade stainless steel with an electro-polished interior that never transfers metallic tastes or retains sports drink residue.',
    features: [
      'TempVault™ triple-wall vacuum barrier preserves ice for 36+ hours',
      'Leakproof magnetic sports spout with high-flow chug valve',
      'Ultra-durable textured powder coat finish for non-slip wet grip',
      'Fits standard gym cardio machine and car console cup holders'
    ],
    fabricSpecs: {
      composition: '18/8 Pro-Grade Kitchen Stainless Steel',
      weight: '430 grams empty',
      compression: 'N/A',
      thermalRating: 'Cold 36h / Hot 18h',
      care: 'Dishwasher safe. BPA & phthalate free.'
    },
    isNewArrival: true,
    isTrending: false
  },
  {
    id: 'h9-top-03',
    name: 'AeroVent™ Speed Mesh Singlet',
    slug: 'aerovent-speed-mesh-singlet',
    tagline: 'Ultralight 58g racing tank designed for blistering sprint workouts.',
    category: 'men',
    activity: 'track',
    price: 58,
    badge: 'PRO SERIES',
    rating: 4.7,
    reviewCount: 76,
    inStock: true,
    images: [
      COMPRESSION_TOP_IMAGE,
      HERO_IMAGE
    ],
    colors: [
      { name: 'Volt Neon', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Stealth Black', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Electric Cyan', hex: '#00E5FF', bgClass: 'bg-[#00E5FF]' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Weighing in at a mere 58 grams, the Speed Mesh Singlet feels completely weightless. Micro-engineered open cell mesh directs turbulent airflow around the torso to drastically accelerate evaporative cooling.',
    features: [
      'Bonded armhole and neckline edges eliminate friction hotspots',
      'Anti-cling geometric knit pattern prevents damp fabric sticking',
      'Engineered dropped back hem provides coverage during high kicks',
      'Certified IAAF competition compliant reflective branding'
    ],
    fabricSpecs: {
      composition: '90% Recycled Polyester, 10% Elastane',
      weight: '58 GSM Superlight',
      compression: 'Light',
      thermalRating: 'Extreme Heat Performance',
      care: 'Machine wash delicate. Do not iron.'
    },
    isNewArrival: true,
    isTrending: false
  },
  {
    id: 'h9-women-03',
    name: 'AeroLite™ Tech Fleece Pullover',
    slug: 'aerolite-tech-fleece-pullover',
    tagline: 'High-thermal loft with minimal bulk for pre-race warmups.',
    category: 'women',
    activity: 'recovery',
    price: 110,
    originalPrice: 130,
    badge: 'LIMITED RUN',
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    images: [
      WOMEN_CATEGORY_IMAGE,
      COMPRESSION_TOP_IMAGE
    ],
    colors: [
      { name: 'Deep Slate', hex: '#27272A', bgClass: 'bg-[#27272A]' },
      { name: 'Alpine Frost', hex: '#F4F4F5', bgClass: 'bg-[#F4F4F5]' },
      { name: 'Volt Trim', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Warmth without weight. The AeroLite™ Tech Fleece combines an ultra-soft brushed micro-grid interior with a weather-shedding smooth exterior shell, perfect for dawn track workouts and post-race cool-downs.',
    features: [
      'Micro-grid fleece channels trap warm air while releasing moisture',
      'Ergonomic thumb loops anchor sleeves over cold palms',
      'Concealed invisible-zip kangaroo pocket for key and card security',
      'High funnel neck with chin guard keeps biting winds at bay'
    ],
    fabricSpecs: {
      composition: '68% Cotton, 32% Technical Polyester',
      weight: '280 GSM Structured Loft',
      compression: 'Light',
      thermalRating: 'Cool to Cold Weather (30°F - 60°F)',
      care: 'Machine wash warm inside out. Hang dry.'
    },
    isNewArrival: false,
    isTrending: false
  },
  {
    id: 'h9-gear-03',
    name: 'GripTech™ Pro Carbon Lifting Straps',
    slug: 'griptech-pro-carbon-lifting-straps',
    tagline: 'Industrial-grade tensile webbing infused with micro-silicone grip bars.',
    category: 'accessories',
    activity: 'training',
    price: 32,
    badge: 'HEAVY DUTY',
    rating: 5.0,
    reviewCount: 405,
    inStock: true,
    images: [
      ACCESSORIES_CATEGORY_IMAGE,
      MEN_CATEGORY_IMAGE
    ],
    colors: [
      { name: 'Obsidian / Volt', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Triple Stealth', hex: '#18181B', bgClass: 'bg-[#18181B]' }
    ],
    sizes: ['One Size (Pair)'],
    description: 'Rated to withstand over 1,200 lbs of tensile load. Infused with silicone hexagonal traction nodules that lock onto knurled barbell steel with ironclad security, saving grip fatigue during max effort deadlifts.',
    features: [
      '5mm high-density neoprene wrist padding prevents nerve bruising',
      'Heavy-duty cross-box stitching using bonded Kevlar® thread',
      'Extended 23" strap length allows double barbell wrapping',
      'Left/Right anatomical designation tags for quick gym transitions'
    ],
    fabricSpecs: {
      composition: 'Heavy Cotton Weave + High-Tack Silicone + Neoprene',
      weight: '160g pair',
      compression: 'N/A',
      thermalRating: 'N/A',
      care: 'Hand wash with mild detergent. Air dry.'
    },
    isNewArrival: false,
    isTrending: false
  },
  {
    id: 'h9-men-04',
    name: 'KinetiK™ Pro Sprint Tights (Full Length)',
    slug: 'kinetik-pro-sprint-tights-full-length',
    tagline: 'Graduated compression pants with calf stabilization panels.',
    category: 'men',
    activity: 'track',
    price: 105,
    badge: 'ATHLETE LAB',
    rating: 4.8,
    reviewCount: 114,
    inStock: true,
    images: [
      MEN_CATEGORY_IMAGE,
      HERO_IMAGE
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Volt Accents', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'Full-length coverage engineered to optimize venous return and reduce hamstring deceleration stress. Ankle zip gussets allow easy on-and-off over track spikes or training shoes.',
    features: [
      'Graduated 20-25 mmHg compression promotes rapid muscular recovery',
      'Reflective 360-degree night visibility bands on calf segments',
      'Dual flatlock seam architecture prevents chafing during full stride cycles',
      'Sweat-blocking internal key pocket'
    ],
    fabricSpecs: {
      composition: '82% Polyamide, 18% High-Grade Spandex',
      weight: '220 GSM Compressive Weave',
      compression: 'High',
      thermalRating: '35°F - 75°F',
      care: 'Machine wash cold. Line dry.'
    },
    isNewArrival: false,
    isTrending: true
  },
  {
    id: 'h9-women-04',
    name: 'AeroVent™ Pace Running Shorts',
    slug: 'aerovent-pace-running-shorts',
    tagline: 'Ultralight shell with compression inner short and gel stash loops.',
    category: 'women',
    activity: 'running',
    price: 68,
    badge: 'NEW',
    rating: 4.9,
    reviewCount: 156,
    inStock: true,
    images: [
      WOMEN_CATEGORY_IMAGE,
      COMPRESSION_TOP_IMAGE
    ],
    colors: [
      { name: 'Obsidian', hex: '#18181B', bgClass: 'bg-[#18181B]' },
      { name: 'Volt Lime', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Cyan Streak', hex: '#00E5FF', bgClass: 'bg-[#00E5FF]' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Built for marathons and fast paced intervals. Features a buttery soft compressive 4" liner that stays locked on thighs without riding up, paired with a featherlight 2.5" split shell.',
    features: [
      'Integrated interior phone sleeve with bounce-free tension',
      'Four elastic waistband gel stash loops for marathon fueling',
      'Wide flat elastic waistband with continuous drawcord',
      'Laser-cut ventilation eyelets across posterior waistband'
    ],
    fabricSpecs: {
      composition: 'Outer: 88% Recycled Poly / Liner: 80% Nylon 20% Spandex',
      weight: '115 GSM Dual-Construction',
      compression: 'Medium',
      thermalRating: 'Warm to Hot Condition Performance',
      care: 'Machine wash cold. Do not use fabric softeners.'
    },
    isNewArrival: true,
    isTrending: true
  },
  {
    id: 'h9-gear-04',
    name: 'ApexKnit™ Anti-Blister Crew Running Socks',
    slug: 'apexknit-anti-blister-crew-running-socks',
    tagline: 'Arch-compression support band with targeted Achilles cushion zones.',
    category: 'accessories',
    activity: 'running',
    price: 24,
    badge: '3-PACK',
    rating: 4.9,
    reviewCount: 520,
    inStock: true,
    images: [
      ACCESSORIES_CATEGORY_IMAGE,
      HERO_IMAGE
    ],
    colors: [
      { name: 'Stealth Black / Volt', hex: '#CCFF00', bgClass: 'bg-[#CCFF00]' },
      { name: 'Pure White / Black', hex: '#FFFFFF', bgClass: 'bg-[#FFFFFF]' }
    ],
    sizes: ['S (M 4-6.5)', 'M (M 7-9.5)', 'L (M 10-12.5)', 'XL (M 13+)'],
    description: 'Precision knit with frictionless friction-reducing yarn at toe and heel boxes to guarantee zero blisters on runs up to 100 miles. Strategic arch tension bands prevent foot slippage inside shoes.',
    features: [
      'Hand-linked seamless toe box prevents blister formation',
      '360-degree anatomical arch compression band for plantar stability',
      'Ventilated micro-mesh upper foot grid vents heat buildup',
      'High-density Achilles tab buffers against shoe collar friction'
    ],
    fabricSpecs: {
      composition: '64% Merino Wool, 32% Polyamide, 4% Lycra',
      weight: 'Medium Density Knit',
      compression: 'Light',
      thermalRating: 'All-season moisture balance',
      care: 'Machine wash warm inside out. Tumble dry low.'
    },
    isNewArrival: false,
    isTrending: false
  }
];

export const CATEGORIES = [
  {
    id: 'men',
    title: "Men's Activewear",
    subtitle: "Engineered Compression & High-Output Training Apparel",
    image: MEN_CATEGORY_IMAGE,
    count: '24 Styles',
    linkCategory: 'men'
  },
  {
    id: 'women',
    title: "Women's Activewear",
    subtitle: "High-Impact Performance Bras & Sculpting Leggings",
    image: WOMEN_CATEGORY_IMAGE,
    count: '28 Styles',
    linkCategory: 'women'
  },
  {
    id: 'accessories',
    title: "Performance Accessories",
    subtitle: "Ballistic Gym Bags, Vacuum Flasks & Ergonomic Straps",
    image: ACCESSORIES_CATEGORY_IMAGE,
    count: '16 Styles',
    linkCategory: 'accessories'
  }
];

export const BRAND_VALUES = [
  {
    title: "Proprietary ApexFlex™ Weave",
    description: "Multi-density warp-knit construction that stabilizes muscle oscillation without restricting explosive range of motion.",
    metric: "4-Way Adaptive Tensile Stretch"
  },
  {
    title: "Bio-Adaptive Heat Dissipation",
    description: "Laser-engineered micro-venting strategically placed across human heat maps for instant evaporative cooling.",
    metric: "3.4x Faster Vapor Transit"
  },
  {
    title: "Zero-Compromise Durability",
    description: "Tested across 500+ commercial wash cycles and extreme tensile loads to guarantee lifetime dimensional stability.",
    metric: "100% Anti-Pill & Squat-Proof"
  },
  {
    title: "Fast Worldwide Express",
    description: "Free express dispatch on orders over $75. Backed by our 30-day no-questions-asked elite performance guarantee.",
    metric: "30-Day On-Track Trial"
  }
];
