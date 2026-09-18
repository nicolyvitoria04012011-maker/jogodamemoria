import React, { useMemo } from 'react';
import { GAME_THEMES } from '../data/themesAndAvatars';
import { ThemeId } from '../types';

interface ThemeBackgroundProps {
  themeId: ThemeId;
}

export const ThemeBackground: React.FC<ThemeBackgroundProps> = ({ themeId }) => {
  const theme = useMemo(() => {
    return GAME_THEMES.find((t) => t.id === themeId) || GAME_THEMES[0];
  }, [themeId]);

  // Generate deterministic floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 19) % 100}%`,
      top: `${(i * 29) % 100}%`,
      size: 6 + (i % 5) * 4,
      duration: 10 + (i % 8) * 3,
      delay: (i % 6) * 1.5,
      opacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <div
      className={`fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br ${theme.bgGradient} transition-colors duration-1000`}
      aria-hidden="true"
    >
      {/* Ambient background glow orbs */}
      <div
        className="absolute top-1/4 left-1/5 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none animate-pulse"
        style={{ backgroundColor: theme.primaryColor }}
      />
      <div
        className="absolute bottom-1/4 right-1/5 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: theme.accentColor }}
      />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.id % 2 === 0 ? theme.accentColor : '#ffffff',
            opacity: p.opacity,
            filter: 'blur(1px)',
            animation: `floatParticle ${p.duration}s infinite ease-in-out`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-40px) translateX(20px) scale(1.15);
          }
        }
      `}</style>
    </div>
  );
};
