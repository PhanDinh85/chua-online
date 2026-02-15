import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IncenseStick: React.FC = () => {
  const [isLit, setIsLit] = useState(false);
  const [particles, setParticles] = useState<{ id: number; left: string }[]>([]);

  useEffect(() => {
    if (isLit) {
      const interval = setInterval(() => {
        setParticles((prev) => [
          ...prev.slice(-12),
          { id: Date.now(), left: `${30 + Math.random() * 40}%` }
        ]);
      }, 400);
      return () => clearInterval(interval);
    } else {
      setParticles([]);
    }
  }, [isLit]);

  return (
    <div className="flex flex-col items-center gap-1 group relative z-10">
      <div className="incense-container flex flex-col items-center justify-end h-auto" onClick={() => setIsLit(!isLit)}>
        <div className="relative mb-[-8px] z-10">
          {/* Smoke - Enhanced visibility */}
          <AnimatePresence>
            {particles.map((p) => (
              <motion.div
                key={p.id}
                initial={{ y: 0, opacity: 0, scale: 0.5, x: 0 }}
                animate={{
                  y: -350,
                  opacity: [0, 0.6, 0.4, 0],
                  scale: [0.5, 2, 4, 6],
                  x: [0, (Math.random() - 0.5) * 80, (Math.random() - 0.5) * 150]
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 8, ease: "easeOut" }}
                className="smoke-particle"
                style={{
                  left: p.left,
                  filter: `blur(${Math.random() * 5 + 5}px)`,
                  background: 'radial-gradient(circle, rgba(200, 200, 200, 0.5) 0%, transparent 70%)'
                }}
              />
            ))}
          </AnimatePresence>

          {/* Glow at tip */}
          {isLit && (
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
                boxShadow: ['0 0 10px #ff5722', '0 0 20px #ff5722', '0 0 10px #ff5722']
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute top-0 w-[6px] h-[6px] rounded-full"
              style={{
                left: '0px', top: '-2px',
                background: '#ffab40',
                zIndex: 20
              }}
            />
          )}

          {/* Stick Body */}
          <div className={`incense-stick-body ${isLit ? 'lit' : ''}`}>
            {isLit && (
              <div className="absolute top-0 w-full h-3 bg-orange-600 animate-glow rounded-full opacity-60 blur-[1px]" />
            )}
          </div>
        </div>

        {/* Pot/Base: Fixed large size */}
        <div className="relative flex justify-center z-20">
          <img
            src="/pot.png"
            alt="Lư hương"
            className="w-[120px] md:w-[160px] h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      <div className="text-[9px] md:text-[10px] text-stone-500 font-medium tracking-[0.2em] uppercase transition-colors group-hover:text-stone-300 text-center flex flex-col gap-1 mt-2">
        {isLit ? (
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gold-400/80">
            Tâm niệm bình an
          </motion.span>
        ) : (
          <span>Dâng Nhang</span>
        )}
      </div>
    </div>
  );
};

export default IncenseStick;
