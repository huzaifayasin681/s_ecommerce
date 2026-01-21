'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { initiateQuickCheckout } from '@/lib/whatsapp';
import MagneticButton from './MagneticButton';
import { useEffect, useState } from 'react';

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

// Colors for the cart item icon background
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

export default function CartDrawer() {
    const { items, isOpen, closeCart, updateQuantity, removeItem, getTotalPrice, clearCart } =
        useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleCheckout = () => {
        if (items.length === 0) return;
        const total = getTotalPrice();
        initiateQuickCheckout(items, total);
    };

    // Format price
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-b from-[#1a0f16] to-black border-l border-pink-500/20 z-50 flex flex-col shadow-2xl shadow-pink-900/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-pink-500/10">
                            <h2 className="text-xl font-semibold text-white">Your Selection</h2>
                            <button
                                onClick={closeCart}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <motion.div
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="w-24 h-24 rounded-full bg-pink-500/10 flex items-center justify-center mb-6"
                                    >
                                        <MessageCircle className="w-10 h-10 text-pink-400" />
                                    </motion.div>
                                    <p className="text-gray-400 text-lg">Your bridal bag is empty</p>
                                    <p className="text-sm text-gray-500 mt-2">
                                        Browse our collection to find your dream outfit.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {items.map((item, index) => (
                                        <motion.div
                                            key={item.product.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10"
                                        >
                                            {/* Product Image Replacement (Emoji) */}
                                            <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${getCategoryColor(item.product.category)} flex items-center justify-center overflow-hidden flex-shrink-0`}>
                                                <div className="text-3xl">
                                                    {getCategoryEmoji(item.product.category)}
                                                </div>
                                            </div>

                                            {/* Details */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-medium truncate text-white">{item.product.name}</h3>
                                                <p className="text-pink-400 font-semibold">
                                                    {formatPrice(item.product.price)}
                                                </p>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3 mt-2">
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.quantity - 1)
                                                        }
                                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="font-medium w-8 text-center text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.quantity + 1)
                                                        }
                                                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => removeItem(item.product.id)}
                                                        className="ml-auto p-2 rounded-full hover:bg-red-500/20 text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-pink-500/10 space-y-4 bg-black/20">
                                <div className="flex items-center justify-between text-lg">
                                    <span className="text-gray-400">Total Estimate</span>
                                    <span className="font-bold text-2xl text-white">
                                        {formatPrice(getTotalPrice())}
                                    </span>
                                </div>

                                <MagneticButton
                                    onClick={handleCheckout}
                                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold flex items-center justify-center gap-3 hover:shadow-lg hover:shadow-green-500/25 transition-shadow"
                                    strength={0.1}
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    Order via WhatsApp
                                </MagneticButton>

                                <button
                                    onClick={clearCart}
                                    className="w-full py-3 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-colors text-sm"
                                >
                                    Clear Selection
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
