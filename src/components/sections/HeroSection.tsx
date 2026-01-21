'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

// Lazy load the 3D scene for better initial performance
const Hero3DScene = lazy(() => import('@/components/3d/Hero3DScene'));

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: 'easeOut',
        },
    },
};

const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
};

// Simple gradient fallback while 3D loads
function HeroFallback() {
    return (
        <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-black to-black" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-500/20 blur-3xl animate-pulse" />
        </div>
    );
}

export default function HeroSection() {
    const [show3D, setShow3D] = useState(false);

    useEffect(() => {
        // Delay 3D loading to prioritize content
        const timer = setTimeout(() => setShow3D(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* 3D Background - Lazy loaded */}
            {show3D ? (
                <Suspense fallback={<HeroFallback />}>
                    <Hero3DScene />
                </Suspense>
            ) : (
                <HeroFallback />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-8"
                >
                    {/* Badge */}
                    <motion.div variants={badgeVariants}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 text-sm">
                            <Sparkles className="w-4 h-4 text-pink-400" />
                            <span className="text-pink-300">New Bridal Collection 2026</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="heading-xl">
                        <span className="block text-white">Elegance</span>
                        <span className="block text-gradient">Handcrafted for You</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Discover exquisite handcrafted lehengas that make your special day truly unforgettable.
                        <br className="hidden md:block" />
                        Where tradition meets modern luxury.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
                    >
                        <Link href="/products">
                            <MagneticButton
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/25 transition-shadow"
                                strength={0.15}
                            >
                                View Collection
                            </MagneticButton>
                        </Link>
                        <Link href="/about">
                            <MagneticButton
                                className="px-8 py-4 rounded-2xl glass border border-white/20 text-white font-medium text-lg hover:bg-white/10 transition-colors"
                                strength={0.15}
                            >
                                Our Story
                            </MagneticButton>
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.6 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2 text-gray-500"
                    >
                        <span className="text-sm">Scroll to explore</span>
                        <ArrowDown className="w-5 h-5" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Static Side Decorations with fade-in */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute left-10 top-1/3 w-64 h-64 rounded-full bg-pink-500/10 blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute right-10 bottom-1/4 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"
            />
        </section>
    );
}
