'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, Star, Music, Moon, Send, Camera, ArrowLeft, Gift, Cake, PartyPopper } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function Home() {
  const [step, setStep] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const [showPhotos, setShowPhotos] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [easterEggFound, setEasterEggFound] = useState(false);
  const [secretClicks, setSecretClicks] = useState(0);
  const [konamiCode, setKonamiCode] = useState<string[]>([]);
  const [konamiUnlocked, setKonamiUnlocked] = useState(false);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<Array<{id: number, left: number, delay: number, emoji: string}>>([]);
  const [confetti, setConfetti] = useState<Array<{id: number, left: number, delay: number, color: string}>>([]);
  const [showHints, setShowHints] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [birthdayCakeClicks, setBirthdayCakeClicks] = useState(0);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  const photos = [
  { url: '/memories/stc2.jpeg', caption: 'Beautiful soul 🌸' },
  { url: '/memories/stc1.jpeg', caption: 'Precious moments 🎀' },
  { url: '/memories/stc4.jpeg', caption: 'Magical you ✨' },
  { url: '/memories/stc3.jpeg', caption: 'Cherished always 💝' }
];

const handleBirthdayCakeClick = () => {
    const newClicks = birthdayCakeClicks + 1;
    setBirthdayCakeClicks(newClicks);
    
    // Unlock after 7 clicks on the birthday cake emoji
    if (newClicks === 7) {
      setKonamiUnlocked(true);
      triggerFireworks();
      setBirthdayCakeClicks(0); // Reset
    }
  };

const downloadCard = async () => {
  if (cardRef.current) {
    const canvas = await html2canvas(cardRef.current, {
      backgroundColor: darkMode ? '#1e1b4b' : '#fff5f7',
      scale: 2 // Makes the image crisp
    });
    const link = document.createElement('a');
    link.download = 'Stacys-Birthday-Card.png';
    link.href = canvas.toDataURL();
    link.click();
  }
};

  const compliments = [
    "💕 Have the best birthday today and remember you light up every room you walk in. You are a queen by design, hold that crown high love💕",
    "💕 Being a year older can be exciting or scary, but I trust that yours will bring prosperity, wisdom, happiness and everything you desire 💕",
    "💕 Don't ever forget to let that inner child win sometimes no matter how old you grow 💕",
    "💕 Spend the coming days chasing happiness and may happiness find you, add fulfillment to that list too 💕",
    "💕 Thank you for having me in the previous year and as you turn a year older, I hope I'll still be around 💕",
    "💕 Ace the challenges ahead of you with the true Stacy grace and elegance and may you forever be victorious 💕 ",
    "💕 Cheers to a new year filled with love, wins, and beautiful surprises. 💕",
    "💕 You deserve every good thing this new year brings💕",
  ];

  // Easter egg sequence: click Stacy's name 5 times
  const handleNameClick = () => {
    const newClicks = secretClicks + 1;
    setSecretClicks(newClicks);
    if (newClicks === 5) {
      setKonamiUnlocked(true);
      setSecretClicks(0);
    }
  };

  // Konami code easter egg (↑↑↓↓←→←→BA)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key;
      const newCode = [...konamiCode, key].slice(-10);
      setKonamiCode(newCode);
      
      const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
      const codeString = newCode.join(',');
      const konamiString = konamiSequence.join(',');
      
      if (codeString === konamiString) {
        setKonamiUnlocked(true);
        triggerFireworks();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiCode]);

  // PWA Install prompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Provide helpful instructions for different browsers
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      
      if (isIOS && isSafari) {
        alert('💕 To install this birthday card on iOS:\n\n1. Tap the Share button (square with arrow)\n2. Scroll down and tap "Add to Home Screen"\n3. Tap "Add" in the top right');
      } else if (isIOS) {
        alert('💕 To install this birthday card:\n\nPlease open this page in Safari, then:\n1. Tap the Share button\n2. Tap "Add to Home Screen"');
      } else {
        alert('💕 To install this birthday card:\n\n1. Tap the menu (⋮ or ⋯)\n2. Tap "Install app" or "Add to Home Screen"\n3. Confirm the installation');
      }
      return;
    }
    
    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        setShowInstallPrompt(false);
        // Show success message
        setTimeout(() => {
          alert('🎉 Birthday card installed! You can now access it from your home screen! 💕');
        }, 500);
      }
      
      setDeferredPrompt(null);
    } catch (error) {
      console.error('Install error:', error);
      alert('💕 Having trouble installing? Try using your browser\'s menu to add this page to your home screen!');
    }
  };

  // Music control with better error handling
  useEffect(() => {
    if (musicOn && !audioRef.current) {
      // Using a reliable royalty-free music source
      audioRef.current = new Audio('https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      
      // Better play handling
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.log('Audio autoplay prevented. User interaction needed:', e);
          // Retry on next user interaction
          const retry = () => {
            if (audioRef.current && musicOn) {
              audioRef.current.play().catch(() => {});
            }
            document.removeEventListener('click', retry);
          };
          document.addEventListener('click', retry);
        });
      }
    } else if (!musicOn && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicOn]);

  useEffect(() => {
    if (step === 4) {
      triggerFireworks();
    }
  }, [step]);

  useEffect(() => {
    // Start floating emojis immediately and keep them going
    const interval = setInterval(() => {
      addFloatingHeart();
    }, 800);
    
    return () => clearInterval(interval);
  }, [step]);

  const addFloatingHeart = () => {
    const emojis = ['💖', '🎂', '🎈', '🥳',];
    const heart = {
      id: Math.random(), // Use random for better keying
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      size: Math.random() * (40 - 20) + 20, // Random size between 20px and 40px
      duration: Math.random() * (6 - 3) + 3 // Random speed between 3s and 6s
    };
    setFloatingHearts(prev => [...prev.slice(-50), heart]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== heart.id));
    }, 4000);
  };

  const triggerFireworks = () => {
    setShowFireworks(true);
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 1.5,
      size: Math.random() * (12 - 6) + 6,
      color: [
      '#FFB6C1',
      '#DDA0DD',
      '#FFE4E1',
      '#F0E68C', 
      '#FF69B4',
      '#BA55D3',
      '#87CEEB',
      '#98FB98', 
      '#FFD700',
      '#F08080', 
      '#E6E6FA'][Math.floor(Math.random() * 11)]
    }));
    setConfetti(newConfetti);
    setTimeout(() => setShowFireworks(false), 5000);
  };

  const replayFireworks = () => {
    triggerFireworks();
  };

  const checkEasterEgg = () => {
    if (!easterEggFound) {
      setEasterEggFound(true);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const bgClass = darkMode 
    ? 'bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950' 
    : 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50';

  return (
    <div className={`h-screen w-full ${bgClass} transition-all duration-1000 relative overflow-hidden flex flex-col`}>
      {/* Floating Hearts */}
      {floatingHearts.map(heart => (
        <div
          key={heart.id}
          className="absolute text-3xl pointer-events-none animate-float-up"
          style={{
            left: `${heart.left}%`,
            bottom: '-50px',
            animationDelay: `${heart.delay}s`,
            // Add a slight random rotation so they don't all look perfectly upright
            transform: `rotate(${Math.random() * 40 - 20}deg)` 
          }}
        >
          {heart.emoji}
        </div>
      ))}

      {/* Confetti */}
      {showFireworks && confetti.map(c => (
        <div
          key={c.id}
          className="fixed w-3 h-3 rounded-full animate-confetti pointer-events-none" 
          style={{
            left: `${c.left}%`,
            top: '-20px',
            backgroundColor: c.color,
            animationDelay: `${c.delay}s`,
            zIndex: 9999, // High z-index to stay in front of everything
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Optional: makes them pop more
          }}
        />
      ))}

      {/* Stars for dark mode */}
      {darkMode && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-200 animate-pulse"
              size={3 + Math.random() * 3}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Controls */}
      <div className="sticky top-0 right-0 flex justify-end gap-2 p-4 z-[70] cursor-pointer">
          <button
            onClick={handleInstallClick}
            className={`p-3 ${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} rounded-2xl shadow-lg hover:scale-110 transition`}
            aria-label="Install app"
          >
            <Gift size={20} className={darkMode ? 'text-pink-300' : 'text-purple-500'} />
          </button>
          
          <button
            onClick={() => setMusicOn(!musicOn)}
            className={`p-3 ${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} rounded-2xl shadow-lg hover:scale-110 transition`}
          >
            <Music size={20} className={musicOn ? 'text-pink-400 animate-pulse' : darkMode ? 'text-gray-300' : 'text-gray-400'} />
          </button>
          
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 ${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} rounded-2xl shadow-lg hover:scale-110 transition`}
          >
            <Moon size={20} className={darkMode ? 'text-purple-300' : 'text-gray-400'} />
          </button>
      </div>

      {/* Back Button */}
      {step > 0 && step < 4 && (
        <button
          onClick={goBack}
          className={`absolute top-4 left-4 p-3 ${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} rounded-2xl shadow-lg hover:scale-110 transition z-[70] flex items-center gap-2`}
        >
          <ArrowLeft size={20} className={darkMode ? 'text-pink-300' : 'text-pink-500'} />
        </button>
      )}

      {/* PWA Install Prompt */}
      {showInstallPrompt && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl flex items-center gap-3 max-w-sm">
            <Gift className="text-pink-500" size={24} />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">Install Birthday Card</p>
              <p className="text-xs text-gray-600">Save to your home screen</p>
            </div>
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-sm hover:scale-105 transition"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstallPrompt(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Hidden Easter Egg - Click the heart */}
      {/* 1. The Trigger Icon (Bottom Left Heart) */}
      {step >= 4 && (
        <div 
          onClick={checkEasterEgg}
          className="fixed bottom-6 left-6 z-40 cursor-pointer hover:scale-125 transition-transform duration-300"
        >
          <div className="relative">
            <Heart 
              size={32} 
              className={easterEggFound ? 'text-red-500 fill-red-500 animate-pulse' : 'text-pink-300/60'} 
            />
            {!easterEggFound && (
               <span className="absolute -top-1 -right-1 flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
               </span>
            )}
          </div>
        </div>
      )}

      {/* 2. Standard Secret Message Modal (The Heart Trigger) */}
      {easterEggFound && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/40 backdrop-blur-md p-6 animate-fade-in">
          <div className={`${darkMode ? 'bg-gray-900 border border-pink-500/30' : 'bg-white'} p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full transform transition-all`}>
            <div className="text-center">
              <div className="bg-pink-100 dark:bg-pink-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-pink-500 fill-pink-500" size={32} />
              </div>
              <h3 className="text-xl font-bold text-pink-600 dark:text-pink-400 mb-4">A Side note ...</h3>
              <p className={`text-lg leading-relaxed italic ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                "Stacy, Pass my regards to your big heart and explicitly mention that 
                I will never wish not to be in it. 💕"
              </p>
              <button 
                onClick={() => setEasterEggFound(false)}
                className="mt-8 w-full bg-gradient-to-r from-pink-400 to-rose-500 text-white py-4 rounded-2xl font-bold shadow-lg active:scale-95 transition"
              >
                Keep it safe 💕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Ultimate Secret Message Modal (The Touch Sequence Trigger) */}
      {konamiUnlocked && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] bg-black/60 backdrop-blur-lg p-6 animate-fade-in">
          <div className={`${darkMode ? 'bg-indigo-950 border border-purple-400/30' : 'bg-white'} p-8 rounded-[2.5rem] shadow-2xl max-w-sm w-full relative overflow-hidden`}>
            {/* Decorative background sparkle */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Sparkles size={100} className="text-purple-400" />
            </div>

            <div className="text-center relative z-10">
              <PartyPopper className="mx-auto text-purple-500 mb-4 animate-bounce" size={56} />
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 mb-4">
                Birthday Wish...!
              </h3>
              <div className="space-y-4">
                <p className={`text-base leading-relaxed font-medium ${darkMode ? 'text-purple-100' : 'text-gray-800'}`}>
                  "You have constantly showed me what a life partner should look like
                  and you are the life partner I wish for."
                </p>
                <p className="text-pink-500 font-bold text-lg">
                  May your birthday give us the gift of a healthy relationship 💝
                </p>
              </div>
              <button 
                onClick={() => setKonamiUnlocked(false)}
                className="mt-8 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition"
              >
                Close 
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden Easter Egg - Click cake icon 7 times */}
      {step >= 2 && (
        <div 
          onClick={handleBirthdayCakeClick}
          className="absolute top-4 left-1/2 transform -translate-x-1/2 cursor-pointer hover:scale-110 transition z-[70]"
        >
          <div className="relative">
            <Cake size={24} className={birthdayCakeClicks > 0 ? 'text-pink-500 animate-bounce' : 'text-pink-300/50'} />
            {birthdayCakeClicks > 0 && birthdayCakeClicks < 7 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {birthdayCakeClicks}
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
        <div className="max-w-md w-full max-h-[80vh] overflow-y-auto px-4 no-scrollbar">
          
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8 animate-fade-in">
                <span className="text-8xl">🎀</span>
              </div>
              <h1 
                onClick={handleNameClick}
                className={`text-5xl font-bold mb-4 ${darkMode ? 'text-pink-200' : 'bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent'} animate-pulse cursor-pointer`}
              >
                Hey Stacy 💕
              </h1>
              <p className={`text-xl ${darkMode ? 'text-purple-100' : 'text-gray-700'} mb-8`}>
                You are loved on this side... explore something special made just for you! (because you are special 😊)
              </p>
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform"
              >
                Tap to start your birthday magic ✨
              </button>
              <p className={`mt-6 text-xs ${darkMode ? 'text-purple-200' : 'text-gray-500'} italic`}>
                Hint: Try clicking on "Stacy" 5 times... 👀
              </p>
            </div>
          )}

          {/* Step 1: Compliments */}
          {step === 1 && (
            <div className="space-y-6 my-10 animate-fade-in pb-8">
              <h2 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-pink-200' : 'text-pink-600'}`}>
                A few thoughts 💖
              </h2>
              {compliments.map((compliment, i) => (
                <div
                  key={i}
                  className={`${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} p-6 rounded-3xl shadow-lg animate-slide-in`}
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  <p className={`text-lg ${darkMode ? 'text-pink-50' : 'text-gray-800'} text-center`}>
                    {compliment}
                  </p>
                </div>
              ))}
              <button
                onClick={() => {
                  console.log('Button clicked!');
                  setStep(2);
                }}
                className="w-full px-8 py-4 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform mt-8 cursor-pointer active:scale-95"
              >
                There's more 💖
              </button>
            </div>
          )}

          {/* Step 2: Build-up */}
          {step === 2 && (
            <div className="text-center animate-fade-in">
              <div className="mb-8 flex justify-center">
                <Sparkles className={darkMode ? 'text-yellow-300 animate-spin-slow' : 'text-yellow-400 animate-spin-slow'} size={64} />
              </div>
              <h2 className={`text-3xl font-bold mb-8 ${darkMode ? 'text-purple-200' : 'text-purple-600'}`}>
                Get ready for something special...
              </h2>
              <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Heart
                    key={i}
                    className={`${darkMode ? 'text-pink-300 fill-pink-300' : 'text-pink-400 fill-pink-400'} animate-pulse`}
                    size={32}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
              <button
                onClick={() => setStep(3)}
                className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform"
              >
                Ready? 🎂
              </button>
              <p className={`mt-6 text-xs ${darkMode ? 'text-purple-200' : 'text-gray-500'} italic`}>
                Hint: Try clicking the birthday cake 🎂 at the top... 7 times! 🎉
              </p>
            </div>
          )}
          {/* Step 3: Photo memories */}
          {step === 3 && (
            <div className="text-center animate-fade-in">
              <button
                onClick={() => setShowPhotos(!showPhotos)}
                className={`mb-6 flex items-center gap-2 mx-auto px-6 py-3 ${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20 text-pink-200' : 'bg-white/90 backdrop-blur-md text-gray-700'} rounded-full shadow-lg hover:scale-105 transition`}
              >
                <Camera size={20} /> View Memories
              </button>

              {showPhotos && (
                <div className={`${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} p-6 rounded-3xl mb-8 animate-slide-in`}>
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100 shadow-inner">
                    <img 
                      src={photos[currentPhoto].url} 
                      alt={photos[currentPhoto].caption} 
                      className="w-full h-full object-cover transition-opacity duration-500"
                      onError={(e) => {
                        // Fallback if image fails to load
                        e.currentTarget.src = "https://via.placeholder.com/400?text=Memory+Photo";
                      }}
                    />
                  </div>
                  <p className={`text-xl ${darkMode ? 'text-purple-100' : 'text-gray-700'} mb-4`}>
                    {photos[currentPhoto].caption}
                  </p>
                  <div className="flex justify-center gap-2">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPhoto(i)}
                        className={`w-3 h-3 rounded-full transition ${
                          i === currentPhoto 
                            ? darkMode ? 'bg-pink-300 w-8' : 'bg-pink-500 w-8'
                            : darkMode ? 'bg-gray-400' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(4)}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform animate-pulse"
              >
                Show me more! ✨
              </button>
            </div>
          )}

          {/* Step 4: Main Message */}
          {step === 4 && (
            <div className="text-center animate-fade-in">
              <div className={`${darkMode ? 'bg-white/10 backdrop-blur-md border border-white/20' : 'bg-white/90 backdrop-blur-md'} p-8 rounded-3xl shadow-2xl mb-6`}>
                <h1 className={`text-4xl font-bold mb-6 ${darkMode ? 'text-pink-200' : 'bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent'}`}>
                  Happy Birthday Stacy 🎉💖
                </h1>
                <div className={`space-y-4 text-lg ${darkMode ? 'text-purple-100' : 'text-gray-700'}`}>
                  <p className="leading-relaxed">
                    You light up every room you enter ✨
                  </p>
                  <p className="leading-relaxed">
                    Your smile makes everything better 💕
                  </p>
                  <p className={`leading-relaxed font-semibold ${darkMode ? 'text-pink-200' : 'text-pink-600'}`}>
                    You're genuinely one of a kind 🎀
                  </p>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  <span className="text-4xl animate-pulse">💗</span>
                  <span className="text-4xl animate-pulse" style={{ animationDelay: '0.3s' }}>💗</span>
                  <span className="text-4xl animate-pulse" style={{ animationDelay: '0.6s' }}>💗</span>
                </div>
              </div>

              <button
                onClick={() => setStep(0)}
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition transform flex items-center gap-2 mx-auto mb-4"
              >
                Start Over 
              </button>

              <p className={`mt-4 text-sm ${darkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                Hint: Look for hidden surprises... 💝
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}