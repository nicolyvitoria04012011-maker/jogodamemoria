import React from 'react';
import { GameCard, GameThemeDef } from '../types';
import { Check } from 'lucide-react';

interface MemoryCardProps {
  card: GameCard;
  index: number;
  theme: GameThemeDef;
  onFlip: (index: number) => void;
  isLocked: boolean;
}

export const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  index,
  theme,
  onFlip,
  isLocked,
}) => {
  const handleClick = () => {
    if (isLocked || card.isFlipped || card.isMatched) return;
    onFlip(index);
  };

  const isRevealed = card.isFlipped || card.isMatched;

  return (
    <div
      className="perspective-1000 w-full aspect-square cursor-pointer select-none group"
      onClick={handleClick}
      id={`memory-card-${index}`}
    >
      <div
        className={`w-full h-full relative transform-style-3d transition-transform duration-500 rounded-2xl shadow-lg ${
          isRevealed ? 'rotate-y-180' : 'hover:-translate-y-1 hover:shadow-xl'
        }`}
      >
        {/* BACK OF CARD (Hidden state) */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl p-2.5 flex flex-col items-center justify-center border-2 ${theme.cardBorder} bg-gradient-to-br ${theme.cardBackGradient} shadow-md overflow-hidden`}
        >
          {/* Subtle geometric pattern overlay */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />

          {/* Theme Center Badge */}
          <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl sm:text-2xl shadow-inner border border-white/30 group-hover:scale-110 transition-transform">
            <span>{theme.emoji}</span>
          </div>

          <div className="relative z-10 mt-1 sm:mt-1.5 flex items-center gap-1 opacity-80">
            <span className="text-[10px] font-black tracking-widest text-white/90 uppercase">
              ?
            </span>
          </div>
        </div>

        {/* FRONT OF CARD (Revealed state - flipped or matched) */}
        <div
          className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl p-2 sm:p-3 flex flex-col items-center justify-between border-2 transition-all ${
            card.isMatched
              ? 'bg-slate-900/95 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] ring-2 ring-emerald-400/40'
              : 'bg-slate-900 border-white/20 shadow-xl'
          }`}
        >
          {/* Top Status Mini-Badge */}
          <div className="w-full flex items-center justify-between">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: card.color }}
            />
            {card.isMatched && (
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                <Check className="w-2.5 h-2.5" /> Par
              </span>
            )}
          </div>

          {/* Center Emoji / Illustration */}
          <div className="flex-1 flex flex-col items-center justify-center my-0.5 sm:my-1">
            <div
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner transition-transform"
              style={{
                backgroundColor: `${card.color}25`,
              }}
            >
              <span className="drop-shadow-sm">{card.emoji}</span>
            </div>
          </div>

          {/* Bottom Card Item Label */}
          <span className="text-[10px] sm:text-xs font-bold text-center text-slate-200 line-clamp-1 w-full px-1">
            {card.name}
          </span>
        </div>
      </div>
    </div>
  );
};
