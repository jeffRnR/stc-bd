'use client';
import { Heart, PartyPopper, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Modals = ({ darkMode, easterEggFound, setEasterEggFound, konamiUnlocked, setKonamiUnlocked }: any) => (
  <AnimatePresence>
    {/* Side Note Modal */}
    {easterEggFound && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-md p-6">
        <div className={`${darkMode ? 'bg-gray-900 border-pink-500/30' : 'bg-white'} p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full text-center`}>
          <div className="bg-pink-100 dark:bg-pink-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="text-pink-500 fill-pink-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-pink-600 mb-4">A Side note ...</h3>
          <p className={`italic ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>"Stacy, Pass my regards to your big heart and explicitly mention that I will never wish not to be in it. 💕"</p>
          <button onClick={() => setEasterEggFound(false)} className="mt-8 w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white py-4 rounded-2xl font-bold shadow-lg">Keep it safe 💕</button>
        </div>
      </motion.div>
    )}

    {/* Ultimate Wish Modal */}
    {konamiUnlocked && (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 flex items-center justify-center z-[100] bg-black/60 backdrop-blur-lg p-6">
        <div className={`${darkMode ? 'bg-indigo-950' : 'bg-white'} p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative overflow-hidden text-center`}>
          <PartyPopper className="mx-auto text-purple-500 mb-4 animate-bounce" size={56} />
          <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">Birthday Wish...!</h3>
          <p className={`${darkMode ? 'text-purple-100' : 'text-gray-800'} mb-4`}>"You have constantly showed me what a life partner should look like and you are the life partner I wish for."</p>
          <p className="text-pink-500 font-bold">May your birthday give us the gift of a healthy relationship 💝</p>
          <button onClick={() => setKonamiUnlocked(false)} className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold">Close</button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);