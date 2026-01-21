'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Check if device is mobile/low-power
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const isLowPower = typeof window !== 'undefined' && (
    navigator.hardwareConcurrency <= 4 ||
    /Android|iPhone|iPad/i.test(navigator.userAgent)
);

function FloatingObject() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Slower rotation for better performance
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.15;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={meshRef} scale={isMobile ? 1.5 : 2}>
                {/* Lower polygon count for better performance */}
                <icosahedronGeometry args={[1, isMobile ? 2 : 3]} />
                <MeshDistortMaterial
                    color="#7c3aed"
                    attach="material"
                    distort={isMobile ? 0.2 : 0.3}
                    speed={1.5}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>
        </Float>
    );
}

function OrbitingRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * speed;
            ringRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
        }
    });

    return (
        <mesh ref={ringRef}>
            <torusGeometry args={[radius, 0.015, 8, 64]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
        </mesh>
    );
}

function SimpleParticles() {
    const count = isMobile ? 50 : 100;
    const points = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (points.current) {
            points.current.rotation.y = state.clock.elapsedTime * 0.015;
        }
    });

    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial size={0.03} color="#a78bfa" transparent opacity={0.6} />
        </points>
    );
}

function Scene() {
    const { camera } = useThree();

    // Simple camera sway without mouse tracking for performance
    useFrame((state) => {
        camera.position.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
        camera.position.y = Math.cos(state.clock.elapsedTime * 0.15) * 0.2;
        camera.lookAt(0, 0, 0);
    });

    return (
        <>
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} color="#7c3aed" />
            <pointLight position={[-10, -10, -10]} intensity={0.4} color="#06b6d4" />

            <FloatingObject />

            {/* Fewer rings on mobile */}
            <OrbitingRing radius={3} speed={0.2} color="#7c3aed" />
            {!isMobile && <OrbitingRing radius={4} speed={-0.15} color="#06b6d4" />}
            {!isLowPower && <OrbitingRing radius={5} speed={0.08} color="#a78bfa" />}

            <SimpleParticles />
        </>
    );
}

export default function Hero3DScene() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Delay mounting for better initial load
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) {
        return (
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-900/20 to-black" />
        );
    }

    return (
        <div className="absolute inset-0 -z-10">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                dpr={isMobile ? 1 : [1, 1.5]} // Lower DPR for performance
                gl={{
                    antialias: !isMobile,
                    alpha: true,
                    powerPreference: 'high-performance',
                    stencil: false,
                    depth: true,
                }}
                frameloop="always"
                performance={{ min: 0.5 }}
            >
                <color attach="background" args={['#0a0a0f']} />
                <Scene />
            </Canvas>
        </div>
    );
}
