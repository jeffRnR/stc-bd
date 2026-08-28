'use client';
import React from 'react';
import { Heart, Sparkles, Cake } from 'lucide-react';
import { motion } from 'framer-motion';

// --- STEP 0: WELCOME ---
export const Step0_Welcome = ({ darkMode, onNext, onNameClick }: any) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
    <div className="text-8xl mb-8">🎀</div>
    <h1 onClick={onNameClick} className={`text-5xl font-bold mb-4 cursor-pointer ${darkMode ? 'text-pink-200' : 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'} animate-pulse`}>Hey Stacy 💕</h1>
    <p className={`text-xl mb-8 ${darkMode ? 'text-purple-100' : 'text-gray-700'}`}>You are loved on this side... explore something special made just for you! He misses you and thinks about even when you are continents away (especially when you are continents away)</p>
    <button onClick={onNext} className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition">Tap to start ✨</button>
  </motion.div>
);

// --- STEP 1: COMPLIMENTS ---
export const Step1_Compliments = ({ darkMode, onNext, compliments }: any) => (
  <div className="space-y-6 my-10 animate-fade-in pb-8">
    <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-pink-200' : 'text-pink-600'}`}>A few thoughts 💖</h2>
    {compliments.map((text: string, i: number) => (
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} key={i} className={`${darkMode ? 'bg-white/10 border-white/20' : 'bg-white'} p-6 rounded-3xl shadow-lg border`}>
        <p className={`text-lg text-center ${darkMode ? 'text-pink-50' : 'text-gray-800'}`}>{text}</p>
      </motion.div>
    ))}
    <button onClick={onNext} className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold shadow-lg mt-8 hover:scale-105 transition">There's more 💖</button>
  </div>
);

// --- STEP 2: BUILD-UP ---
export const Step2_BuildUp = ({ darkMode, onNext, onCakeClick, cakeClicks }: any) => (
  <div className="text-center">
    <Sparkles className="mx-auto text-yellow-400 mb-8 animate-spin-slow" size={64} />
    <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>Get ready for something special...</h2>
    <div className="flex justify-center gap-4 mb-8">
      {[...Array(5)].map((_, i) => <Heart key={i} size={32} className="text-pink-400 fill-pink-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
    </div>
    <div onClick={onCakeClick} className="cursor-pointer inline-block p-4 mb-8">
      <Cake size={48} className={cakeClicks > 0 ? 'text-pink-500 animate-bounce' : 'text-pink-300/50'} />
      {cakeClicks > 0 && <p className="text-pink-500 font-bold">{cakeClicks}/7</p>}
    </div>
    <button onClick={onNext} className="block mx-auto px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full font-bold shadow-lg">Ready? 🎂</button>
  </div>
);

// --- STEP 4: FINAL ---
export const Step4_Final = ({ darkMode, onReset, onEasterEggClick, easterEggFound }: any) => (
  <div className="text-center">
    <div className={`${darkMode ? 'bg-white/10' : 'bg-white'} p-8 rounded-3xl shadow-2xl mb-6`}>
      <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-pink-200' : 'bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent'}`}>Happy Birthday Stacy 🎉💖</h1>
      <p className={`text-lg mb-4 ${darkMode ? 'text-purple-100' : 'text-gray-700'}`}>You light up every room you enter. Kiambu misses you✨</p>
      <div className="flex justify-center gap-2 text-4xl"><span className="animate-pulse">💗</span><span className="animate-pulse delay-100">💗</span><span className="animate-pulse delay-200">💗</span></div>
    </div>
    <button onClick={onReset} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold shadow-lg mb-4">Start Over</button>
    <div onClick={onEasterEggClick} className="mt-10 cursor-pointer flex justify-center">
        <Heart size={32} className={easterEggFound ? 'text-red-500 fill-red-500 animate-pulse' : 'text-pink-300/30'} />
    </div>
  </div>
);
