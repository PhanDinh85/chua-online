import React, { useRef } from 'react';
import { motion } from 'framer-motion';

import confetti from 'canvas-confetti';

interface Props {
    onAction: (points: number) => void;
}

const BuddhistInstruments: React.FC<Props> = ({ onAction }) => {
    const moAudio = useRef<HTMLAudioElement | null>(null);
    const bellAudio = useRef<HTMLAudioElement | null>(null);

    const playMo = () => {
        if (moAudio.current) {
            moAudio.current.currentTime = 0;
            moAudio.current.play().catch(() => { });
        }
        onAction(1);
    };

    const playBell = () => {
        if (bellAudio.current) {
            bellAudio.current.currentTime = 0;
            bellAudio.current.play().catch(() => { });
        }
        onAction(10);
        confetti({
            particleCount: 50,
            spread: 80,
            origin: { y: 0.7 },
            colors: ['#d4af37', '#ffffff', '#ffd700']
        });
    };

    return (
        <div className="flex gap-4 md:gap-12 items-end justify-center">
            <audio ref={moAudio} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" />
            <audio ref={bellAudio} src="https://www.orangefreesounds.com/wp-content/uploads/2018/03/Meditation-bell-sound.mp3" />

            {/* Bell */}
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: 3 }}
                onClick={playBell}
                className="flex flex-col items-center gap-3 cursor-pointer group"
            >
                <div className="instrument-card relative overflow-hidden p-2">
                    <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                        src="/bell.png"
                        alt="Chuông"
                        className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                    />

                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileTap={{ scale: 2.5, opacity: [0.6, 0] }}
                        className="absolute w-full h-full bg-gold-400/30 rounded-full pointer-events-none"
                    />
                </div>
                <span className="text-[9px] md:text-[10px] text-stone-500 font-medium tracking-[0.2em] uppercase transition-colors group-hover:text-stone-300">
                    Thỉnh Chuông
                </span>
            </motion.div>

            {/* Mo (Wooden Fish) */}
            <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95, y: 3 }}
                onClick={playMo}
                className="flex flex-col items-center gap-3 cursor-pointer group"
            >
                <div className="instrument-card relative overflow-hidden p-2">
                    <div className="absolute inset-0 bg-orange-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <img
                        src="/woodenFish.png"
                        alt="Mõ"
                        className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(139,69,19,0.4)]"
                    />
                </div>
                <span className="text-[9px] md:text-[10px] text-stone-500 font-medium tracking-[0.2em] uppercase transition-colors group-hover:text-stone-300">
                    Gõ Mõ
                </span>
            </motion.div>
        </div>
    );
};

export default BuddhistInstruments;
