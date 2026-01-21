'use client';

import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';

interface FloatingCardProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    floatIntensity?: number;
}

function FloatingCardComponent({
    children,
    className = '',
    delay = 0,
}: FloatingCardProps) {
    return (
        <motion.div
            className={`relative ${className}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.5,
                delay: delay * 0.05,
                ease: 'easeOut',
            }}
            whileHover={{
                y: -10,
                transition: { duration: 0.3 }
            }}
        >
            {children}
        </motion.div>
    );
}

// Memoize to prevent unnecessary re-renders
const FloatingCard = memo(FloatingCardComponent);
FloatingCard.displayName = 'FloatingCard';

export default FloatingCard;
