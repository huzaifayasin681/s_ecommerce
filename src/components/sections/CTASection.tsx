'use client';

import { motion, Variants } from 'framer-motion';
import { memo } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';

// Animation variants
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const itemVariants: Variants = {
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

function CTASectionComponent() {
    return (
        <section className="py-16 md:py-24 relative overflow-hidden">
            {/* Static Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-pink-950/20 to-black" />
                <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-pink-500/15 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-500/15 blur-3xl" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30 text-sm mb-8">
                            <MessageCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-300">Book Design Consultation</span>
                        </div>
                    </motion.div>

                    <motion.h2 variants={itemVariants} className="heading-lg mb-6">
                        <span className="text-white">Start Your </span>
                        <span className="text-gradient">Bridal Journey</span>
                    </motion.h2>

                    <motion.p variants={itemVariants} className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Ready to design your dream wedding lehenga? Chat with our stylists directly on WhatsApp for customization, fitting queries, and orders.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link href="/products">
                            <MagneticButton
                                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-pink-500/25 transition-shadow"
                                strength={0.15}
                            >
                                View Collection
                                <ArrowRight className="w-5 h-5" />
                            </MagneticButton>
                        </Link>

                        <a
                            href="https://wa.me/1234567890"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MagneticButton
                                className="px-8 py-4 rounded-2xl bg-green-500 hover:bg-green-600 text-white font-semibold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-green-500/25 transition-all"
                                strength={0.15}
                            >
                                <MessageCircle className="w-5 h-5" />
                                Chat with Designer
                            </MagneticButton>
                        </a>
                    </motion.div>
                </motion.div>

                {/* Static Emojis */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 0.5, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute top-10 left-10 text-5xl"
                >
                    👗
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 0.5, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="absolute bottom-10 right-10 text-5xl"
                >
                    �
                </motion.div>
            </div>
        </section>
    );
}

const CTASection = memo(CTASectionComponent);
CTASection.displayName = 'CTASection';

export default CTASection;
