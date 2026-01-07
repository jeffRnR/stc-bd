'use client';
import { Music, Moon, Gift, ArrowLeft } from 'lucide-react';

interface NavProps {
  step: number;
  darkMode: boolean;
  musicOn: boolean;
  setMusicOn: (val: boolean) => void;
  setDarkMode: (val: boolean) => void;
  onInstall: () => void;
  goBack: () => void;
}

export const Navigation = ({ step, darkMode, musicOn, setMusicOn, setDarkMode, onInstall, goBack }: NavProps) => (
  <>
    <div className="sticky top-0 right-0 flex justify-end gap-2 p-4 z-[70]">
      <button onClick={onInstall} className={`p-3 rounded-2xl shadow-lg transition hover:scale-110 ${darkMode ? 'bg-white/10 border border-white/20 text-pink-300' : 'bg-white/90 text-purple-500'}`}>
        <Gift size={20} />
      </button>
      <button onClick={() => setMusicOn(!musicOn)} className={`p-3 rounded-2xl shadow-lg transition hover:scale-110 ${darkMode ? 'bg-white/10 border border-white/20' : 'bg-white/90'}`}>
        <Music size={20} className={musicOn ? 'text-pink-400 animate-pulse' : 'text-gray-400'} />
      </button>
      <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-2xl shadow-lg transition hover:scale-110 ${darkMode ? 'bg-white/10 border border-white/20' : 'bg-white/90'}`}>
        <Moon size={20} className={darkMode ? 'text-purple-300' : 'text-gray-400'} />
      </button>
    </div>

    {step > 0 && step < 4 && (
      <button onClick={goBack} className={`absolute top-4 left-4 p-3 rounded-2xl shadow-lg z-[70] transition hover:scale-110 ${darkMode ? 'bg-white/10 border border-white/20 text-pink-300' : 'bg-white/90 text-pink-500'}`}>
        <ArrowLeft size={20} />
      </button>
    )}
  </>
);