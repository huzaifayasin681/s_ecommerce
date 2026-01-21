// Product types and data for Shoaib - Handmade Bridal Lehenga Store

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bridal' | 'reception' | 'sangeet' | 'mehendi';
  image: string;
  specs: string[];
  featured: boolean;
  stock: number;
}

export const products: Product[] = [
  {
    id: 'royal-red-bridal',
    name: 'Royal Red Bridal Lehenga',
    description: 'Exquisite handcrafted red bridal lehenga with intricate zardozi embroidery and heavy dupatta. Perfect for the traditional bride.',
    price: 85000,
    category: 'bridal',
    image: '/products/bridal-1.jpg',
    specs: ['Pure Silk Fabric', 'Zardozi Embroidery', 'Custom Fitting', 'Heavy Dupatta Included'],
    featured: true,
    stock: 3,
  },
  {
    id: 'golden-elegance',
    name: 'Golden Elegance Lehenga',
    description: 'Stunning golden lehenga with delicate sequin work and traditional motifs. A timeless piece for the modern bride.',
    price: 95000,
    category: 'bridal',
    image: '/products/bridal-2.jpg',
    specs: ['Banarasi Silk', 'Hand Sequin Work', 'Cancan Underlayer', 'Matching Jewelry Set'],
    featured: true,
    stock: 2,
  },
  {
    id: 'maroon-maharani',
    name: 'Maroon Maharani Collection',
    description: 'Rich maroon velvet lehenga with kundan and pearl embellishments. Designed for the queen on her special day.',
    price: 120000,
    category: 'bridal',
    image: '/products/bridal-3.jpg',
    specs: ['Premium Velvet', 'Kundan Work', 'Pearl Embellishments', 'Royal Train'],
    featured: true,
    stock: 1,
  },
  {
    id: 'pink-reception',
    name: 'Blush Pink Reception Lehenga',
    description: 'Elegant pastel pink lehenga with mirror work and thread embroidery. Perfect for your reception ceremony.',
    price: 65000,
    category: 'reception',
    image: '/products/reception-1.jpg',
    specs: ['Georgette Fabric', 'Mirror Work', 'Lightweight Design', 'Easy Movement'],
    featured: true,
    stock: 5,
  },
  {
    id: 'champagne-dreams',
    name: 'Champagne Dreams Lehenga',
    description: 'Sophisticated champagne colored lehenga with subtle gold embroidery. Modern elegance for your reception.',
    price: 72000,
    category: 'reception',
    image: '/products/reception-2.jpg',
    specs: ['Organza Silk', 'Gold Thread Work', 'Flared Silhouette', 'Matching Clutch'],
    featured: false,
    stock: 4,
  },
  {
    id: 'peach-paradise',
    name: 'Peach Paradise Collection',
    description: 'Dreamy peach lehenga with floral embroidery and crystal accents. Light and beautiful for evening receptions.',
    price: 58000,
    category: 'reception',
    image: '/products/reception-3.jpg',
    specs: ['Net Fabric', 'Floral Embroidery', 'Crystal Accents', 'Soft Dupatta'],
    featured: false,
    stock: 6,
  },
  {
    id: 'yellow-sunshine',
    name: 'Yellow Sunshine Lehenga',
    description: 'Vibrant yellow lehenga with gotta patti work. Spread joy and happiness at your sangeet ceremony.',
    price: 45000,
    category: 'sangeet',
    image: '/products/sangeet-1.jpg',
    specs: ['Cotton Silk', 'Gotta Patti Work', 'Comfortable Fit', 'Dance Friendly'],
    featured: true,
    stock: 8,
  },
  {
    id: 'turquoise-twirl',
    name: 'Turquoise Twirl Lehenga',
    description: 'Eye-catching turquoise lehenga with silver threadwork. Perfect for dancing the night away.',
    price: 48000,
    category: 'sangeet',
    image: '/products/sangeet-2.jpg',
    specs: ['Chanderi Silk', 'Silver Threadwork', 'Flared Cut', 'Lightweight'],
    featured: false,
    stock: 7,
  },
  {
    id: 'orange-celebration',
    name: 'Orange Celebration Lehenga',
    description: 'Festive orange lehenga with multicolor embroidery. Celebrate with colors and joy.',
    price: 42000,
    category: 'sangeet',
    image: '/products/sangeet-3.jpg',
    specs: ['Art Silk', 'Multicolor Embroidery', 'Easy Drape', 'Festive Design'],
    featured: false,
    stock: 9,
  },
  {
    id: 'green-mehendi',
    name: 'Green Garden Lehenga',
    description: 'Beautiful green lehenga with floral prints and light embroidery. Perfect for your mehendi ceremony.',
    price: 38000,
    category: 'mehendi',
    image: '/products/mehendi-1.jpg',
    specs: ['Printed Silk', 'Light Embroidery', 'Comfortable Wear', 'Easy to Carry'],
    featured: true,
    stock: 10,
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh Collection',
    description: 'Refreshing mint green lehenga with delicate threadwork. Stay cool and beautiful at your mehendi.',
    price: 35000,
    category: 'mehendi',
    image: '/products/mehendi-2.jpg',
    specs: ['Chiffon Fabric', 'Delicate Threadwork', 'Breathable Material', 'Day Wear Perfect'],
    featured: false,
    stock: 12,
  },
  {
    id: 'lime-delight',
    name: 'Lime Delight Lehenga',
    description: 'Playful lime green lehenga with pompom borders and mirror work. Fun and festive for mehendi.',
    price: 32000,
    category: 'mehendi',
    image: '/products/mehendi-3.jpg',
    specs: ['Cotton Blend', 'Pompom Borders', 'Mirror Work', 'Casual Elegance'],
    featured: false,
    stock: 15,
  },
];

export const categories = [
  { id: 'all', name: 'All Lehengas', icon: 'Sparkles' },
  { id: 'bridal', name: 'Bridal', icon: 'Crown' },
  { id: 'reception', name: 'Reception', icon: 'Heart' },
  { id: 'sangeet', name: 'Sangeet', icon: 'Music' },
  { id: 'mehendi', name: 'Mehendi', icon: 'Flower2' },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === 'all') return products;
  return products.filter((product) => product.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}
