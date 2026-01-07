'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

export const Step3_Memories = ({ photos, darkMode, onNext }: any) => {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);
  const [dir, setDir] = useState(0);

  const paginate = (newDir: number) => {
    setDir(newDir);
    setCurrent((prev) => (prev + newDir + photos.length) % photos.length);
  };

  return (
    <div className="text-center animate-fade-in w-full max-w-sm mx-auto">
      <button onClick={() => setShow(!show)} className={`mb-6 flex items-center gap-2 mx-auto px-6 py-3 rounded-full shadow-lg ${darkMode ? 'bg-white/10 text-pink-200' : 'bg-white text-gray-700'}`}>
        <Camera size={20} /> {show ? 'Hide' : 'View'} Memories
      </button>

      <AnimatePresence mode="wait">
        {show && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className={`${darkMode ? 'bg-white/10' : 'bg-white'} p-4 rounded-[2rem] shadow-2xl mb-8`}>
            <div className="relative aspect-square rounded-2xl overflow-hidden group">
              <AnimatePresence custom={dir} initial={false}>
                <motion.img
                  key={current}
                  src={photos[current].url}
                  custom={dir}
                  initial={{ x: dir > 0 ? 300 : -300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: dir < 0 ? 300 : -300, opacity: 0 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
              <button onClick={() => paginate(-1)} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 rounded-full text-white"><ChevronLeft /></button>
              <button onClick={() => paginate(1)} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/20 rounded-full text-white"><ChevronRight /></button>
            </div>
            <p className={`mt-4 text-xl ${darkMode ? 'text-white' : 'text-gray-700'}`}>{photos[current].caption}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={onNext} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full font-bold shadow-lg transition hover:scale-105">Show me more! ✨</button>
    </div>
  );
};