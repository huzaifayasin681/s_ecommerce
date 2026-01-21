'use client';

import { useRef, useState, MouseEvent, ReactNode, memo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    strength?: number;
    disabled?: boolean;
}

function MagneticButtonComponent({
    children,
    className = '',
    onClick,
    strength = 0.2,
    disabled = false,
}: MagneticButtonProps) {
    const ref = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        if (disabled || !ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * strength, y: middleY * strength });
    }, [disabled, strength]);

    const reset = useCallback(() => {
        setPosition({ x: 0, y: 0 });
    }, []);

    return (
        <motion.button
            ref={ref}
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            onClick={onClick}
            disabled={disabled}
            animate={position}
            transition={{ type: 'spring', stiffness: 300, damping: 20, mass: 0.5 }}
            whileTap={{ scale: 0.97 }}
        >
            {children}
        </motion.button>
    );
}

const MagneticButton = memo(MagneticButtonComponent);
MagneticButton.displayName = 'MagneticButton';

export default MagneticButton;
