'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Eye } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/products';
import { useCartStore } from '@/lib/store';

interface ProductCardProps {
    product: Product;
    index?: number;
}

const getCategoryEmoji = (category: string) => {
    switch (category) {
        case 'bridal':
            return '👰';
        case 'reception':
            return '💃';
        case 'sangeet':
            return '🎵';
        case 'mehendi':
            return '🌿';
        default:
            return '✨';
    }
};

const getCategoryColor = (category: string) => {
    switch (category) {
        case 'bridal':
            return 'from-red-500/20 to-pink-500/20';
        case 'reception':
            return 'from-pink-500/20 to-purple-500/20';
        case 'sangeet':
            return 'from-yellow-500/20 to-orange-500/20';
        case 'mehendi':
            return 'from-green-500/20 to-emerald-500/20';
        default:
            return 'from-purple-500/20 to-pink-500/20';
    }
};

function ProductCardComponent({ product }: ProductCardProps) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addItem(product);
        openCart();
    };

    // Format price in Indian Rupees
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <Link href={`/products/${product.id}`}>
            <motion.div
                className="group glass-card p-6 cursor-pointer h-full"
                whileHover={{
                    y: -8,
                    transition: { duration: 0.3, ease: 'easeOut' }
                }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Category Badge */}
                <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium capitalize flex items-center gap-1 text-gray-300">
                        {getCategoryEmoji(product.category)} {product.category}
                    </span>
                    {product.featured && (
                        <span className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-xs font-medium text-pink-300">
                            Featured
                        </span>
                    )}
                </div>

                {/* Product Image Area */}
                <div className={`relative h-48 rounded-2xl bg-gradient-to-br ${getCategoryColor(product.category)} flex items-center justify-center mb-6 overflow-hidden group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-colors duration-500`}>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/10 group-hover:to-purple-500/10 transition-all duration-500" />

                    {/* Product Emoji/Icon */}
                    <motion.div
                        className="text-7xl relative z-10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                        {product.category === 'bridal' && '👗'}
                        {product.category === 'reception' && '💐'}
                        {product.category === 'sangeet' && '🎊'}
                        {product.category === 'mehendi' && '🌸'}
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-pink-300 transition-colors duration-300 line-clamp-1">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <span className="text-xl font-bold text-gradient">
                                {formatPrice(product.price)}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <motion.button
                                className="p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Eye className="w-4 h-4 text-gray-300" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleAddToCart}
                                className="p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:shadow-lg hover:shadow-pink-500/25 transition-shadow"
                            >
                                <ShoppingCart className="w-4 h-4 text-white" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

// Memoize to prevent unnecessary re-renders when parent updates
const ProductCard = memo(ProductCardComponent);
ProductCard.displayName = 'ProductCard';

export default ProductCard;
