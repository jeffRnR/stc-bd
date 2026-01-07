'use client';
import { Star } from 'lucide-react';

interface BackgroundProps {
  darkMode: boolean;
  floatingHearts: any[];
  confetti: any[];
  showFireworks: boolean;
}

export const BackgroundEffects = ({ darkMode, floatingHearts, confetti, showFireworks }: BackgroundProps) => (
  <div className="fixed inset-0 pointer-events-none z-0">
    {/* Floating Emojis */}
    {floatingHearts.map(heart => (
      <div
        key={heart.id}
        className="absolute text-3xl animate-float-up"
        style={{
          left: `${heart.left}%`,
          bottom: '-50px',
          animationDelay: `${heart.delay}s`,
          transform: `rotate(${Math.random() * 40 - 20}deg)`
        }}
      >
        {heart.emoji}
      </div>
    ))}

    {/* Confetti Cannon */}
    {showFireworks && confetti.map(c => (
      <div
        key={c.id}
        className="fixed w-3 h-3 rounded-full animate-confetti"
        style={{
          left: `${c.left}%`,
          top: '-20px',
          backgroundColor: c.color,
          animationDelay: `${c.delay}s`,
        }}
      />
    ))}

    {/* Dark Mode Stars */}
    {darkMode && (
      <div className="absolute inset-0">
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
  </div>
);