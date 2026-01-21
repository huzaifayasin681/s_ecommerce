'use client';

import { motion, Variants } from 'framer-motion';
import { memo, useState, useMemo } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import { products, categories } from '@/lib/products';
import { Sparkles, Crown, Heart, Music, Flower2 } from 'lucide-react';

const iconMap = {
    Sparkles,
    Crown,
    Heart,
    Music,
    Flower2,
};

// Animation variants for scroll reveal
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
};

function FeaturedProductsComponent() {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = useMemo(() => {
        return activeCategory === 'all'
            ? products
            : products.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Static Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
                <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl" />
                <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-pink-500/5 blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header with scroll animation */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-12"
                >
                    <h2 className="heading-lg mb-4">
                        <span className="text-white">Bridal </span>
                        <span className="text-gradient">Collection</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Handcrafted lehengas designed to make your special day unforgettable.
                    </p>
                </motion.div>

                {/* Category Filters with stagger animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    className="flex flex-wrap justify-center gap-3 mb-12"
                >
                    {categories.map((category) => {
                        const Icon = iconMap[category.icon as keyof typeof iconMap];
                        return (
                            <motion.button
                                key={category.id}
                                variants={itemVariants}
                                onClick={() => setActiveCategory(category.id)}
                                className={`px-6 py-3 rounded-2xl flex items-center gap-2 transition-all duration-200 ${activeCategory === category.id
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                                    : 'glass hover:bg-white/10 text-gray-300'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Icon className="w-4 h-4" />
                                {category.name}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Products Grid with scroll reveal */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    {filteredProducts.map((product) => (
                        <motion.div key={product.id} variants={itemVariants}>
                            <ProductCard product={product} index={0} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* View All Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <a
                        href="/products"
                        className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors group"
                    >
                        <span>View all lehengas</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

const FeaturedProducts = memo(FeaturedProductsComponent);
FeaturedProducts.displayName = 'FeaturedProducts';

export default FeaturedProducts;
