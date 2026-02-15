import React from 'react';
import { motion } from 'framer-motion';

const ZenSpace: React.FC = () => {
    return (
        <div className="fixed inset-0 z-neg-10 overflow-hidden bg-[#050505]">
            {/* Only Background environment elements here */}
            {/* Dynamic Lighting Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-gold-900/10 blur-[150px] rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)' }} />

            {/* Floating Particles */}
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: Math.random() * 100 + '%',
                        y: Math.random() * 100 + '%',
                        opacity: 0
                    }}
                    animate={{
                        y: [null, '-=150', '+=150'],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 10 + Math.random() * 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0"
                    style={{ filter: 'blur(1.5px)', left: Math.random() * 100 + '%' }}
                />
            ))}

            {/* Ground Shadow */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent" />
        </div>
    );
};

export default ZenSpace;
