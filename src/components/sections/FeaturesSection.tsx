'use client';

import { motion, Variants } from 'framer-motion';
import { memo } from 'react';
import { Scissors, ShieldCheck, Truck, Crown } from 'lucide-react';

const features = [
    {
        icon: Scissors,
        title: 'Custom Tailoring',
        description: 'Each lehenga is made to measure, ensuring a perfect fit for your special day.',
        gradient: 'from-pink-500 to-rose-500',
    },
    {
        icon: Crown,
        title: 'Premium Handwork',
        description: 'Intricate zardozi, kundan, and thread work by master artisans.',
        gradient: 'from-purple-500 to-indigo-500',
    },
    {
        icon: Truck,
        title: 'Secure Delivery',
        description: 'Worldwide shipping with premium packaging to bring your dream outfit safely.',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        icon: ShieldCheck,
        title: 'Quality Guarantee',
        description: 'We use only the finest silks, velvets, and embellishments.',
        gradient: 'from-emerald-500 to-teal-500',
    },
];

// Animation variants for scroll reveal
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        },
    },
};

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
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
            duration: 0.7,
            ease: 'easeOut',
        },
    },
};

function FeaturesSectionComponent() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Static Grid Background */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Section Header with scroll animation */}
                <motion.div
                    variants={headerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <h2 className="heading-lg mb-4">
                        <span className="text-white">Why Choose </span>
                        <span className="text-gradient">Shoaib's Bridal</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Crafting memories with threads of elegance. We ensure you look nothing short of royalty.
                    </p>
                </motion.div>

                {/* Features Grid with stagger scroll reveal */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={cardVariants}
                            className="group"
                        >
                            <div className="glass-card p-8 h-full relative overflow-hidden transition-all duration-300 hover:border-pink-500/30 hover:translate-y-[-4px]">
                                {/* Hover Glow */}
                                <div
                                    className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br ${feature.gradient}`}
                                />

                                <div className="relative z-10 flex items-start gap-6">
                                    {/* Icon */}
                                    <div
                                        className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex-shrink-0 transform group-hover:scale-105 transition-transform duration-300`}
                                    >
                                        <feature.icon className="w-6 h-6 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-pink-300 transition-colors">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

const FeaturesSection = memo(FeaturesSectionComponent);
FeaturesSection.displayName = 'FeaturesSection';

export default FeaturesSection;
