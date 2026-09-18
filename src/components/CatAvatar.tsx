import React from 'react';
import { CAT_AVATARS } from '../data/themesAndAvatars';
import { CatColorId } from '../types';

interface CatAvatarProps {
  avatarId: CatColorId;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  isCurrentTurn?: boolean;
  isWinner?: boolean;
  showCrown?: boolean;
  className?: string;
  animate?: boolean;
}

const SIZE_MAP = {
  xs: 'w-7 h-7',
  sm: 'w-10 h-10',
  md: 'w-14 h-14',
  lg: 'w-20 h-20',
  xl: 'w-28 h-28',
  '2xl': 'w-36 h-36',
};

export const CatAvatar: React.FC<CatAvatarProps> = ({
  avatarId,
  size = 'md',
  isCurrentTurn = false,
  isWinner = false,
  showCrown = false,
  className = '',
  animate = true,
}) => {
  const avatar = CAT_AVATARS.find((a) => a.id === avatarId) || CAT_AVATARS[0];
  const sizeClass = SIZE_MAP[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${sizeClass} ${className}`}
      id={`cat-avatar-${avatarId}`}
    >
      {/* Turn indicator glow aura */}
      {isCurrentTurn && (
        <span
          className="absolute -inset-1 rounded-full animate-ping opacity-40"
          style={{ backgroundColor: avatar.eyeColor }}
        />
      )}

      {/* Floating Crown if winner or explicitly requested */}
      {(isWinner || showCrown) && (
        <span
          className={`absolute -top-3 z-20 text-yellow-300 drop-shadow-md ${
            animate ? 'animate-bounce' : ''
          } ${size === 'lg' || size === 'xl' || size === '2xl' ? 'text-3xl -top-5' : 'text-lg -top-2'}`}
        >
          👑
        </span>
      )}

      {/* Cat SVG Illustration */}
      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full rounded-full transition-transform duration-300 ${
          isCurrentTurn ? 'scale-105 filter drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' : ''
        }`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background glow */}
        <circle cx="50" cy="50" r="48" fill={avatar.secondaryFur} fillOpacity="0.35" />

        {/* Outer Left Ear */}
        <polygon
          points="20,44 14,14 42,26"
          fill={avatar.furColor}
          stroke={avatar.secondaryFur}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Inner Left Ear */}
        <polygon points="23,38 19,20 37,28" fill={avatar.innerEarColor} />

        {/* Outer Right Ear */}
        <polygon
          points="80,44 86,14 58,26"
          fill={avatar.furColor}
          stroke={avatar.secondaryFur}
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Inner Right Ear */}
        <polygon points="77,38 81,20 63,28" fill={avatar.innerEarColor} />

        {/* Main Head Base */}
        <ellipse
          cx="50"
          cy="56"
          rx="38"
          ry="34"
          fill={avatar.furColor}
          stroke={avatar.secondaryFur}
          strokeWidth="3"
        />

        {/* Cute Fur Cheeks Tufts */}
        <path
          d="M 12 58 C 8 54 8 62 14 66 C 10 68 12 74 18 72"
          fill={avatar.furColor}
        />
        <path
          d="M 88 58 C 92 54 92 62 86 66 C 90 68 88 74 82 72"
          fill={avatar.furColor}
        />

        {/* Fur Stripes (if striped variant) */}
        {avatar.stripeColor && (
          <g fill={avatar.stripeColor} opacity="0.6">
            <path d="M 47 24 Q 50 20 53 24 L 51 34 Q 50 35 49 34 Z" />
            <path d="M 39 28 Q 42 25 45 29 L 43 36 Q 41 37 40 36 Z" />
            <path d="M 61 28 Q 58 25 55 29 L 57 36 Q 59 37 60 36 Z" />
          </g>
        )}

        {/* Collar & Pendant */}
        <path
          d="M 28 84 Q 50 96 72 84"
          stroke={avatar.collarColor}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="50" cy="91" r="5" fill={avatar.tagColor} stroke="#ffffff" strokeWidth="1.5" />

        {/* Left Eye */}
        <ellipse cx="36" cy="52" rx="7" ry="8" fill={avatar.eyeColor} />
        <ellipse cx="36" cy="52" rx="3.5" ry="7" fill="#0f172a" />
        <circle cx="34" cy="49" r="2.5" fill="#ffffff" />
        <circle cx="38" cy="55" r="1.2" fill="#ffffff" />

        {/* Right Eye */}
        <ellipse cx="64" cy="52" rx="7" ry="8" fill={avatar.eyeColor} />
        <ellipse cx="64" cy="52" rx="3.5" ry="7" fill="#0f172a" />
        <circle cx="62" cy="49" r="2.5" fill="#ffffff" />
        <circle cx="66" cy="55" r="1.2" fill="#ffffff" />

        {/* Cute Blushing Cheeks */}
        <ellipse cx="26" cy="63" rx="5" ry="3" fill="#f43f5e" opacity="0.35" />
        <ellipse cx="74" cy="63" rx="5" ry="3" fill="#f43f5e" opacity="0.35" />

        {/* Cute Snout / Nose */}
        <polygon points="47,60 53,60 50,64" fill="#fb7185" stroke="#f43f5e" strokeWidth="0.8" />

        {/* Smiling Cat Mouth */}
        <path
          d="M 44 65 Q 47 69 50 65 Q 53 69 56 65"
          stroke="#334155"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Whiskers Left */}
        <path d="M 32 62 L 14 59" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 32 66 L 12 67" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 32 70 L 16 75" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />

        {/* Whiskers Right */}
        <path d="M 68 62 L 86 59" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 68 66 L 88 67" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 68 70 L 84 75" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    </div>
  );
};
