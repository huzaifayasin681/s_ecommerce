'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, Instagram, Twitter, Mail, MapPin } from 'lucide-react';

const footerLinks = {
    shop: [
        { label: 'All Collections', href: '/products' },
        { label: 'Bridal Lehengas', href: '/products?category=bridal' },
        { label: 'Reception Gowns', href: '/products?category=reception' },
        { label: 'Sangeet Wear', href: '/products?category=sangeet' },
    ],
    company: [
        { label: 'Our Story', href: '/about' },
        { label: 'Contact Stylist', href: '/contact' },
        { label: 'Size Guide', href: '/size-guide' },
        { label: 'Shipping Policy', href: '/shipping' },
    ],
    social: [
        { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
        { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
        { icon: MessageCircle, href: 'https://wa.me/1234567890', label: 'WhatsApp' },
    ],
};

export default function Footer() {
    return (
        <footer className="relative pt-20 pb-10 overflow-hidden">
            {/* Top Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />

            {/* Background Glow */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-pink-500/10 blur-3xl"
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 6, repeat: Infinity }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <motion.div
                                className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center font-bold text-white text-2xl"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                            >
                                S
                            </motion.div>
                            <span className="text-2xl font-semibold">Shoaib</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            Handcrafting timeless bridal elegance for the modern bride.
                        </p>
                        <div className="flex items-center gap-4">
                            {footerLinks.social.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors"
                                    whileHover={{ scale: 1.1, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white">Collections</h3>
                        <ul className="space-y-4">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white">Support</h3>
                        <ul className="space-y-4">
                            {footerLinks.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold mb-6 text-white">Contact</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="mailto:hello@shoaib.tech"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3"
                                >
                                    <Mail className="w-5 h-5 text-pink-400" />
                                    hello@shoaib.tech
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/1234567890"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-3"
                                >
                                    <MessageCircle className="w-5 h-5 text-green-400" />
                                    WhatsApp Stylist
                                </a>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 text-purple-400" />
                                <span>Shoaib.tech Global</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Shoaib. Handcrafted with ❤️
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">
                            Privacy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
