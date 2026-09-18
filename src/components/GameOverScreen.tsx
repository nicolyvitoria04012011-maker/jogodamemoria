import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { PlayerState, GameThemeDef } from '../types';
import { CatAvatar } from './CatAvatar';
import { Trophy, RotateCcw, Medal, Sparkles } from 'lucide-react';
import { calculateRankings, getOverallWinners } from '../logic/gameLogic';

interface GameOverScreenProps {
  players: PlayerState[];
  theme: GameThemeDef;
  onNewGame: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  players,
  theme,
  onNewGame,
}) => {
  const rankedPlayers = calculateRankings(players);
  const winners = getOverallWinners(players);
  const isTie = winners.length > 1;

  useEffect(() => {
    // Launch celebratory confetti bursts
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#38bdf8'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#a855f7', '#10b981', '#f97316'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#ffffff', '#fde047'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border-2 border-amber-500/40 backdrop-blur-xl shadow-2xl shadow-amber-500/20 text-white flex flex-col items-center gap-8 relative overflow-hidden">
        {/* Glow behind podium */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: theme.primaryColor }}
        />

        {/* Top Header Badge */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 text-xs sm:text-sm font-black uppercase tracking-wider border border-amber-500/40">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Fim das 3 Rodadas • Grande Final
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-yellow-200">
            {isTie ? 'Empate Épico no Topo!' : `Vitória de ${winners[0]?.name}!`}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
            {isTie
              ? 'Tivemos uma disputa acirrada e mais de um gatinho alcançou o topo!'
              : 'Parabéns pela agilidade e memória impecável ao longo das 3 rodadas!'}
          </p>
        </div>

        {/* Podium for Top 3 (or 4) players */}
        <div className="w-full flex items-end justify-center gap-2 sm:gap-4 pt-8 pb-4">
          {/* 2nd Place */}
          {rankedPlayers[1] && (
            <div className="flex-1 max-w-[160px] flex flex-col items-center gap-2">
              <CatAvatar avatarId={rankedPlayers[1].avatarId} size="lg" />
              <div className="text-center w-full">
                <span className="block font-bold text-xs sm:text-sm text-slate-200 truncate">
                  {rankedPlayers[1].name}
                </span>
                <span className="text-xs font-black text-slate-400">
                  {rankedPlayers[1].totalScore} pts
                </span>
              </div>
              <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-t from-slate-800 to-slate-700/80 border-t-2 border-slate-400 flex items-center justify-center shadow-lg">
                <span className="text-xl sm:text-2xl font-black text-slate-300">2º</span>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {rankedPlayers[0] && (
            <div className="flex-1 max-w-[180px] flex flex-col items-center gap-2 -translate-y-4">
              <CatAvatar
                avatarId={rankedPlayers[0].avatarId}
                size="xl"
                isWinner={true}
                showCrown={true}
              />
              <div className="text-center w-full">
                <span className="block font-black text-sm sm:text-base text-amber-300 truncate">
                  {rankedPlayers[0].name}
                </span>
                <span className="text-sm font-black text-white bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/40 inline-block">
                  {rankedPlayers[0].totalScore} pts
                </span>
              </div>
              <div className="w-full h-32 sm:h-36 rounded-t-2xl bg-gradient-to-t from-amber-600 to-yellow-400 border-t-4 border-yellow-200 flex flex-col items-center justify-center shadow-xl shadow-amber-500/30">
                <Trophy className="w-6 h-6 text-slate-900 fill-slate-900 mb-1" />
                <span className="text-2xl sm:text-3xl font-black text-slate-950">1º</span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {rankedPlayers[2] && (
            <div className="flex-1 max-w-[160px] flex flex-col items-center gap-2">
              <CatAvatar avatarId={rankedPlayers[2].avatarId} size="lg" />
              <div className="text-center w-full">
                <span className="block font-bold text-xs sm:text-sm text-slate-200 truncate">
                  {rankedPlayers[2].name}
                </span>
                <span className="text-xs font-black text-amber-600">
                  {rankedPlayers[2].totalScore} pts
                </span>
              </div>
              <div className="w-full h-18 sm:h-20 rounded-t-2xl bg-gradient-to-t from-amber-950/80 to-amber-900/60 border-t-2 border-amber-700 flex items-center justify-center shadow-lg">
                <span className="text-lg sm:text-xl font-black text-amber-500">3º</span>
              </div>
            </div>
          )}

          {/* 4th Place (if 4 players) */}
          {rankedPlayers[3] && (
            <div className="flex-1 max-w-[140px] hidden sm:flex flex-col items-center gap-2">
              <CatAvatar avatarId={rankedPlayers[3].avatarId} size="md" />
              <div className="text-center w-full">
                <span className="block font-bold text-xs text-slate-300 truncate">
                  {rankedPlayers[3].name}
                </span>
                <span className="text-xs font-black text-slate-400">
                  {rankedPlayers[3].totalScore} pts
                </span>
              </div>
              <div className="w-full h-14 rounded-t-2xl bg-slate-900 border-t border-slate-700 flex items-center justify-center">
                <span className="text-base font-bold text-slate-400">4º</span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Breakdown Card for All Players */}
        <div className="w-full p-5 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-3">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Medal className="w-4 h-4 text-amber-400" />
            Classificação Final das 3 Rodadas
          </h3>

          <div className="divide-y divide-slate-700/60">
            {rankedPlayers.map((player, idx) => (
              <div
                key={player.id}
                className="py-3 flex items-center justify-between gap-3 first:pt-1 last:pb-1"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 text-sm font-black text-slate-400 text-center">
                    #{idx + 1}
                  </span>
                  <CatAvatar avatarId={player.avatarId} size="sm" isWinner={idx === 0} />
                  <div>
                    <span className="font-extrabold text-white text-sm block">{player.name}</span>
                    <span className="text-[11px] text-slate-400">
                      R1: {player.roundScores[0]} • R2: {player.roundScores[1]} • R3: {player.roundScores[2]}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-lg font-black text-amber-300 block">
                    {player.totalScore} pts
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {player.pairsFoundTotal} pares no total
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Match Action Button (Returning to setup screen) */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onNewGame}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-black text-lg shadow-xl shadow-pink-500/25 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
            id="btn-new-match"
          >
            <RotateCcw className="w-5 h-5 group-hover:-rotate-90 transition-transform" />
            <span>Iniciar Nova Partida (Voltar à Configuração)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
