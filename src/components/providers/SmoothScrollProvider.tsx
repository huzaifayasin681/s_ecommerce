'use client';

import { useEffect, ReactNode, createContext, useContext, useState } from 'react';
import Lenis from '@studio-freight/lenis';

interface SmoothScrollContextType {
    lenis: Lenis | null;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null });

export const useSmoothScroll = () => useContext(SmoothScrollContext);

interface SmoothScrollProviderProps {
    children: ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
    const [lenis, setLenis] = useState<Lenis | null>(null);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return; // Skip smooth scroll for accessibility
        }

        // Check if mobile - use native scroll on mobile for better performance
        const isMobile = window.innerWidth < 768;

        const lenisInstance = new Lenis({
            duration: isMobile ? 0.8 : 1.2,
            easing: (t) => {
                // Custom easing for buttery smooth feel
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            },
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: isMobile ? 1 : 1.2,
            touchMultiplier: 2,
            infinite: false,
            lerp: 0.1, // Smoothness factor
        });

        setLenis(lenisInstance);

        // RAF loop
        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        // Handle anchor links
        const handleAnchorClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a[href^="#"]');
            if (anchor) {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                if (href) {
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        lenisInstance.scrollTo(targetElement as HTMLElement, {
                            offset: -100,
                            duration: 1.5,
                        });
                    }
                }
            }
        };

        document.addEventListener('click', handleAnchorClick);

        return () => {
            cancelAnimationFrame(rafId);
            document.removeEventListener('click', handleAnchorClick);
            lenisInstance.destroy();
        };
    }, []);

    return (
        <SmoothScrollContext.Provider value={{ lenis }}>
            {children}
        </SmoothScrollContext.Provider>
    );
}
