/*
 * Dummy catalogue data. Replace names, SKUs, prices and image URLs with real ones.
 * Images are free Unsplash photos loaded by URL; swap them for your own product shots.
 */

export type CategorySlug = 'glass' | 'glass-hardware' | 'construction' | 'adhesives';

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string;
  blurb: string;
  image: string;
}

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  sku: string;
  image: string;
  price: number; // SAR, before VAT
  unit: string; // e.g. 'm²', 'bag', 'piece'
  moq: number; // minimum order quantity, in units
  origin: string;
  leadTime: string;
  inStock: boolean;
  featured?: boolean;
  summary: string;
  specs: Spec[];
}

const img = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMAGES = {
  heroWarehouse: img('1644079446600-219068676743', 2000),
  warehouseAisle: img('1694885156873-6a0823e14848', 1600),
  glassTower: img('1776617130019-361f70f3c703', 1600),
  glassFacade: img('1523477593243-78bbf626fd3b', 1600),
  siteCrane: img('1599707254554-027aeb4deacd', 1600),
  siteWorker: img('1589939705384-5185137a7f0f', 1600),
  welding: img('1761213230327-d89a8cc9cc63', 1600),
  railingStair: img('1762545444269-75ab7fc7cc0a', 1600),
  bathroom: img('1772476361253-90a9be5e0c19', 1600),
  toolsTable: img('1640520940891-5e46bc4ce23f', 1600),
};

export const CATEGORIES: Category[] = [
  {
    slug: 'glass',
    name: 'Architectural glass',
    short: 'Glass',
    blurb: 'Tempered, laminated, reflective, fluted and mirror glass cut to size for facades, showers and interiors.',
    image: img('1776617130019-361f70f3c703'),
  },
  {
    slug: 'glass-hardware',
    name: 'Glass hardware',
    short: 'Hardware',
    blurb: 'Pull handles, patch fittings, railing base shoes and door levers in 304 and 316 stainless steel.',
    image: img('1607289648294-ab008fc021a1'),
  },
  {
    slug: 'construction',
    name: 'Construction materials',
    short: 'Construction',
    blurb: 'Cement, rebar, blocks, bricks and porcelain tiles for contractors, supplied by the truckload.',
    image: img('1773394089934-3e29f2a3d6a9'),
  },
  {
    slug: 'adhesives',
    name: 'Glue guns & adhesives',
    short: 'Glue guns',
    blurb: 'Hot glue guns, glue sticks, caulking guns and silicone sealants for glazing, joinery and packing lines.',
    image: img('1775519686043-c177c2f12049'),
  },
];

export const PRODUCTS: Product[] = [
  // ---------- Glass ----------
  {
    id: 'p01', slug: 'clear-tempered-glass-10mm', name: '10 mm Clear Tempered Glass', category: 'glass',
    sku: 'GL-TMP-10C', image: img('1776617130019-361f70f3c703'), price: 145, unit: 'm²', moq: 50,
    origin: 'China', leadTime: '10–14 days', inStock: true, featured: true,
    summary: 'Heat-strengthened safety glass for facades, partitions and frameless doors. Cut, polished and drilled to your drawings.',
    specs: [
      { label: 'Thickness', value: '10 mm' }, { label: 'Max sheet', value: '2440 × 3660 mm' },
      { label: 'Standard', value: 'EN 12150-1' }, { label: 'Edge work', value: 'Flat polished, arrised' },
      { label: 'Processing', value: 'Holes, notches, cut-outs' },
    ],
  },
  {
    id: 'p02', slug: 'reflective-blue-glass-6mm', name: '6 mm Reflective Blue Glass', category: 'glass',
    sku: 'GL-REF-06B', image: img('1523477593243-78bbf626fd3b'), price: 98, unit: 'm²', moq: 100,
    origin: 'UAE', leadTime: '7–10 days', inStock: true,
    summary: 'Solar-control coated float glass that cuts glare and heat gain on curtain walls and storefronts.',
    specs: [
      { label: 'Thickness', value: '6 mm' }, { label: 'Light transmission', value: '32%' },
      { label: 'Solar factor', value: '0.38' }, { label: 'Coating', value: 'Hard coat, pyrolytic' },
    ],
  },
  {
    id: 'p03', slug: 'frameless-railing-glass-12mm', name: '12 mm Laminated Railing Panel', category: 'glass',
    sku: 'GL-LAM-12R', image: img('1762545444269-75ab7fc7cc0a'), price: 260, unit: 'm²', moq: 20,
    origin: 'Turkey', leadTime: '14–18 days', inStock: true, featured: true,
    summary: 'Tempered laminated glass (6+6 mm with 1.52 PVB) for balconies, stairs and mezzanine balustrades.',
    specs: [
      { label: 'Build-up', value: '6 + 6 mm, 1.52 PVB' }, { label: 'Use', value: 'Balustrades, stairs' },
      { label: 'Standard', value: 'EN 14449' }, { label: 'Edge work', value: 'Flat polished' },
    ],
  },
  {
    id: 'p04', slug: 'shower-enclosure-glass-8mm', name: '8 mm Shower Enclosure Glass', category: 'glass',
    sku: 'GL-SHW-08C', image: img('1772476361253-90a9be5e0c19'), price: 175, unit: 'm²', moq: 10,
    origin: 'China', leadTime: '10–14 days', inStock: true,
    summary: 'Low-iron tempered glass with easy-clean coating, supplied pre-drilled for hinges and handles.',
    specs: [
      { label: 'Thickness', value: '8 mm' }, { label: 'Type', value: 'Low-iron, tempered' },
      { label: 'Coating', value: 'Hydrophobic easy-clean' }, { label: 'Processing', value: 'Hinge and handle holes' },
    ],
  },
  {
    id: 'p05', slug: 'fluted-glass-8mm', name: '8 mm Fluted (Reeded) Glass', category: 'glass',
    sku: 'GL-FLT-08', image: img('1762012591496-e9f42d84fa1e'), price: 210, unit: 'm²', moq: 20,
    origin: 'Italy', leadTime: '21–28 days', inStock: false,
    summary: 'Vertical reeded pattern for privacy partitions, cabinet doors and feature walls.',
    specs: [
      { label: 'Thickness', value: '8 mm' }, { label: 'Pattern', value: '10 mm reed' },
      { label: 'Temperable', value: 'Yes' },
    ],
  },
  {
    id: 'p06', slug: 'silver-mirror-5mm', name: '5 mm Silver Mirror', category: 'glass',
    sku: 'GL-MIR-05', image: img('1783125126959-bcd87518b7d8'), price: 72, unit: 'm²', moq: 30,
    origin: 'Belgium', leadTime: '10–14 days', inStock: true,
    summary: 'Copper-free, lead-free silver mirror for bathrooms, gyms and hospitality fit-outs.',
    specs: [
      { label: 'Thickness', value: '5 mm' }, { label: 'Backing', value: 'Copper-free, lead-free' },
      { label: 'Edge work', value: 'Bevel or flat polish' },
    ],
  },

  // ---------- Glass hardware ----------
  {
    id: 'p07', slug: 'ss316-pull-handle-600', name: 'SS316 Pull Handle, 600 mm', category: 'glass-hardware',
    sku: 'HW-PUL-600', image: img('1607289648294-ab008fc021a1'), price: 118, unit: 'pair', moq: 10,
    origin: 'China', leadTime: '7–10 days', inStock: true, featured: true,
    summary: 'Back-to-back H-type pull handle for 8–12 mm glass doors, satin or matte black finish.',
    specs: [
      { label: 'Material', value: 'Stainless steel 316' }, { label: 'Length', value: '600 mm' },
      { label: 'Glass', value: '8–12 mm' }, { label: 'Finish', value: 'Satin / matte black' },
    ],
  },
  {
    id: 'p08', slug: 'railing-base-shoe-3m', name: 'Aluminium Railing Base Shoe, 3 m', category: 'glass-hardware',
    sku: 'HW-BSH-3000', image: img('1766156181041-0dc63ec093ff'), price: 340, unit: 'length', moq: 5,
    origin: 'Turkey', leadTime: '10–14 days', inStock: true,
    summary: 'Top-mount U-channel profile with rubber wedges for frameless glass balustrades.',
    specs: [
      { label: 'Material', value: 'Aluminium 6063-T6' }, { label: 'Length', value: '3000 mm' },
      { label: 'Glass', value: '12–17.52 mm' }, { label: 'Finish', value: 'Anodised silver' },
    ],
  },
  {
    id: 'p09', slug: 'lever-handle-set', name: 'Door Lever Handle Set', category: 'glass-hardware',
    sku: 'HW-LVR-01', image: img('1588704821128-889309f68363'), price: 64, unit: 'set', moq: 20,
    origin: 'China', leadTime: '7–10 days', inStock: true,
    summary: 'Solid lever on round rose with lockset, for timber and aluminium doors.',
    specs: [
      { label: 'Material', value: 'SS304' }, { label: 'Includes', value: 'Levers, roses, latch, screws' },
      { label: 'Finish', value: 'Brushed silver' },
    ],
  },

  // ---------- Construction ----------
  {
    id: 'p10', slug: 'opc-cement-50kg', name: 'OPC Cement 42.5N, 50 kg', category: 'construction',
    sku: 'CM-OPC-50', image: img('1773394089934-3e29f2a3d6a9'), price: 17.5, unit: 'bag', moq: 400,
    origin: 'Saudi Arabia', leadTime: '2–3 days', inStock: true, featured: true,
    summary: 'Ordinary Portland cement for structural concrete, blockwork and plastering. Delivered on pallets.',
    specs: [
      { label: 'Grade', value: '42.5N' }, { label: 'Standard', value: 'SASO / ASTM C150' },
      { label: 'Pack', value: '50 kg bag, 40 bags per pallet' },
    ],
  },
  {
    id: 'p11', slug: 'deformed-rebar-16mm', name: 'Deformed Steel Rebar, 16 mm', category: 'construction',
    sku: 'CM-RBR-16', image: img('1745909247906-123b53b70e06'), price: 2650, unit: 'tonne', moq: 5,
    origin: 'Saudi Arabia', leadTime: '3–5 days', inStock: true,
    summary: 'Grade 60 high-yield reinforcement bar in 12 m lengths, supplied with mill test certificates.',
    specs: [
      { label: 'Diameter', value: '16 mm' }, { label: 'Grade', value: 'ASTM A615 Gr. 60' },
      { label: 'Length', value: '12 m' }, { label: 'Certificate', value: 'Mill test report' },
    ],
  },
  {
    id: 'p12', slug: 'red-clay-bricks', name: 'Red Clay Facing Bricks', category: 'construction',
    sku: 'CM-BRK-RED', image: img('1627882206813-8c1ffd86efec'), price: 1.35, unit: 'piece', moq: 5000,
    origin: 'UAE', leadTime: '5–7 days', inStock: true,
    summary: 'Kiln-fired facing bricks with consistent colour for boundary walls and feature facades.',
    specs: [
      { label: 'Size', value: '215 × 102.5 × 65 mm' }, { label: 'Strength', value: '≥ 20 N/mm²' },
      { label: 'Pack', value: '500 per pallet' },
    ],
  },
  {
    id: 'p13', slug: 'porcelain-tiles-60x60', name: 'Porcelain Floor Tile 60 × 60', category: 'construction',
    sku: 'CM-TIL-6060', image: img('1580398562556-d33329a0f29b'), price: 38, unit: 'm²', moq: 100,
    origin: 'India', leadTime: '14–21 days', inStock: true, featured: true,
    summary: 'Matte grey rectified porcelain for commercial floors, R10 slip rating.',
    specs: [
      { label: 'Size', value: '600 × 600 × 9 mm' }, { label: 'Finish', value: 'Matte, rectified' },
      { label: 'Slip rating', value: 'R10' }, { label: 'Box', value: '1.44 m² (4 tiles)' },
    ],
  },
  {
    id: 'p14', slug: 'sage-wall-tiles', name: 'Sage Ceramic Wall Tile 20 × 20', category: 'construction',
    sku: 'CM-TIL-SAGE', image: img('1523350165414-082d792c4bcc'), price: 55, unit: 'm²', moq: 40,
    origin: 'Spain', leadTime: '21–28 days', inStock: false,
    summary: 'Glazed wall tile for kitchens, bathrooms and cafés. Mix with off-white for a checkerboard.',
    specs: [
      { label: 'Size', value: '200 × 200 × 8 mm' }, { label: 'Finish', value: 'Gloss glaze' },
    ],
  },

  // ---------- Adhesives & glue guns ----------
  {
    id: 'p15', slug: 'industrial-hot-glue-gun-100w', name: 'Industrial Hot Glue Gun, 100 W', category: 'adhesives',
    sku: 'AD-HGG-100', image: img('1775519686043-c177c2f12049'), price: 48, unit: 'piece', moq: 24,
    origin: 'China', leadTime: '7–10 days', inStock: true, featured: true,
    summary: 'Fast-heat glue gun for 11 mm sticks with trigger feed, stand and interchangeable nozzles.',
    specs: [
      { label: 'Power', value: '100 W' }, { label: 'Stick size', value: '11 mm' },
      { label: 'Heat-up', value: '3–5 min' }, { label: 'Plug', value: 'UK 3-pin, 230 V' },
    ],
  },
  {
    id: 'p16', slug: 'hot-melt-glue-sticks-11mm', name: 'Hot Melt Glue Sticks, 11 mm (1 kg)', category: 'adhesives',
    sku: 'AD-GST-11', image: img('1640520940891-5e46bc4ce23f'), price: 22, unit: 'kg', moq: 50,
    origin: 'China', leadTime: '7–10 days', inStock: true,
    summary: 'Clear EVA sticks for carton sealing, crafts and light assembly. About 40 sticks per kilo.',
    specs: [
      { label: 'Diameter', value: '11 mm' }, { label: 'Length', value: '270 mm' },
      { label: 'Material', value: 'EVA, clear' },
    ],
  },
  {
    id: 'p17', slug: 'heavy-duty-caulking-gun', name: 'Heavy-Duty Caulking Gun', category: 'adhesives',
    sku: 'AD-CKG-HD', image: img('1560755341-c5417203d21c'), price: 29, unit: 'piece', moq: 24,
    origin: 'Taiwan', leadTime: '7–10 days', inStock: true,
    summary: 'Steel-frame skeleton gun with 12:1 thrust ratio for 300 ml silicone and PU cartridges.',
    specs: [
      { label: 'Cartridge', value: '300–310 ml' }, { label: 'Thrust ratio', value: '12:1' },
      { label: 'Frame', value: 'Zinc-plated steel' },
    ],
  },
  {
    id: 'p18', slug: 'neutral-silicone-sealant', name: 'Neutral Cure Silicone Sealant, 300 ml', category: 'adhesives',
    sku: 'AD-SIL-NC', image: img('1601430763562-6d654eed4cd8'), price: 14, unit: 'tube', moq: 120,
    origin: 'Saudi Arabia', leadTime: '2–3 days', inStock: true,
    summary: 'Non-corrosive glazing silicone for glass, aluminium and stone. Clear, white or black.',
    specs: [
      { label: 'Volume', value: '300 ml' }, { label: 'Cure', value: 'Neutral (oxime)' },
      { label: 'Movement', value: '±25%' }, { label: 'Colours', value: 'Clear, white, black' },
    ],
  },
  {
    id: 'p19', slug: 'tile-adhesive-20kg', name: 'Cement Tile Adhesive C2TE, 20 kg', category: 'adhesives',
    sku: 'AD-TAD-20', image: img('1575493438282-4e0fb32d1bdd'), price: 26, unit: 'bag', moq: 100,
    origin: 'Saudi Arabia', leadTime: '2–3 days', inStock: true,
    summary: 'Polymer-modified adhesive for large porcelain tiles on floors and walls, indoors and out.',
    specs: [
      { label: 'Class', value: 'C2TE' }, { label: 'Pack', value: '20 kg bag' },
      { label: 'Coverage', value: '4–5 kg/m²' },
    ],
  },
];

export function categoryBySlug(slug: string | undefined): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

/** Volume pricing: 5% off from 4× MOQ, 10% off from 10× MOQ. */
export interface PriceTier {
  label: string;
  minQty: number;
  discount: number;
}

export function tiersFor(p: Product): PriceTier[] {
  return [
    { label: `${p.moq}+`, minQty: p.moq, discount: 0 },
    { label: `${p.moq * 4}+`, minQty: p.moq * 4, discount: 0.05 },
    { label: `${p.moq * 10}+`, minQty: p.moq * 10, discount: 0.1 },
  ];
}

export function unitPriceFor(p: Product, qty: number): number {
  const tier = [...tiersFor(p)].reverse().find((t) => qty >= t.minQty);
  return p.price * (1 - (tier?.discount ?? 0));
}
