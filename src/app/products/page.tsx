'use client';

import { Suspense, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowDown, X, Sparkles, Crown, Heart, Music, Flower2 } from 'lucide-react';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/lib/products';

const iconMap = {
    Sparkles,
    Crown,
    Heart,
    Music,
    Flower2,
};

function ProductsContent() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('featured');

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesSearch =
                    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory =
                    activeCategory === 'all' || product.category === activeCategory;
                const matchesPrice =
                    product.price >= priceRange[0] && product.price <= priceRange[1];

                return matchesSearch && matchesCategory && matchesPrice;
            })
            .sort((a, b) => {
                if (sortBy === 'price-asc') return a.price - b.price;
                if (sortBy === 'price-desc') return b.price - a.price;
                return 0; // featured/default
            });
    }, [searchQuery, activeCategory, priceRange, sortBy]);

    return (
        <div className="min-h-screen pt-20 md:pt-24 pb-12 md:pb-20">
            {/* Search and Filters Header */}
            <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-xl border-y border-white/5 py-4 mb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search lehengas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/10 rounded-xl focus:border-pink-500/50 focus:outline-none transition-colors text-white placeholder:text-gray-500"
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex-1 md:flex-none h-12 px-6 rounded-xl border flex items-center justify-center gap-2 transition-all ${showFilters
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 border-transparent text-white'
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 text-gray-300'
                                    }`}
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                                Filters
                            </button>

                            <div className="relative flex-1 md:flex-none group">
                                <button className="w-full h-12 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-between gap-3 text-gray-300 transition-colors">
                                    <span>
                                        {sortBy === 'featured'
                                            ? 'Featured'
                                            : sortBy === 'price-asc'
                                                ? 'Price: Low to High'
                                                : 'Price: High to Low'}
                                    </span>
                                    <ArrowDown className="w-4 h-4" />
                                </button>

                                {/* Dropdown */}
                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1a1a20] border border-white/10 rounded-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top shadow-xl z-50">
                                    <button
                                        onClick={() => setSortBy('featured')}
                                        className="w-full px-4 py-3 text-left hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                                    >
                                        Featured
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price-asc')}
                                        className="w-full px-4 py-3 text-left hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                                    >
                                        Price: Low to High
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price-desc')}
                                        className="w-full px-4 py-3 text-left hover:bg-white/5 text-gray-300 hover:text-white transition-colors"
                                    >
                                        Price: High to Low
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Category Filter */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400 mb-3">Categories</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((category) => {
                                                const Icon = iconMap[category.icon as keyof typeof iconMap];
                                                return (
                                                    <button
                                                        key={category.id}
                                                        onClick={() => setActiveCategory(category.id)}
                                                        className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-all ${activeCategory === category.id
                                                            ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                                                            : 'bg-white/5 text-gray-400 border border-white/5 hover:bg-white/10'
                                                            }`}
                                                    >
                                                        <Icon className="w-3 h-3" />
                                                        {category.name}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Price Range */}
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-400 mb-3">
                                            Price Range: ₹{priceRange[0]} - ₹{priceRange[1].toLocaleString()}
                                        </h3>
                                        <input
                                            type="range"
                                            min="0"
                                            max="200000"
                                            step="1000"
                                            value={priceRange[1]}
                                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6">
                {filteredProducts.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProductCard product={product} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Search className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No lehengas found</h3>
                        <p className="text-gray-400 mb-6">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory('all');
                                setPriceRange([0, 200000]);
                            }}
                            className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-32 flex justify-center">
                <div className="w-8 h-8 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
