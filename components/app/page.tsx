'use client';
import React, { useState, useEffect, useRef } from 'react';
import { BackgroundEffects } from '@/components/birthday/BackgroundEffects';
import { Navigation } from '@/components/birthday/Navigation';
import { Modals } from '@/components/birthday/Modals';
import { Step0_Welcome, Step1_Compliments, Step2_BuildUp, Step4_Final } from '@/components/birthday/Steps';
import { Step3_Memories } from '@/components/birthday/Step3_Memories';

export default function Home() {
  const [step, setStep] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [birthdayCakeClicks, setBirthdayCakeClicks] = useState(0);
  const [floatingHearts, setFloatingHearts] = useState<any[]>([]);
  const [confetti, setConfetti] = useState<any[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const photos = [
    { url: '/memories/stc2.jpeg', caption: 'Beautiful soul 🌸' },
    { url: '/memories/stc1.jpeg', caption: 'Precious moments 🎀' },
    { url: '/memories/stc4.jpeg', caption: 'Magical you ✨' },
    { url: '/memories/stc3.jpeg', caption: 'Cherished always 💝' },
    { url: '/memories/stc5.jpeg', caption: 'Fun times 🥳' }
  ];

  const compliments = [
    "💕 Have the best birthday today and remember you light up every room you walk in. 💕",
    "💕 You are a queen by design, hold that crown high love 💕",
    "💕 May this year bring prosperity, wisdom, and happiness 💕",
    "💕 Thank you for having me in your life 💕"
  ];

  // Logic Handlers
  const triggerFireworks = () => {
    setShowFireworks(true);
    setConfetti(Array.from({ length: 50 }, (_, i) => ({
      id: i, left: Math.random() * 100, delay: Math.random() * 1.5, color: ['#FFB6C1', '#DDA0DD', '#FF69B4', '#FFD700'][Math.floor(Math.random() * 4)]
    })));
    setTimeout(() => setShowFireworks(false), 5000);
  };

  const handleCakeClick = () => {
    const next = birthdayCakeClicks + 1;
    setBirthdayCakeClicks(next);
    if (next === 7) { setKonamiUnlocked(true); triggerFireworks(); setBirthdayCakeClicks(0); }
  };

  // Music Effect
  useEffect(() => {
    if (musicOn && !audioRef.current) {
      audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3');
      audioRef.current.loop = true;
      audioRef.current.play().catch(() => {});
    } else if (!musicOn && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  }, [musicOn]);

  
  return (
    <div className={`h-screen w-full transition-all duration-1000 relative overflow-hidden flex flex-col ${darkMode ? 'bg-indigo-950' : 'bg-pink-50'}`}>
      <BackgroundEffects darkMode={darkMode} floatingHearts={floatingHearts} confetti={confetti} showFireworks={showFireworks} />
      
      <Navigation 
        step={step} 
        darkMode={darkMode} 
        musicOn={musicOn} 
        setMusicOn={setMusicOn} 
        setDarkMode={setDarkMode} 
        goBack={() => setStep(step - 1)}
        onInstall={() => alert('Add to Home Screen')} 
      />

      <main className="flex-1 flex items-center justify-center p-6 z-10">
        <div className="max-w-md w-full max-h-[85vh] overflow-y-auto no-scrollbar">
          {step === 0 && <Step0_Welcome darkMode={darkMode} onNext={() => setStep(1)} onNameClick={() => {}} />}
          {step === 1 && <Step1_Compliments compliments={compliments} darkMode={darkMode} onNext={() => setStep(2)} />}
          {step === 2 && <Step2_BuildUp darkMode={darkMode} onNext={() => setStep(3)} onCakeClick={handleCakeClick} cakeClicks={birthdayCakeClicks} />}
          {step === 3 && <Step3_Memories photos={photos} darkMode={darkMode} onNext={() => setStep(4)} />}
          {step === 4 && <Step4_Final darkMode={darkMode} onReset={() => setStep(0)} onEasterEggClick={() => setEasterEggFound(true)} easterEggFound={easterEggFound} />}
        </div>
      </main>

      <Modals darkMode={darkMode} easterEggFound={easterEggFound} setEasterEggFound={setEasterEggFound} konamiUnlocked={konamiUnlocked} setKonamiUnlocked={setKonamiUnlocked} />
    </div>
  );
}