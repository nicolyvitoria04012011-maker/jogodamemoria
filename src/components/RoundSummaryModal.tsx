import React from 'react';
import { PlayerState, GameThemeDef } from '../types';
import { CatAvatar } from './CatAvatar';
import { Trophy, ArrowRight, Sparkles, Award } from 'lucide-react';
import { getRoundWinners } from '../logic/gameLogic';

interface RoundSummaryModalProps {
  currentRound: 1 | 2; // only shown for rounds 1 and 2, round 3 goes to GameOver
  players: PlayerState[];
  theme: GameThemeDef;
  onNextRound: () => void;
}

export const RoundSummaryModal: React.FC<RoundSummaryModalProps> = ({
  currentRound,
  players,
  theme,
  onNextRound,
}) => {
  const roundWinners = getRoundWinners(players, currentRound);
  const nextRoundNumber = (currentRound + 1) as 2 | 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-slate-900 border-2 border-pink-500/40 shadow-2xl shadow-pink-500/20 text-white flex flex-col gap-6 relative overflow-hidden">
        {/* Decorative background glow */}
        <div
          className="absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: theme.primaryColor }}
        />

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-black uppercase tracking-wider border border-pink-500/30">
            <Sparkles className="w-3.5 h-3.5 text-pink-400" />
            Resumo da Rodada {currentRound} de 3
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white">
            Rodada Concluída! 🐾
          </h2>
          <p className="text-sm text-slate-300">
            Confira o desempenho dos gatinhos nesta rodada e a pontuação geral acumulada.
          </p>
        </div>

        {/* Round Winner Highlight Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-500/30 flex items-center justify-center gap-4 text-center">
          <Award className="w-8 h-8 text-amber-400 flex-shrink-0" />
          <div>
            <span className="block text-xs font-bold text-amber-300 uppercase tracking-wider">
              {roundWinners.length > 1 ? 'Empate na Rodada!' : 'Vencedor da Rodada!'}
            </span>
            <div className="flex items-center justify-center gap-2 mt-1">
              {roundWinners.map((winner) => (
                <div key={winner.id} className="flex items-center gap-1.5 font-black text-white text-base">
                  <CatAvatar avatarId={winner.avatarId} size="xs" />
                  <span>{winner.name}</span>
                </div>
              ))}
              <span className="text-amber-300 text-sm font-bold">
                ({players[0]?.roundScores[currentRound - 1] !== undefined ? roundWinners[0]?.roundScores[currentRound - 1] : 0} pares)
              </span>
            </div>
          </div>
        </div>

        {/* Scores Table */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Jogador</span>
            <div className="flex items-center gap-6">
              <span>Rodada {currentRound}</span>
              <span className="text-amber-300 flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Total
              </span>
            </div>
          </div>

          <div className="space-y-2">
            {[...players]
              .sort((a, b) => b.totalScore - a.totalScore)
              .map((player) => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-800/70 border border-slate-700/60"
                >
                  <div className="flex items-center gap-3">
                    <CatAvatar avatarId={player.avatarId} size="sm" />
                    <div>
                      <span className="font-bold text-white block text-sm">{player.name}</span>
                      <span className="text-[11px] text-slate-400">{player.pairsFoundTotal} pares no jogo</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 pr-2">
                    <span className="font-extrabold text-sm text-pink-400">
                      +{player.roundScores[currentRound - 1]} pts
                    </span>
                    <span className="font-black text-base text-amber-300 w-10 text-right">
                      {player.totalScore} pts
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Action Button: Next Round */}
        <button
          onClick={onNextRound}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 text-white font-black text-base shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
          id="btn-next-round"
        >
          <span>Ir para a Rodada {nextRoundNumber} de 3</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
