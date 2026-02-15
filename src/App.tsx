import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ZenSpace from './components/ZenSpace';
import BuddhistInstruments from './components/BuddhistInstruments';

function App() {
  const [merit, setMerit] = useState(() => {
    const saved = localStorage.getItem('zen_merit');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem('zen_merit', merit.toString());
  }, [merit]);

  const addMerit = (points: number) => {
    setMerit(prev => prev + points);
  };

  const quotes = [
    "Tâm bất biến giữa dòng đời vạn biến.",
    "Bình an đến từ bên trong. Đừng tìm nó bên ngoài.",
    "Hạnh phúc là hành trình, không phải đích đến.",
    "Mỗi bước chân đi trên mặt đất là một phép lạ."
  ];

  return (
    // MAIN CONTAINER: Fixed 100vh/100vw, no scrolling allowed
    <div className="relative h-full w-full overflow-hidden flex flex-col bg-[#050505] touch-none">

      {/* BACKGROUND LAYER: Absolute, does not affect layout flow */}
      <div className="absolute inset-0 z-0">
        <ZenSpace />
      </div>

      {/* CONTENT LAYER: Z-10 to sit above background */}
      <div className="relative z-10 flex flex-col h-full w-full max-w-7xl mx-auto px-4 md:px-8 py-2 overflow-hidden">

        {/* 1. HEADER SECTION: Fixed height (auto), sits at top */}
        <header className="flex justify-between items-center w-full py-2 mx4">
          <div className="flex justify-center items-center flex-col">
            <h1 className=" text-lg md:text-3xl font-serif font-bold tracking-widest uppercase gold-text">
              Chùa Online
            </h1>
          </div>

          <div className="glass px-3 py-1.5 md:px-6 md:py-3 rounded-full flex items-center gap-3 mr-4">
            <div className="flex flex-col items-end">
              <span className="text-[8px] md:text-[10px] text-stone-500 uppercase tracking-widest hidden md:block">
                Công Đức
              </span>
              <motion.span
                key={merit}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-base md:text-xl font-bold font-serif text-white"
              >
                {merit.toLocaleString()}
              </motion.span>
            </div>
          </div>
        </header>

        {/* 2. MAIN BUDDHA SECTION: Flex-8 (80% roughly) */}
        <main className="flex-8 min-h-0 flex flex-col items-center justify-center relative w-full overflow-hidden">

          {/* Quote - Top of Buddha section */}
          <div className="mb-2 text-center w-full max-w-lg flex-none h-6 md:h-10">
            <p className="text-[10px] md:text-sm italic text-stone-400 font-serif opacity-60 px-4">
              "{quotes[Math.floor(Date.now() / 86400000) % quotes.length]}"
            </p>
          </div>

          {/* Buddha Image Container */}
          <div className="flex-1 w-full flex items-center justify-center relative min-h-0 p-4">
            {/* Aura */}
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute w-[40vh] h-[40vh] md:w-[60vh] md:h-[60vh] bg-gold-500/10 rounded-full blur-[60px] md:blur-[100px]"
            />

            {/* Image - Strict constraints with breathing room */}
            <motion.img
              src="/buddha.png"
              alt="Đức Phật"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2 }}
              className="w-auto h-auto max-h-[85%] max-w-full object-contain drop-shadow-[0_0_50px_rgba(212,175,55,0.3)] z-10"
            />
          </div>

          {/* Mantra Title */}
          <div className="mt-2 text-stone-500 tracking-zen uppercase text-[8px] md:text-xs whitespace-nowrap opacity-40 text-center flex-none h-6 md:h-10">
            Nam Mô Bổn Sư Thích Ca Mâu Ni Phật
          </div>

        </main>

        {/* 3. INTERACTION SECTION: Flex-2 (20% roughly) */}
        <div className="flex-2 w-full flex flex-col justify-end pb-safe relative z-20 mt-4">
          {/* Instruments Container */}
          <div className="flex items-end justify-center gap-6 md:gap-16 pb-4 md:pb-8">
            {/* <IncenseStick /> */}
            <BuddhistInstruments onAction={addMerit} />
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;
