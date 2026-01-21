'use client';

import { motion } from 'framer-motion';
import { Scissors, Crown, Users, Sparkles, Heart, Star, Award } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import Link from 'next/link';

const stats = [
    { value: '500+', label: 'Happy Brides' },
    { value: '50+', label: 'Design Styles' },
    { value: '100%', label: 'Handcrafted' },
    { value: '24/7', label: 'Design Support' },
];

const values = [
    {
        icon: Sparkles,
        title: 'Craftsmanship',
        description: 'Every stitch tells a story. Our artisans pour their heart into creating intricate embroidery.',
    },
    {
        icon: Heart,
        title: 'Customization',
        description: 'Your wedding, your way. We tailor every detail to match your unique vision.',
    },
    {
        icon: Users,
        title: 'Heritage',
        description: 'Preserving age-old techniques while embracing modern bridal aesthetics.',
    },
    {
        icon: Star,
        title: 'Quality',
        description: 'Only the finest premium fabrics and embellishments make it to your lehenga.',
    },
];

const timeline = [
    {
        year: '2021',
        title: 'The Beginning',
        description: 'Shoaib started as a small boutique with a passion for reviving traditional embroidery.',
    },
    {
        year: '2022',
        title: 'First Bridal Collection',
        description: 'Launched our signature bridal line, receiving overwhelming love from local brides.',
    },
    {
        year: '2023',
        title: 'Going Digital',
        description: 'Expanded our reach online, helping brides from all over design their dream outfits.',
    },
    {
        year: '2024',
        title: 'Global Presence',
        description: 'Now shipping customized handmade lehengas to brides worldwide.',
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 md:pt-32 pb-12 md:pb-20">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
                    animate={{ scale: [1.2, 1, 1.2] }}
                    transition={{ duration: 12, repeat: Infinity }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-pink-500/30 text-sm mb-6"
                    >
                        <Crown className="w-4 h-4 text-pink-400" />
                        <span className="text-pink-300">Our Heritage</span>
                    </motion.div>

                    <h1 className="heading-xl mb-6">
                        <span className="text-white">Weaving </span>
                        <span className="text-gradient">Dreams</span>
                        <span className="text-white"> into Reality</span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Shoaib was born from a simple belief: every bride deserves to look like royalty.
                        We combine traditional artistry with contemporary designs to create heirlooms for your special day.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 text-center"
                        >
                            <motion.div
                                className="text-4xl font-bold text-gradient mb-2"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 + 0.2 }}
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-gray-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="glass-card p-8 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-pink-500/10 blur-2xl"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 6, repeat: Infinity }}
                        />
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center mb-6">
                                <Scissors className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4 text-white">Our Craft</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To revive the lost art of hand embroidery and bring it to modern brides.
                                We believe in slow fashion, where every piece is made with patience, love, and precision.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card p-8 relative overflow-hidden"
                    >
                        <motion.div
                            className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"
                            animate={{ scale: [1.2, 1, 1.2] }}
                            transition={{ duration: 8, repeat: Infinity }}
                        />
                        <div className="relative z-10">
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mb-6">
                                <Crown className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-4 text-white">Our Promise</h2>
                            <p className="text-gray-400 leading-relaxed">
                                To make you the center of attention. We promise not just a dress, but an
                                experience that honors the significance of your wedding day.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Values */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="heading-lg mb-4">
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Values</span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            The principles that guide every stitch at Shoaib.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-card p-6 text-center group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 flex items-center justify-center mx-auto mb-4 group-hover:from-pink-500/30 group-hover:to-purple-500/30 transition-all"
                                >
                                    <value.icon className="w-8 h-8 text-pink-400" />
                                </motion.div>
                                <h3 className="text-lg font-semibold mb-2 text-white">{value.title}</h3>
                                <p className="text-gray-400 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-12">
                        <h2 className="heading-lg mb-4">
                            <span className="text-white">Our </span>
                            <span className="text-gradient">Journey</span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* Line */}
                        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-pink-500 via-purple-500 to-pink-500 hidden md:block" />

                        <div className="space-y-12">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    <div className="flex-1 text-center md:text-right">
                                        {index % 2 === 0 && (
                                            <div className="glass-card p-6">
                                                <div className="text-pink-400 font-bold text-xl mb-2">
                                                    {item.year}
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                                                <p className="text-gray-400 text-sm">{item.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Dot */}
                                    <motion.div
                                        whileHover={{ scale: 1.3 }}
                                        className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex-shrink-0 hidden md:block z-10"
                                    />

                                    <div className="flex-1 text-center md:text-left">
                                        {index % 2 !== 0 && (
                                            <div className="glass-card p-6">
                                                <div className="text-purple-400 font-bold text-xl mb-2">
                                                    {item.year}
                                                </div>
                                                <h3 className="text-lg font-semibold mb-2 text-white">{item.title}</h3>
                                                <p className="text-gray-400 text-sm">{item.description}</p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center glass-card p-12 relative overflow-hidden"
                >
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                    />
                    <div className="relative z-10">
                        <Award className="w-16 h-16 text-pink-400 mx-auto mb-6" />
                        <h2 className="heading-md mb-4 text-white">Find Your Perfect Lehenga</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                            Let us create a masterpiece that celebrates you.
                        </p>
                        <Link href="/products">
                            <MagneticButton
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg hover:shadow-2xl hover:shadow-pink-500/25 transition-all"
                                strength={0.2}
                            >
                                Explore Bridal Collection
                            </MagneticButton>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
