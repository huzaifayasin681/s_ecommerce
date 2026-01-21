'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { getProductById, products } from '@/lib/products';
import { useCartStore } from '@/lib/store';
import { ShoppingCart, MessageCircle, Check, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import MagneticButton from '@/components/ui/MagneticButton';
import ProductCard from '@/components/ui/ProductCard';
import { initiateQuickCheckout } from '@/lib/whatsapp';

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.id as string;
    const product = getProductById(productId);
    const { addItem, openCart } = useCartStore();

    if (!product) {
        return (
            <div className="min-h-screen pt-32 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-8xl mb-6">🔍</div>
                    <h1 className="text-2xl font-semibold mb-4">Product Not Found</h1>
                    <Link href="/products">
                        <MagneticButton className="px-6 py-3 rounded-xl glass border border-white/20">
                            <ArrowLeft className="w-4 h-4 mr-2 inline" />
                            Back to Products
                        </MagneticButton>
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem(product);
        openCart();
    };

    const handleBuyNow = () => {
        initiateQuickCheckout([{ product, quantity: 1 }], product.price);
    };

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const getCategoryEmoji = (category: string) => {
        switch (category) {
            case 'tech':
                return '⚡';
            case 'accessories':
                return '🎒';
            case 'lifestyle':
                return '✨';
            default:
                return '🛍️';
        }
    };

    return (
        <div className="min-h-screen pt-32 pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Breadcrumb */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Products
                    </Link>
                </motion.div>

                {/* Product Detail */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="sticky top-32">
                            <motion.div
                                className="aspect-square rounded-3xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 flex items-center justify-center overflow-hidden relative"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                {/* Glow Effect */}
                                <motion.div
                                    className="absolute inset-0 opacity-50"
                                    style={{
                                        background:
                                            'radial-gradient(circle at center, rgba(124, 58, 237, 0.2) 0%, transparent 70%)',
                                    }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.3, 0.5, 0.3],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />

                                {/* Product Visual */}
                                <motion.div
                                    className="text-[12rem] relative z-10"
                                    animate={{
                                        y: [0, -20, 0],
                                        rotate: [0, 5, 0],
                                    }}
                                    transition={{ duration: 6, repeat: Infinity }}
                                >
                                    {product.category === 'tech' && '🎧'}
                                    {product.category === 'accessories' && '🎒'}
                                    {product.category === 'lifestyle' && '✨'}
                                </motion.div>

                                {/* Floating Particles */}
                                <motion.div
                                    className="absolute top-10 right-10 w-4 h-4 rounded-full bg-purple-400"
                                    animate={{ y: [0, -30, 0], opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                />
                                <motion.div
                                    className="absolute bottom-20 left-20 w-6 h-6 rounded-full bg-cyan-400"
                                    animate={{ y: [0, -25, 0], opacity: [0.2, 0.8, 0.2] }}
                                    transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                                />
                            </motion.div>

                            {/* Badges */}
                            <div className="flex items-center gap-4 mt-6">
                                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm flex items-center gap-2">
                                    {getCategoryEmoji(product.category)} {product.category}
                                </span>
                                {product.featured && (
                                    <span className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-sm text-purple-300">
                                        ⭐ Featured
                                    </span>
                                )}
                                <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-sm text-green-400">
                                    {product.stock} in stock
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="heading-md mb-4 text-white">{product.name}</h1>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-400 text-sm">(42 reviews)</span>
                        </div>

                        {/* Price */}
                        <div className="glass-card p-6">
                            <div className="flex items-baseline gap-3 mb-4">
                                <span className="text-4xl font-bold text-gradient">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-gray-500 line-through text-lg">
                                    ${(product.price * 1.2).toFixed(2)}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                                    Save 20%
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <MagneticButton
                                    onClick={handleAddToCart}
                                    className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-purple-500/25 transition-all"
                                    strength={0.15}
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    Add to Cart
                                </MagneticButton>

                                <MagneticButton
                                    onClick={handleBuyNow}
                                    className="flex-1 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-2xl hover:shadow-green-500/25 transition-all"
                                    strength={0.15}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Buy via WhatsApp
                                </MagneticButton>
                            </div>
                        </div>

                        {/* Specs */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4 text-white">Specifications</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {product.specs.map((spec, index) => (
                                    <motion.div
                                        key={spec}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + index * 0.1 }}
                                        className="flex items-center gap-3 p-4 rounded-xl glass"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-purple-400" />
                                        </div>
                                        <span className="text-gray-300">{spec}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="glass-card p-6">
                            <h3 className="font-semibold mb-4 text-white">Shipping & Returns</h3>
                            <ul className="space-y-3 text-gray-400">
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                    Free shipping on orders over $100
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-cyan-400" />
                                    Express delivery available
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-purple-400" />
                                    30-day return policy
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="heading-md text-white">Related Products</h2>
                            <Link
                                href={`/products?category=${product.category}`}
                                className="text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                View all →
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProducts.map((relatedProduct, index) => (
                                <ProductCard
                                    key={relatedProduct.id}
                                    product={relatedProduct}
                                    index={index}
                                />
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    );
}
