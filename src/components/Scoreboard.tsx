import React from 'react';
import { PlayerState, GameThemeDef } from '../types';
import { CatAvatar } from './CatAvatar';
import { Trophy, Flame, Sparkles } from 'lucide-react';

interface ScoreboardProps {
  players: PlayerState[];
  currentPlayerIndex: number;
  currentRound: 1 | 2 | 3;
  theme: GameThemeDef;
  messageBanner: string | null;
}

export const Scoreboard: React.FC<ScoreboardProps> = ({
  players,
  currentPlayerIndex,
  currentRound,
  theme,
  messageBanner,
}) => {
  const currentPlayer = players[currentPlayerIndex];

  return (
    <div className="w-full space-y-4">
      {/* Top Round Bar & Current Turn Announcement */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md shadow-xl">
        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 text-white font-black text-sm flex items-center gap-1.5 shadow-md">
            <span>Rodada {currentRound} de 3</span>
          </div>

          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-300">
            <span>Tema:</span>
            <span
              className="px-2.5 py-0.5 rounded-lg font-bold text-white border"
              style={{
                backgroundColor: `${theme.primaryColor}30`,
                borderColor: `${theme.accentColor}50`,
              }}
            >
              {theme.emoji} {theme.name}
            </span>
          </div>
        </div>

        {/* Dynamic Turn Banner or Message */}
        <div className="flex items-center gap-2">
          {messageBanner ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs sm:text-sm font-bold animate-pulse">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{messageBanner}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs sm:text-sm">
              <span className="text-slate-400 font-medium">Vez de:</span>
              <span className="font-extrabold text-pink-400 flex items-center gap-1.5">
                <CatAvatar avatarId={currentPlayer?.avatarId || 'orange'} size="xs" />
                {currentPlayer?.name}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Players Real-Time Score Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {players.map((player, index) => {
          const isTurn = index === currentPlayerIndex;

          return (
            <div
              key={player.id}
              className={`relative p-3.5 rounded-2xl transition-all duration-300 border flex flex-col justify-between overflow-hidden ${
                isTurn
                  ? 'bg-slate-800/90 border-pink-400 shadow-xl shadow-pink-500/20 ring-2 ring-pink-500/60 scale-[1.02]'
                  : 'bg-slate-900/60 border-slate-800/80 opacity-85 hover:opacity-100'
              }`}
              id={`player-scoreboard-card-${index}`}
            >
              {/* Active Player Glow Top Ribbon */}
              {isTurn && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-amber-400 to-pink-500 animate-pulse" />
              )}

              {/* Header: Turn Tag & Avatar */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <CatAvatar
                      avatarId={player.avatarId}
                      size="sm"
                      isCurrentTurn={isTurn}
                    />
                    {isTurn && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-900" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-black text-sm text-white line-clamp-1">
                      {player.name}
                    </h4>
                    {isTurn ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black text-pink-300 uppercase tracking-wider animate-bounce">
                        Sua Vez! 🎯
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-slate-400">
                        Aguardando
                      </span>
                    )}
                  </div>
                </div>

                {/* Consecutive Pair Streak Badge */}
                {player.currentStreak > 1 && (
                  <span
                    className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30"
                    title={`${player.currentStreak} pares seguidos!`}
                  >
                    <Flame className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    {player.currentStreak}x
                  </span>
                )}
              </div>

              {/* Real-time Points Matrix */}
              <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-1 text-center">
                <div className="bg-slate-950/60 p-1.5 rounded-xl">
                  <span className="block text-[10px] font-medium text-slate-400">
                    Rodada {currentRound}
                  </span>
                  <span className="text-base font-black text-white">
                    {player.roundScores[currentRound - 1]}
                  </span>
                </div>
                <div className="bg-slate-950/60 p-1.5 rounded-xl">
                  <span className="block text-[10px] font-medium text-amber-400/90 flex items-center justify-center gap-0.5">
                    <Trophy className="w-2.5 h-2.5 text-amber-400" /> Total
                  </span>
                  <span className="text-base font-black text-amber-300">
                    {player.totalScore}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
